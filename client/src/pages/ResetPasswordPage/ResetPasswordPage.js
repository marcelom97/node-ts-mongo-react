import React from 'react';
import { Button } from '@material-ui/core';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import axios from '../../axios';

import './ResetPasswordPage.css';

function ResetPasswordPage() {
  async function handleSubmit({ password }) {
    const url = window.location.href.split('/');
    const token = url[url.length - 1];
    try {
      const res = axios.put(`/api/v1/auth/resetpassword/${token}`, {
        password
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <div className='reset_password'>
      <div className='reset_password_icon'>
        <VpnKeyOutlinedIcon fontSize='large' />
      </div>
      <Formik
        initialValues={{ password: '' }}
        validate={values => {
          const errors = {};

          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 6) {
            errors.password = 'Password length must me greater than 6!';
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
            <Field type='password' name='password' placeholder='Password' />
            <ErrorMessage name='password' component='div' />

            <Button type='submit'>Reset Password</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResetPasswordPage;
