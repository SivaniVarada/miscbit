
export const isAdmin = () => {
    // Get the user role from localStorage
    const userRole = localStorage.getItem('role');
    console.log('User role:', userRole);
    
    // Check if the user role is 'admin'
    return userRole === 'admin';
  };
// import { useState, useEffect } from 'react';

// export const IsAdmin = () => {
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     // Function to check if the user is admin
//     const checkIsAdmin = () => {
//       // Get the user role from localStorage
//       const userRole = localStorage.getItem('role');
//       console.log('User role:', userRole);
      
//       // Check if the user role is 'admin'
//       setIsAdmin(userRole === 'admin');
//     };

//     // Call the function initially
//     checkIsAdmin();

//     // Subscribe to changes in localStorage
//     window.addEventListener('storage', checkIsAdmin);

//     // Cleanup function to unsubscribe from changes
//     return () => {
//       window.removeEventListener('storage', checkIsAdmin);
//     };
//   }, []); // Run only on component mount and unmount

//   return isAdmin;
// };
