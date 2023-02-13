import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserStats from './UserComponents/UserStats';
import DeckSelector from './UserComponents/DeckSelector';
import EditUserProfileModal from './Modals/EditUserProfileModal';
import { getUserThunk } from '../store/users';
import "./user.css"

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
    <div className="profilePage">
      <div className="profileInfo">
        <div className="pictureBox">
          <img src={user.profileImg} alt="profile" className="profilePicture"/>
        </div>
        <div className="profileTitle">
          <h1>{user.username}'s Profile!</h1>
        </div>
        { sessionUser.id !== 1 ? (
          <div className="statsAndEditContainer">
            <div class="outerStatsBox"><UserStats /></div>
            <div class="buttonShrinker">
              <button className="mainButton" onClick={() => setIsOpen(true)}>Edit User Profile</button>
            </div>
          </div>
        ) : null
        }
      </div>
      { (sessionUser.id == userId) && (sessionUser.id !== 1) ? (
        <div className="outerDeckSelector"><DeckSelector user={sessionUser} /></div>
      ): null

      }
      { isOpen && (
                <EditUserProfileModal
                    setIsOpen={setIsOpen}
                    user={user}
                    sendDataToUser={sendDataToUser}
                />
      )}
    </div>
  );
}
export default User;
