const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinput');
const messageContainer = document.querySelector('.conten');
var audio = new Audio('tig.mp3')


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position); 
    messageContainer.append(messageElement);
    if(position == 'right'){
    audio.play()}
};


const Name = prompt("Enter your name to join");
socket.emit('new-user-joined', Name);


socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right'); // ✅ Fix: use `name` received from server
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'left');
    socket.emit('send', message);
    messageInput.value = '';
});


socket.on('receive', data => {
    append(`${data.Name}: ${data.message}`, 'right');
});


socket.on('user-left', name => {
    append(`${name} left the chat`, 'right');
});
