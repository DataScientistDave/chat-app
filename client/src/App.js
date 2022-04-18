import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  Stack,
  Heading,
  Spacer,
} from '@chakra-ui/react';
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
    <Box mx={4}>
      <Flex my={3} justify="center">
        <Heading>Web Chat</Heading>
        <ColorModeSwitcher position="absolute" right={2} mr={1} />
      </Flex>
      <Box border="1px" borderColor="alternative" h="100%">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <Flex justify="start" ml={3} key={index}>
                <p>{message.body}</p>
              </Flex>
            );
          }
          return (
            <Flex justify="end" mr={3} key={index}>
              <p>{message.body}</p>
            </Flex>
          );
        })}
      </Box>
      <Flex justify="center" my={2}>
        <form onSubmit={sendMessage}>
          <Stack isInline>
            <Input
              isInvalid
              placeholder="Enter message"
              width={800}
              onChange={handleChange}
              focusBorderColor="#9BDEAC"
              errorBorderColor="#6F4758"
            />
            <Button type="submit" variant="new-color">
              Send
            </Button>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
}

export default App;
