let socket = io();

const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();

// escuchar sucesos
socket.on('connect', function() {
    console.log('Comunicación con la nube OK');
    console.log('UserAgent:', UA);
});

// notificar desconexión
socket.on('disconnect', function() {
    console.log('Se perdió la conexión con la nube.');
});

// enviar info al server
socket.emit('enviarMensaje', {
    user: 'Tester Client',
    msg: 'Hola mundo'
}, function(resp) {
    console.log('Callback después del emit en el cliente (se activa desde el server).');
    console.log(resp);
});

// Escuchar info del server
socket.on('enviarMensaje', function(data) {
    console.log('Server:', data);

    // callback({
    //     resp: 'Respuesta desde el cliente'
    // });
});