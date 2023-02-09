import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserStats from './UserComponents/UserStats';
import DeckSelector from './UserComponents/DeckSelector';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div>
        <img src={user.profileImg} alt="profile image" />
      </div>
      <div>
        <h1>{user.username}'s Profile!</h1>
      </div>
      <div><UserStats /></div>
      <div><DeckSelector /></div>
    </>
  );
}
export default User;
