import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./navbar.css"


const NavBar = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [gameInProgCheck, setGameInProgCheck] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(sessionUser && sessionUser.createdGames.length > 0){
      const game = sessionUser.createdGames[0];
      const intlState = JSON.parse(localStorage.getItem('gameState'))
      if(intlState){
        if((intlState[0] !== game.id) || intlState[11]) {
          if(intlState[1] < game.timer){
            setGameInProgCheck(true);
          } else {
            setGameInProgCheck(false);
          }
        } else {
          setGameInProgCheck(false);
        }
      } else {
        setGameInProgCheck(false);
      }
    }   
}, [location, sessionUser])

  const notYetImplemented = (e) => {
    e.preventDefault();
    window.alert("Not yet implemented!")
  }

  const resumeGame = (e) => {
    e.preventDefault();
    history.push(`/games/${sessionUser.createdGames[0].id}`)
  }

  const help = (e) => {
    e.preventDefault();
    history.push('/help')
}

  return (
    <nav className="overBar">
      <ul className="navBar">
        <li className="navTab">
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        { sessionUser ? (
          <div className="navTab">
            <li>
              <LogoutButton className="navButton" />
            </li>
            
          </div>
        ): (
          <div className="navTab">
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </div>
        )}
        <li className="navHeader"><span>CARD GAME APP</span></li>
        {sessionUser && gameInProgCheck && sessionUser.createdGames[0] && sessionUser && (location.pathname !== `/games/${sessionUser.createdGames[0].id}`) ? (
        <li className="navTab" onClick={resumeGame}>
          <p>Resume Game In Progress</p>
        </li>
        ) : (
        <li className="navTab" onClick={help}>
          <p>Help</p>
        </li>
        )}
        { sessionUser ? (
          <li className="navTab">
              <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
                Profile
              </NavLink>
            </li>
        ) : (
          <div className="navTab">
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Log In
              </NavLink>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
