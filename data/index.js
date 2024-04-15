/**
 * ----------------------------------------------------------------------------
 * ESP32 Remote Control with WebSocket
 * ----------------------------------------------------------------------------
 * © 2020 Stéphane Calderoni
 * ----------------------------------------------------------------------------
 */

var gateway = `ws://${window.location.hostname}/ws`;
var websocket;

// ----------------------------------------------------------------------------
// Initialization
// ----------------------------------------------------------------------------

window.addEventListener('load', onLoad);

function onLoad(event) {
    initWebSocket();
    initButton();
}

// ----------------------------------------------------------------------------
// WebSocket handling
// ----------------------------------------------------------------------------

function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Connection opened');
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function onMessage(event) {
    let data = JSON.parse(event.data);
    document.getElementById('led').className = data.status;
    console.log("onMessage");
    console.log(data.status);
}

// ----------------------------------------------------------------------------
// Button handling
// ----------------------------------------------------------------------------

function initButton() {
    document.getElementById('toggle').addEventListener('click', onToggle);
    console.log('initButton');
}

function onToggle(event) {
    websocket.send(JSON.stringify({ 'action': 'toggle', 'dene': 'dene1' }));
    console.log("onToggle");
}


function toggleCheckbox(element) {
    var xhr = new XMLHttpRequest();
    websocket.send(JSON.stringify({ 'action': 'toggle1', 'dene': 'dene12' }));
    if (element.checked) {

        console.log("toggleCheckbox : on");
        
        xhr.open("GET", "/update?relay=" + element.id + "&state=1", true);
    }
    else {
        console.log("toggleCheckbox : off");
        xhr.open("GET", "/update?relay=" + element.id + "&state=0", true);
    }
    xhr.send();
}
