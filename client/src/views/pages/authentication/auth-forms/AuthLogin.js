
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Button, CircularProgress, FormControl, FormControlLabel, FormHelperText, Typography, Checkbox, Alert, InputLabel, OutlinedInput } from '@mui/material'; // Import components from Material-UI
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

const FirebaseLogin = ({ ...others }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (values, actions) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8010/auth/login', values); // Update the endpoint
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in local storage
      setLoading(false);
      setSuccessMessage('Login Successful!'); // Set success message
      navigate("/sampledata");
      // redirectTo('http://localhost:3000/free/sampledata'); 
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  const redirectTo = (path) => {
    window.location.href = path;
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={handleLogin}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email Address / Username"
            />
            {touched.email && errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>

          <div style={{ marginBottom: '20px' }} />

          <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type="password"
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Password"
            />
            {touched.password && errors.password && (
              <FormHelperText error>{errors.password}</FormHelperText>
            )}
          </FormControl>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> // Display error alert
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert> // Display success alert
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <FormControlLabel
              control={<Checkbox color="primary" />} // Using Checkbox component
              label="Remember me"
            />
            <Typography variant="subtitle1" color="secondary" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              Forgot Password?
            </Typography>
          </div>

          <Button
            disableElevation
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
          >
            {loading ? <CircularProgress size={24} /> : 'Sign in'}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default FirebaseLogin;
