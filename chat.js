
let ul=document.querySelector('#userMessage');
let connected =false;
ul.innerHTML='';
let writeMessage = function (msg,klasa){
    let li=' <li class="'+klasa+'">';
    li+=msg;
    li+='</li>';
    ul.innerHTML += li;
}
const socket = new WebSocket("ws://localhost:"+ sessionStorage.port);
document.querySelector('#send').addEventListener("click",(e)=>{
    let poruka = document.querySelector('#msg');
    socket.send(poruka.value);
    writeMessage(poruka.value,"msgRight");
    poruka.value='';
},false);


// socket.close()
socket.onopen = (e) =>{
    console.log("connected");
    document.querySelector("#localName").innerHTML=sessionStorage.name;
    document.getElementById("localConnected").innerHTML = "Connected";
    document.getElementById("localConnected").className = 'connected';
};

socket.onclose = (e)=>{
    console.log("connection closed")
};


socket.onerror =(e)=>{
    console.log("error  "+e.data)
};

socket.onmessage =(e)=>{
    if (e.data.search("!cnc!")){
        let name = e.data.replace("!cnc!", "");
        document.querySelector("#remoteName").innerHTML= name;
    document.getElementById("remoteConnected").innerHTML = "Connected";
    document.getElementById("remoteConnected").className = 'connected';
    }else
    writeMessage(e.data,"msgLeft");
    
    console.log("message recieved");
};


setInterval(()=>{
    socket.send(sessionStorage.name + "!cnc!"); 
},3000)