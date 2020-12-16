import React from 'react';
import { Button } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from '../../axios';

import './SignInPage.css';

function SignInPage() {
  const history = useHistory();

  async function signIn(values) {
    try {
      const res = await axios.post('/api/v1/auth/login', { ...values });
      if (res.data.success) {
        history.push('/chat');
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className='signin_form'>
      <div className='signin_icon'>
        <LockOpenIcon fontSize='large' />
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            signIn(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type='email' name='email' placeholder='Email' />
            <ErrorMessage name='email' component='div' />

            <Field type='password' name='password' placeholder='Password' />
            <ErrorMessage name='password' component='div' />

            <Button type='submit' disabled={isSubmitting}>
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
      <div className='signin_footer'>
        <Link to='forgotpassword'>Forgot password?</Link>
        <Link to='signup'>Don't have an account? Sign Up</Link>
      </div>
    </div>
  );
}

export default SignInPage;
