const socket = io('http://localhost:3000');

socket.on('chat message', function(msg) {
    let li = document.createElement('li');
    li.textContent = msg;
    document.getElementById('messages').appendChild(li);
});

function sendMessage() {
    let input = document.getElementById('messageInput');
    if (input.value.trim() !== "") {
        socket.emit('chat message', input.value);
        input.value = '';
    }
}
