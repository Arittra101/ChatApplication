//file for all connected client

const socket = io();
/* The line const socket = io(); 
is used to create a Socket.IO client instance
on the client side.Let's break down why this
 line is essential:*/

const service = document.getElementById("client-total");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const messageForm = document.getElementById("message-form");
const nameInput = document.getElementById("name-input");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

socket.on("client-total", (data) => {
  service.innerHTML = data;
});

function sendMessage() {
  console.log(messageInput.value);

  const user = {
    name: nameInput,
    message: messageInput.value,
    date: new Date(),
  };
  fromMysite(user);
  socket.emit("message", user);
}
//  fromServer();
//except user itself - from my friend Arvin broadcasting message
socket.on("chat-message", (data) => {
  console.log(data);
  fromServer(data);
});

function fromServer(user) {
  console.log("Sd");
  //    const tomarElement = `<li class="message-left">
  //    <p class="message">
  //      lorem impsun
  //      <span>bluebird ● 26 July 10:40</span>
  //    </p>
  //  </li>`;

  const newPart1 = document.createElement("li");
  newPart1.classList.add("message-left");
  const child = document.createElement("p"); //from p
  child.innerHTML = user.message;
  child.classList.add("message");
  const dadabhai = document.createElement("span");

  child.appendChild(dadabhai);
  newPart1.appendChild(child);

  messageContainer.appendChild(newPart1);
}

function fromMysite(user){


const newPart1 = document.createElement("li");
newPart1.classList.add("message-right");
const child = document.createElement("p"); //from p
child.innerHTML = user.message;
child.classList.add("message");
const dadabhai = document.createElement("span");

child.appendChild(dadabhai);
newPart1.appendChild(child);

messageContainer.appendChild(newPart1);
}
