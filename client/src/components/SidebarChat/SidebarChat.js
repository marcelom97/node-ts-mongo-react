import React from 'react';
import { Avatar } from '@material-ui/core';

import './SidebarChat.css';

function SidebarChat({ name }) {
  function handleClick(e) {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div className='sidebarChat' onClick={e => handleClick(e)}>
      <Avatar />
      <div className='sidebarChat_info'>
        <h2>{name}</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
}

export default SidebarChat;
