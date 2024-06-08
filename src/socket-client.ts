import { Manager, Socket } from 'socket.io-client'

let socket: Socket;

export const connectToServer = ( token: string) => {
    //http://localhost:3000/socket.io/socket.io.js
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', { extraHeaders: {authentication: token} });
    socket?.removeAllListeners();
    socket = manager.socket('/');
    addListeners();
}

const addListeners = () => {
    const serverStatusLabel =  document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#client-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Connected';
    }); 

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Disconnected';
    }); 

    // TODO: client-ul

    socket.on('client-updated', (clients: string[])=>{
        let clientsHtml = '';
        clients.forEach(clientId =>{
            clientsHtml += ` <li> ${clientId} </li> `
        });
        clientsUl.innerHTML = clientsHtml;
    })

    messageForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) {
            return;
        }
        socket.emit('message-from-client',{id:'Yo', message: messageInput.value});
        messageInput.value = '';
    })

    socket.on('messages-from-server', (payload: {fullName: string, message: string}) => {
        const newMessage = `
        <li>
            <strong>${payload.fullName}</strong>
            <strong>${payload.message}</strong>
        </li>`;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li); 
    })
}