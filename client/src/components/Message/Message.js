import React from 'react';

function getCorrectTime(date) {
  const d = new Date();
  const hours = d.getHours(date);
  const minutes = d.getMinutes(date);
  return `${hours}:${minutes}`;
}

function Message({ message }) {
  return (
    <p className='chat_message'>
      <span className='chat_name'>{message.name}</span>
      {message.message}
      <span className='chat_timestamp'>
        {getCorrectTime(message.createdAt)}
      </span>
    </p>
  );
}

export default Message;
