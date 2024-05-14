// // assets
// import { IconKey } from '@tabler/icons-react';
// import LockPersonIcon from '@mui/icons-material/LockPerson';

// // constant
// const icons = {
//   IconKey,
//   LockPersonIcon
// };

// // ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

// const pages = {
//   id: 'pages',
//   title: 'Administrator Access',
//   type: 'group',
//   children: [
//     {
//       id: 'authentication',
//       title: 'Authentication',
//       type: 'collapse',
//       icon: icons.LockPersonIcon,

//       children: [
//         {
//           id: 'login3',
//           title: 'Login',
//           type: 'item',
//           url: '/pages/login/login3',
//           target: true
//         }
//       ]
//     }
//   ]
// };

// export default pages;
// assets
// assets
// assets
// assets
// assets
// assets
// assets
import { IconKey } from '@tabler/icons-react';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { isAdmin } from '../menu-items/isadmin'; // Import the isAdmin function

// constant
const icons = {
  IconKey,
  LockPersonIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

// Define the pages menu
const pages = {
  id: 'pages',
  title: isAdmin() ? '' : 'Administrator Access', // Set title to blank if user is admin
  type: 'group',
  children: []
};

// If the user is not an admin, add the "Administrator Access" section to the menu
if (!isAdmin()) {
  pages.children.push({
    id: 'authentication',
    title: 'Authentication',
    type: 'collapse',
    icon: icons.LockPersonIcon,
    children: [
      {
        id: 'login3',
        title: 'Login',
        type: 'item',
        url: '/pages/login/login3',
        target: true
      }
    ]
  });
}

export default pages;




