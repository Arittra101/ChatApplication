//file for all connected client

const socket = io();
let typing = 0;
let intervel;
/* The line const socket = io(); 
is used to create a Socket.IO client instance
on the client side.Let's break down why this
 line is essential:*/

const service = document.getElementById("client-total");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const messageForm = document.getElementById("message-form");
const nameInput = document.getElementById("name-input");
const feedBack = document.getElementById("feedback");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

socket.on("client-total", (data) => {
  service.innerHTML = data+" Person Join" ;
});

function sendMessage() {


  if(nameInput.value.length==0){
    alert("Enter Your Name First! ");
  }
  else{
    const user = {
      name: nameInput.value,
      message: messageInput.value,
      date: new Date(),
    };
  
    fromMysite(user);
    socket.emit("message", user);
    const myuser = {
      name : user.name
    }
    socket.emit("TypingOff",myuser);
    messageInput.value="";
  }
  
}

socket.on("type-khela", (user) => {
  //killer is typing

  
  InnerTyping(user);
  

});


//except user itself - from my friend Arvin broadcasting message
socket.on("chat-message", (data) => {
  console.log("sdsd");

  fromServer(data);
});

function fromServer(user) {
  console.log("Sd");

  const newPart1 = document.createElement("li");
  newPart1.classList.add("message-left");
  const child = document.createElement("p"); //from p
  child.innerHTML = user.message;
  child.classList.add("message");
  const dadabhai = document.createElement("span");
  dadabhai.innerText = user.name + " ";
  child.appendChild(dadabhai);
  newPart1.appendChild(child);

  messageContainer.appendChild(newPart1);
}


function InnerTyping(user) {
  if (user.lock == 1) {

    if(user.Name.length==0)user.Name = "Anonymous"
    feedBack.innerHTML = `${user.Name} is typing......`;
  } 
  else {
    feedBack.innerHTML = ` `;
  }
}

function fromMysite(user) {
  const newPart1 = document.createElement("li");
  newPart1.classList.add("message-right");
  const child = document.createElement("p"); //from p
  child.innerHTML = user.message;
  child.classList.add("message");
  const dadabhai = document.createElement("span");

  dadabhai.innerText ="Me";
  child.appendChild(dadabhai);
  newPart1.appendChild(child);

  messageContainer.appendChild(newPart1);
}

let cnt = 0;

checkInpt();
function checkInpt() {
  intervel = setInterval(() => {
    if (messageInput.value.length > 0) {
      cnt++;
      if (cnt == 1) {
        //emit
        const myuser = {
          name: nameInput.value,
          lock: 0,
        };
           console.log("Typing")
      
        socket.emit("Typingbro", myuser);
      }
    } else {
   
     
      cnt = 0;
    }
  }, 500);
}
