import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  Mic
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Message from '../Message/Message';
import axios from '../../axios';

import './Chat.css';

function Chat({ firstRoom }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState({});

  async function getAllRoomMessages() {
    try {
      const res = await axios.get(`/api/v1/message/${firstRoom}/messages`);
      setMessages(res.data);
      console.log(`/api/v1/message/${firstRoom}/messages`, res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    setInput('');
  }

  useEffect(() => {
    getAllRoomMessages();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar />
        <div className='chat_headerInfo'>
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className='chat_headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat_body'>
        {messages.success &&
          messages.data.map(message => (
            <Message key={Math.random() * 10} message={message} />
          ))}
      </div>
      <div className='chat_footer'>
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button type='submit' onClick={e => handleSubmit(e)}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
