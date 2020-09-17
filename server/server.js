const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
let server = http.createServer(app);


// archivos estaticos
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// socket
module.exports.io = socketIO(server);
require('./sockets/socket');

const port = process.env.PORT || 3000;
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});