import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserStats from './UserComponents/UserStats';
import DeckSelector from './UserComponents/DeckSelector';
import EditUserProfileModal from './Modals/EditUserProfileModal';
import { getUserThunk } from '../store/users';

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [edited, setEdited] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const { userId }  = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const sendDataToUser = (i) => {
    setEdited(i)
    setEdited(false)
    setEdited(true)
}

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

  useEffect(() => {
    dispatch(getUserThunk(userId))
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
}, [edited, dispatch, userId])

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
          <button className="mainButton" onClick={() => setIsOpen(true)}>Edit User Profile</button>
        </div>
      ) : null
      }
      { (sessionUser.id == userId) && (sessionUser.id !== 1) ? (
        <div><DeckSelector user={sessionUser} /></div>
      ): null

      }
      { isOpen && (
                <EditUserProfileModal
                    setIsOpen={setIsOpen}
                    user={user}
                    sendDataToUser={sendDataToUser}
                />
      )}
    </>
  );
}
export default User;
