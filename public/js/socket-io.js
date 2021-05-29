const socket = io();
socket.on("connect", () => console.log("connected"));

const messages = document.querySelector(".chat__messages");

//sending messages from client side
const btnSend = document.querySelector(".chat__btn-send");

document.querySelector(".chat__btn-send").addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.querySelector(".chat__input");
  console.log(input, "iz client to server prva poruka");
  console.log(socket);

  socket.emit("sendMessage", { message: input.value }, () => {
    console.log(input.value);
    input.value = "";
  });
});

socket.on("displayMessage", (data) => {
  const message = document.createElement("p");
  const messageBox = document.createElement("p");
  const sender = document.createElement("p");
  messageBox.setAttribute("class", "chat__message-box");
  message.setAttribute("class", "chat__message");
  sender.setAttribute("class", "chat__message-sender");

  sender.append("• You");
  message.append(data.message);
  messageBox.append(message);
  messageBox.append(sender);
  messages.append(messageBox);
});

//clicking on the chat button

document.querySelector(".chat__open").addEventListener("click", () => {
  document.querySelector(".chat__popup").style.display = "block";
  document.querySelector(".chat__open").style.display = "none";
  document.querySelector(".chat__close").style.display = "block";
  console.log("open chat");
  socket.emit("openChat", { id: socket.id }, () => {});
});

socket.on("teamFirstMessage", (data) => {
  console.log(data.id, "data id");
  console.log(socket.id, "socket id");

  const message = document.createElement("p");
  const messageBox = document.createElement("p");
  const sender = document.createElement("p");
  messageBox.setAttribute("class", "chat__message-box team-message-box");

  if (!document.querySelector(".team-message")) {
    message.setAttribute("class", "chat__message team-message");
    message.append("Hello! How can we help you?");

    sender.setAttribute("class", "chat__message-sender team-message-sender");
    sender.append("• LadieSportShopTeam");

    messageBox.append(message);
    messageBox.append(sender);
    messages.append(messageBox);
  }
});
