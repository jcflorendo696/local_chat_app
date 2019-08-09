const express = require('express');
const socket = require('socket.io');


//App setup
let app = express();
let server = app.listen(696, function(){
    console.log('listening to requests on port 696');
});

// Static files
app.use(express.static('public'));

// Socket setup
let io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    //handle chat events 
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    });
})