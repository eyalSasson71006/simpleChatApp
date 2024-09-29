const socket = io("http://localhost:8181");

const chatWindow = document.getElementById("chatWindow");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("usernameInput");
sendBtn.disabled = true;
usernameInput.value = sessionStorage.getItem("username") || "";

function printMessage(msg) {
    const { username, messageText, time } = msg;
    let message = document.createElement("div");
    message.innerHTML = `<span class="username">${username}</span> <span class="time">${time}</span> <span class="message">${messageText}</span>`;
    if (username === usernameInput.value) message.classList.add("host");
    chatWindow.appendChild(message);
};

sendBtn.addEventListener("click", () => {
    const now = new Date();
    if (!messageInput.value || !usernameInput.value) return;
    socket.emit("message sent", { username: usernameInput.value, messageText: messageInput.value, time: now.getHours() + ":" + now.getMinutes() });
    messageInput.value = "";
    sendBtn.disabled = true;
    messageInput.focus();
});

messageInput.addEventListener("input", () => {
    if (messageInput.value && usernameInput.value) sendBtn.disabled = false;
    else sendBtn.disabled = true;
});

usernameInput.addEventListener("input", () => {
    sessionStorage.setItem("username", usernameInput.value);
    if (usernameInput.value && messageInput.value) sendBtn.disabled = false;
    else sendBtn.disabled = true;
});


socket.on("message received", (message) => {
    printMessage(message);
});

socket.on("recover history", (history) => {
    history.forEach(printMessage);
});
