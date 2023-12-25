const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000 });
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
  
    // Event listener for receiving messages
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
  
      // Send a response message
      ws.send(`Message received!: ${message}`);
    });
  
    // Event listener for closing the connection
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  wss.on('listening', () => {
    console.log('WebSocket server is running');
  });
  