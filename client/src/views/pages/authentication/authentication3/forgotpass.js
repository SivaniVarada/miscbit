// import React, { useState } from 'react';
// import axios from 'axios';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import { Button, CircularProgress, FormControl, FormHelperText, InputLabel, OutlinedInput, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// const ResetPasswordForm = ({ onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleResetPassword = async (values) => {
//     setLoading(true);
//     try {
//       // Call your API endpoint for resetting the password
//       console.log('Reset Password:', values);
//       // Example axios call:
//       // await axios.post('http://localhost:8000/auth/reset-password', values);
//       setSuccessMessage('Password reset successfully!');
//     } catch (error) {
//       setError('Failed to reset password. Please try again later.');
//     }
//     setLoading(false);
//   };

//   return (
//     <Dialog open={true} onClose={onClose}>
//       <DialogTitle>Reset Password</DialogTitle>
//       <DialogContent>
//         <Formik
//           initialValues={{ password: '', confirmPassword: '' }}
//           validationSchema={Yup.object().shape({
//             password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
//             confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
//           })}
//           onSubmit={(values, actions) => {
//             handleResetPassword(values);
//             actions.setSubmitting(false);
//           }}
//         >
//           {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//             <form onSubmit={handleSubmit}>
//               <FormControl fullWidth>
//                 <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//                 <OutlinedInput
//                   id="outlined-adornment-password"
//                   type="password"
//                   value={values.password}
//                   name="password"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   label="Password"
//                 />
//                 {touched.password && errors.password && (
//                   <FormHelperText error>{errors.password}</FormHelperText>
//                 )}
//               </FormControl>
//               <FormControl fullWidth style={{ marginTop: '20px' }}>
//                 <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
//                 <OutlinedInput
//                   id="outlined-adornment-confirm-password"
//                   type="password"
//                   value={values.confirmPassword}
//                   name="confirmPassword"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   label="Confirm Password"
//                 />
//                 {touched.confirmPassword && errors.confirmPassword && (
//                   <FormHelperText error>{errors.confirmPassword}</FormHelperText>
//                 )}
//               </FormControl>
//               <DialogActions>
//                 <Button onClick={onClose} color="primary">
//                   Cancel
//                 </Button>
//                 <Button type="submit" color="primary" variant="contained">
//                   Submit
//                 </Button>
//               </DialogActions>
//             </form>
//           )}
//         </Formik>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ResetPasswordForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, CircularProgress, FormControl, FormHelperText, InputLabel, OutlinedInput, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
//import { useHistory } from 'react-router-dom';

const ResetPasswordForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  //const history = useHistory();

  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      console.log('hi')
      const token = new URLSearchParams(window.location.search).get('token'); // Get the token from URL
      if (!token) {
        throw new Error('Token is missing');
      }
      
      const response = await axios.post('http://localhost:8000/auth/reset-password', { token, password: values.password }); // Send token and password to the backend
      if (response.data.success) {
        setSuccessMessage('Password reset successfully!');
        setTimeout(() => {
          setSuccessMessage(''); 
          navigate("/pages/login/login3"); // Redirect to login page after success
        }, 3000);
      } else {
        setError('Failed to reset password. Please try again later.');
      }
    } catch (error) {
      setError(error.message || 'Failed to reset password. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
      {successMessage && (
          <div style={{ marginBottom: '20px', color: 'green' }}>{successMessage}</div>
        )}
        {error && (
          <div style={{ marginBottom: '20px', color: 'red' }}>{error}</div>
        )}
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={Yup.object().shape({
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
          })}
          onSubmit={(values, actions) => {
            handleResetPassword(values);
            actions.setSubmitting(false);
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
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
              <FormControl fullWidth style={{ marginTop: '20px' }}>
                <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type="password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Confirm Password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormHelperText error>{errors.confirmPassword}</FormHelperText>
                )}
              </FormControl>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                  {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordForm;



