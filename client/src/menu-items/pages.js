// assets
import { IconKey } from '@tabler/icons-react';
import LockPersonIcon from '@mui/icons-material/LockPerson';

// constant
const icons = {
  IconKey,
  LockPersonIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Administrator Access',
  type: 'group',
  children: [
    {
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
    }
  ]
};

export default pages;
