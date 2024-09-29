const socket = io("http://localhost:8181");

const printMessage = (msg) => {
    const chatWindow = document.getElementById("chatWindow");
    let message = document.createElement("p");
    message.innerText = msg;
    chatWindow.appendChild(message);
};

const sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", () => {
    const messageInput = document.getElementById("messageInput");
    socket.emit("message sent", messageInput.value);
});

socket.on("message received", (message) => {
    printMessage(message);
})
