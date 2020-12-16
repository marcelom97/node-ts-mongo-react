import React, { useEffect, useState } from 'react';
import axios from '../../axios';

import './HomePage.css';

const Sidebar = React.lazy(() => import('../../components/Sidebar/Sidebar'));
const Chat = React.lazy(() => import('../../components/Chat/Chat'));

function HomePage() {
  const [chatRooms, setChatRooms] = useState([]);

  async function getUsersChatRooms() {
    try {
      const res = await axios.get('/api/v1/rooms/participaterooms');
      console.log('/api/v1/rooms/participaterooms', res.data);
      setChatRooms(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getUsersChatRooms();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='homepage'>
      {chatRooms.success ? (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Sidebar chatRooms={chatRooms} />
          <Chat firstRoom={chatRooms.data[0]._id} />
        </React.Suspense>
      ) : null}
    </div>
  );
}

export default HomePage;
