import { connectToServer } from './socket-client'
import './style.css'



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1> WebSocket-Client </h1>
    <input id = "jwt-token" placeholder="Json Token"/>
    <button id = "btn-connect"> Connect </button>
    <span id = "server-status"> offline </span>
    
    <ul id = "client-ul" ></ul>

    <form id = "message-form">
      <input placeholder = "message" id ="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id = "messages-ul"></ul>

  </div>
`

const jtwToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (jtwToken.value.trim().length <= 0) return alert('Enter a valid Token');
connectToServer(jtwToken.value.trim());
 });

