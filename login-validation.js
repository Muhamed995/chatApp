let validate = function () {
    let username = document.getElementById('username').value;
    let port = document.getElementById('port').value;
    let valid = true;
    if (username == '') {
        document.getElementById('message').innerHTML = 'Username is required';
        valid = false;
    } else {
        document.getElementById('message').innerHTML = '';
    }
    if (port >= 65545 || port == '') {
        document.getElementById('message2').innerHTML = 'Port is out of range';
        valid = false;
    } else {
        document.getElementById('message2').innerHTML = '';
    }

    if (valid) {
        let socket = new WebSocket('ws://127.0.0.1:' + port);
        let used = (e) => {
            document.getElementById('message2').innerHTML = 'Port in use or inactive';
            console.log(e);
        };
        socket.onerror = used;
        socket.onopen = (e) => {
            sessionStorage.setItem("port", port);
            sessionStorage.setItem("name", username);
            socket.close();
            setTimeout(() => {
                window.location = "chatbox.html"
            }, 1000);
        };
    }
}
