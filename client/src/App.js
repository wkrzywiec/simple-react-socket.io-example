import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'; 
import SockJsClient from 'react-stomp';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

function App() {

  // React-Stomp library

  let clientRef = null

  const handleMsgSTOMP = (msg, topic)=> {
    console.log('STOMP: \t\t' + msg.time + "\t" + msg.text)
    let str = '<p>React-Stomp: ' + msg.time + '&nbsp;&nbsp;&nbsp;&nbsp; ' + msg.text + '</p>' 
    document.getElementById('messege-output').innerHTML += str
  }

  const handleDisconnectSTOMP = () =>  {
    console.log("Disconnecting STOMP connection")
    clientRef.disconnect();
  }

  const handleReconnectSTOMP = () =>  {
    console.log("Reconnecting STOMP connection")
    clientRef.connect();
  }

  // useEffect(() => {
  //   var clientS = new Client();
  //   clientS.webSocketFactory =  () => {
  //     return new SockJS("http://localhost:8080/chat");
  //   };
      
  //   // 'http://localhost:8080/chat';

  //   clientS.onConnect = function (frame) {
  //     console.log('The StompJs has connected with the server');
  //   };

  //   let callback = function (message) {
  //     // called when the client receives a STOMP message from the server
      
  //   };

  //   console.log(clientS)

  //   // clientS.activate();

  //   clientS.subscribe('/topic/chat', (message) => {
  //     if (message.body) {
  //       console(message.body)
  //     } else {
  //       console('empty?: ' + message.body)
  //     }
  //   });

  //   clientS.activate();
  // }, []);

  // Socket.io library

  let socket = null

  useEffect(() => {
        // connect to the socket server
        // socket = io('https://project-management-microservice-691.core-staging.umetrics.ninja:8081/chat', {
        socket = io('http://localhost:8081/chat', {
          transports: ['polling', 'websocket']
        });
    
        socket.on('connect', function () {
          console.log('The Socket.io has connected with the server');
        });
    
        socket.on('chat', function (data) {
          // console.log(socket)
          console.log('Socket.io: \t' + data.time, "\t", data.text);
          let str = '<p>Socket.io: ' + data.time + '&nbsp;&nbsp;&nbsp;&nbsp; ' + data.text + '</p>' 
          document.getElementById('messege-output').innerHTML += str
            
        });
        
      }, []);

  const handleDisconnectSocketIo = () => {
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
        <button onClick={handleDisconnectSTOMP}>Disconnect STOMP</button>
      </div>
      <div>
        <button onClick={handleReconnectSTOMP}>ReConnect STOMP</button>
      </div>
      <div>
        <button onClick={handleDisconnectSocketIo}>Disconnect Socket.io</button>
      </div>
      <div>
        <button onClick={handleReconnectSocketIo}>ReConnect Socket.io</button>
      </div>
      <div id="messege-output"></div>
      <div>
        {/* <SockJsClient url={ "https://project-management-microservice-691.core-staging.umetrics.ninja/chat" } topics={["/topic/chat"]}  */}
         <SockJsClient url={ "http://localhost:8080/chat" } topics={["/topic/chat"]} 
            onMessage={handleMsgSTOMP} ref={ (client) => { clientRef = client }}
            debug={ false }/>
      </div>
    </div>
  );
}

export default App;
