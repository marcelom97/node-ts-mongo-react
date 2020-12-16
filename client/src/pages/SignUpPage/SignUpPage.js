import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link, useHistory } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';

import axios from '../../axios';

import './SignUpPage.css';

export default function SignUpPage() {
  const history = useHistory();

  const [username, setUsername] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [firstname, setFirstname] = useState(' ');
  const [lastname, setLastname] = useState(' ');

  const [validEmail, setValidEmail] = useState(true);
  const [validUsername, setValidUsername] = useState(true);

  const debouncedEmail = useDebounce(email, 1000);
  const debouncedUsername = useDebounce(username, 1000);

  useEffect(() => {
    if (debouncedEmail) {
      searchEmail(debouncedEmail).then(results => {
        setValidEmail(results);
      });
    } else {
      setValidEmail(true);
    }
  }, [debouncedEmail]);

  useEffect(() => {
    if (debouncedUsername) {
      searchUsername(debouncedUsername).then(results => {
        setValidUsername(results);
      });
    } else {
      setValidUsername(true);
    }
  }, [debouncedUsername]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register', {
        username,
        email,
        password,
        firstname,
        lastname
      });
      console.log(res.data);
      history.push('/chat');
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className='sign_up'>
      <div className='signup_icon'>
        <AccountCircleOutlinedIcon fontSize='large' />
      </div>
      <form>
        <input
          type='username'
          name='username'
          placeholder='Username'
          onChange={e => setUsername(e.target.value)}
        />
        {username.length === 0 && <div>Required!</div>}
        {username.length !== 0 && !validUsername && (
          <div>Username already in use, please try another username!</div>
        )}

        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
        />
        {email.length === 0 && <div>Required!</div>}
        {email.length !== 0 && !validEmail && (
          <div>Email already in use, please try another email!</div>
        )}

        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
        />
        {password.length === 0 && <div>Required!</div>}

        <input
          type='firstname'
          name='firstname'
          placeholder='Firstname'
          onChange={e => setFirstname(e.target.value)}
        />
        {firstname.length === 0 && <div>Required!</div>}

        <input
          type='lastname'
          name='lastname'
          placeholder='Lastname'
          onChange={e => setLastname(e.target.value)}
        />
        {lastname.length === 0 && <div>Required!</div>}

        <Button type='submit' onClick={e => handleSubmit(e)}>
          Sign Up
        </Button>
      </form>
      <div className='signup_footer'>
        <Link to='/signin'>Already have an account? Sign in</Link>
      </div>
    </div>
  );
}

// API search function
async function searchEmail(email) {
  if (email.length !== 0 && email !== ' ') {
    const res = await axios.get(
      `/api/v1/service/checkemail/${email.toLowerCase()}`
    );
    return res.data.count === 0 ? true : false;
  }
  return true;
}

async function searchUsername(username) {
  if (username.length !== 0 && username !== ' ') {
    const res = await axios.get(
      `/api/v1/service/checkusername/${username.toLowerCase()}`
    );
    return res.data.count === 0 ? true : false;
  }
  return true;
}
