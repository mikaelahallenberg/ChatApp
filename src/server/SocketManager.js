const io = require('./index.js').io
let messages = []

// Keksi tapa tallentaa viestejä per chat room.
// Tyyliin
// messages[channelName] 'Tietyn chatroomin viestit'

module.exports = function(socket) {
    console.log('socket id')
    socket.on('new message', function(message, sender) {
        var newMessage = {
            sender: sender,
            message: message
        }
        console.log(newMessage)
        messages.push(newMessage)
        socket.emit('update messages', messages)
    })

    socket.on('new message to channel', function(channel, user, message){
        messages[channel].push(message)
    })

    socket.on('join channel', function(channel) {
        // Liitytään kanavalle
    })

    socket.on('leave channel', function(channel){
        // Postutaan channelista
    })

    socket.on('leave channel', function(channel){
        // Postutaan channelista
    })
}