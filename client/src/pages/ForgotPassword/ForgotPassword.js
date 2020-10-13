import React from 'react';
import { Button } from '@material-ui/core';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import axios from '../../axios';

import './ForgotPassword.css';

function ForgotPassword() {
  async function handleSubmit({ email }) {
    // e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/forgotpassword', {
        email
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className='forgot_password'>
      <div className='forgot_password_icon'>
        <VpnKeyOutlinedIcon fontSize='large' />
      </div>
      <Formik
        initialValues={{ email: '' }}
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
            handleSubmit(values);
            // setSubmitting(true);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type='email' name='email' placeholder='Email' />
            <ErrorMessage name='email' component='div' />

            <Button type='submit' disabled={isSubmitting}>
              Send Confirmation
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default ForgotPassword;
