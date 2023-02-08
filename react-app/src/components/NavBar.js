
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        { sessionUser ? (
          <div>
            <li>
              <LogoutButton />
            </li>
            
          </div>
        ): (
          <div>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </div>
        )}
        <li><span>CARD GAME APP</span></li>
        <li>Resume Game In Progress (if applicable)</li>
        { sessionUser ? (
          <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavBar;
