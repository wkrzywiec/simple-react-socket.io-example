import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'; 

function App() {

  let socket = null

  useEffect(() => {
        socket = io('http://localhost:8080/chuck', {
          transports: ['polling', 'websocket'],
        });

        socket.on('connect', () => {
          console.log('connect');
          console.log(socket); 
        });
    
        socket.on('fact', (data) => {
          let str = '<p> fact: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + new Date().toLocaleTimeString() + '&nbsp;&nbsp;&nbsp;&nbsp; ' + data + '</p>' 
          document.getElementById('messege-output').innerHTML += str
            
        });

        socket.on('factObj', (data) => {
          let str = '<p> factObj: &nbsp;&nbsp;&nbsp;&nbsp;' + data.time + '&nbsp;&nbsp;&nbsp;&nbsp; ' + data.text + '</p>' 
          document.getElementById('messege-output').innerHTML += str
            
        });
        
      }, []);

  const handleDisconnectSocketIo = () => {
    console.log(socket)
    console.log("Disconnecting Socket.io connection")
    socket.disconnect()
  }

  const handleReconnectSocketIo = () => {
    console.log("Reconnecting Socket.io connection")
    socket.connect()
  }


  return (
    <div>
      <div>
        <button onClick={handleDisconnectSocketIo}>Disconnect Socket.io</button>
      </div>
      <div>
        <button onClick={handleReconnectSocketIo}>ReConnect Socket.io</button>
      </div>
      <div id="messege-output"></div>
    </div>
  );
}

export default App;
