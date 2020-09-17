const { io } = require('../server');

// comunicación activo-activo
io.on('connection', (client) => {
    console.log('Cliente conectado');
    let ua = client.handshake.headers['user-agent'];
    console.log(ua);

    // notificar desconexión
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // Escuchar al cliente.
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);

        client.broadcast.emit('enviarMensaje', {
            data
        });

        // if (data.user) {
        //     callback({
        //         resp: 'Respuesta desde el server'
        //     });
        // } else {
        //     callback({
        //         resp: 'No se recibio usuario'
        //     });
        // }
    })

    // Enviar info al cliente
    client.emit('enviarMensaje', {
        user: 'Server Express Node',
        msg: 'Wellcome to Express Node'
    }, (resp) => {
        console.log('Callback despues del emit del server (se activa desde el cliente)');
        console.log(resp);
    });
});