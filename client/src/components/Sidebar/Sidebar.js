import React from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SidebarChat from '../SidebarChat/SidebarChat';
import './Sidebar.css';

function Sidebar({ chatRooms }) {
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar />
        <div className='sidebar_headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
          <SearchOutlined />
          <input placeholder='Search or start new chat' type='text' />
        </div>
      </div>
      <div className='sidebar_chats'>
        {chatRooms.success &&
          chatRooms.data.map(({ name, _id }) => (
            <SidebarChat key={_id} name={name} />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
