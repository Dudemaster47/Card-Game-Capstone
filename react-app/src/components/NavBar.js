import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./navbar.css"

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const notYetImplemented = (e) => {
    e.preventDefault();
    window.alert("Not yet implemented!")
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
        <li className="navTab" onClick={notYetImplemented}>Resume Game In Progress</li>
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
