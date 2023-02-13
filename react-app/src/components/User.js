import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserStats from './UserComponents/UserStats';
import DeckSelector from './UserComponents/DeckSelector';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const sessionUser = useSelector((state) => state.session.user);

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
        <img src={user.profileImg} alt="profile" />
      </div>
      <div>
        <h1>{user.username}'s Profile!</h1>
      </div>
      { sessionUser.id !== 1 ? (
        <div>
          <div><UserStats /></div>
          <button className="mainButton">Edit User Profile</button>
        </div>
      ) : null
      }
      { (sessionUser.id == userId) && (sessionUser.id !== 1) ? (
        <div><DeckSelector user={sessionUser} /></div>
      ): null

      }
    </>
  );
}
export default User;
