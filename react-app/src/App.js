import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound';
import { authenticate } from './store/session';
import { getAllUsersThunk } from './store/users'
import { getDefaultDeckThunk } from './store/defaultDeck'
import { getAllGamesThunk } from './store/games'
import { getAllCardsThunk } from './store/cards'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
		dispatch(getAllUsersThunk());
    dispatch(getAllCardsThunk());
		dispatch(getDefaultDeckThunk());
    dispatch(getAllGamesThunk());
	});

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Home />
        </Route>
        <Route path="/">
					<PageNotFound />
				</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
