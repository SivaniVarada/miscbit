// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import SportsIcon from '@mui/icons-material/Sports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  SportsIcon,
  EmojiEventsIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Sports',
  type: 'group',
  children: [
    {
      id: 'indoor',
      title: 'Indoor Facilities',
      type: 'item',
      url: '/indoorsports',
      icon: icons.SportsIcon,
      breadcrumbs: false
    },
    {
      id: 'outdoor',
      title: 'Outdoor Facilities',
      type: 'item',
      url: '/outdoorsports',
      icon: icons.EmojiEventsIcon,
      breadcrumbs: false
    },
  ]
};

export default utilities;
