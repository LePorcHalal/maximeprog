//wt.base = "ws://log2420-nginx.info.polymtl.ca/chatservice";
//endPoint = url_base?username={ nom }; 
//wt client = new WebSocket(endPoint);

var client = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice");

client.onopen = function (event) {
    client.send(); 
  };

client.onmessage = function (event) {
    console.log(event.data);
  };

client.onerror = error => {
    console.log(`WebSocket error: ${error}`)
  };

  function sendText() {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    var msg = {
      type: "message",
      text: document.getElementById("text").value,
      id:   clientID,
      date: Date.now()
    };
  
    // Send the msg object as a JSON-formatted string.
    client.send(JSON.stringify(msg));
    
    // Blank the text input element, ready to receive the next line of text from the user.
    document.getElementById("text").value = "";
  }

  const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('ho!')
})
