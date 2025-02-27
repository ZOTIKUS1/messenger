const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" } // Разрешаем подключение с любого домена
});

app.use(cors());
app.use(express.static("../client")); // Раздаём статику

io.on('connection', (socket) => {
    console.log('Пользователь подключен:', socket.id);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Отправляем сообщение всем
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});

server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
