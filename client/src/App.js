import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import NoMatch from './pages/NoMatch/NoMatch';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route exact path='/signin'>
            <SignInPage />
          </Route>
          <Route exact path='/chat'>
            <HomePage />
          </Route>
          <Route exact path='/forgotpassword'>
            <ForgotPassword />
          </Route>
          <Route exact path='/signup'>
            <SignUpPage />
          </Route>
          <Route exact path='/resetpassword/:resettoken'>
            <ResetPasswordPage />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
