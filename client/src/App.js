import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Button, Input } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import io from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [yourID, setYourID] = useState();
  // useRef hook allows you to persist values between renders and returns an object called current
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io.connect('/');
    socketRef.current.on('your id', id => {
      setYourID(id);
    });
    socketRef.current.on('message', message => {
      handleMessages(message);
    });
  }, []);

  const handleMessages = message => {
    setMessages(oldMsgs => [...oldMsgs, message]);
  };

  const sendMessage = e => {
    e.preventDefault();
    const messageObj = {
      id: yourID,
      body: message,
    };
    setMessage('');
    socketRef.current.emit('chat message', messageObj);
  };

  // Used with the on change event which detects when the value of an input element changes
  const handleChange = e => {
    setMessage(e.target.value);
  };
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return <p>{message.body}</p>;
          }
          <p>{message.body}</p>;
        })}
        <form onSubmit={sendMessage}>
          <Input
            placeholder="Enter message"
            width="auto"
            onChange={handleChange}
          />
          <Button colorScheme="blackAlpha">Send</Button>
        </form>
      </Grid>
    </Box>
  );
}

export default App;
