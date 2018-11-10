const socket = new WebSocket("ws://localhost:" + sessionStorage.port);
let ul = document.querySelector('#userMessage');
let cnt = 0;
let writeMessage = function (msg, klasa) {
    let li = ' <li tabIndex="-1" class="' + klasa + '">';
    li += msg;
    li += '</li>';
    ul.innerHTML += li;
    ul.lastChild.focus();
    document.querySelector('#msg').focus();
}
let sendFunction =  (e) => {
    let poruka = document.querySelector('#msg');
    socket.send(poruka.value);
    writeMessage(poruka.value, "msgRight");
    poruka.value = '';
};

ul.innerHTML = '';

document.querySelector('#send').addEventListener("click",sendFunction, false);
document.addEventListener("keypress",(e)=>{
    if(e.keyCode == 13)
        sendFunction(e);
}, false);
document.querySelector('#backTo').addEventListener("click",(e)=>{socket.close();}, false); 

socket.onopen = (e) => {
    console.log("connected");
    document.querySelector("#localName").innerHTML = sessionStorage.name;
    document.getElementById("localConnected").innerHTML = "Connected";
    document.getElementById("localConnected").className = 'connected';
};

socket.onclose = (e) => {
    console.log("connection closed")
    window.location = "login.html";
};
socket.onerror = (e) => {
    console.log("error  " + e.data)
    socket.close();
};


socket.onmessage = (e) => {
    if (e.data.indexOf('!cnc!') !== -1) {
        let name = e.data.replace("!cnc!", "");
        document.querySelector("#remoteName").innerHTML = name;
        document.getElementById("remoteConnected").innerHTML = "Connected";
        document.getElementById("remoteConnected").className = 'connected';
    } else {
        writeMessage(e.data, "msgLeft");
        console.log("message recieved");
    }
};

setInterval(() => {
    if (cnt < 5) {
        socket.send(sessionStorage.name + "!cnc!");
        cnt++;
    } else {
        console.log('timeout');
    }
}, 2000)