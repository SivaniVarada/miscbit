// assets
import { IconTypography, IconPalette, IconShadow } from '@tabler/icons-react';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ScienceIcon from '@mui/icons-material/Science';
import StorageIcon from '@mui/icons-material/Storage';
// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  CorporateFareIcon,
  ScienceIcon,
  StorageIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  type: 'group',
  title: 'Blocks',
  children: [
    {
      id: 'Alldata',
      title: 'All Data',
      type: 'item',
      url: '/alldata',
      icon: icons.StorageIcon,
      breadcrumbs: false
    },
    {
      id: 'admin-bulkupload',
      title: 'Bulk Upload',
      type: 'item',
      url: '/bulkupload',
      icon: icons.StorageIcon,
      breadcrumbs: false
    },
    {
      id: 'blocks',
      title: 'Blocks',
      type: 'collapse',
      icon: icons.CorporateFareIcon,
      children: [
        {
          id: 'block-a',
          title: 'Block A',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false,
          blockvalue:'A',
          deptvalue:'civil'
        },
        {
          id: 'block-b',
          title: 'Block B',
          type: 'item',
          
          url: '/blocks/Bblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-c',
          title: 'Block C',
          type: 'item',
          url: '/blocks/Cblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-g',
          title: 'Block G',
          type: 'item',
          
          url: '/blocks/Gblock',
          breadcrumbs: false,
         
        },
        {
          id: 'block-h',
          title: 'Block H',
          type: 'item',
          
          url: '/blocks/Hblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-l',
          title: 'Block L',
          type: 'item',
          
          url: '/blocks/Lblock',
          breadcrumbs: false
        },
        {
          id: 'block-m',
          title: 'Block M',
          type: 'item',
         
          url: '/blocks/Mblock',
          breadcrumbs: false
        },
        {
          id: 'block-n',
          title: 'Block N',
          type: 'item',
          
          url: '/blocks/Nblock',
          breadcrumbs: false
        },
        {
          id: 'block-k',
          title: 'Block K',
          type: 'item',
          
          url: '/blocks/Kblock',
          breadcrumbs: false
        },
        {
          id: 'block-sms',
          title: 'SMS Block',
          type: 'item',
          
          url: '/blocks/SMSblock/',
          breadcrumbs: false
        },
        {
          id: 'block-rnd',
          title: 'Research & Development Block',
          type: 'item',
         
          url: '/blocks/R&Dblock',
          breadcrumbs: false
        },
      ]
    },
    {
      id: 'admin-blocks',
      title: 'Blocks',
      type: 'collapse',
      icon: icons.CorporateFareIcon,
      children: [
        {
          id: 'admin-a',
          title: 'Block A',
          type: 'item',
          url: '/admin/Ablock',
          breadcrumbs: false,
          blockvalue:'A',
          deptvalue:'civil'
        },
        {
          id: 'block-b',
          title: 'Block B',
          type: 'item',
          
          url: '/blocks/Bblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-c',
          title: 'Block C',
          type: 'item',
          url: '/blocks/Cblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-g',
          title: 'Block G',
          type: 'item',
          
          url: '/blocks/Gblock',
          breadcrumbs: false,
         
        },
        {
          id: 'block-h',
          title: 'Block H',
          type: 'item',
          
          url: '/blocks/Hblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-l',
          title: 'Block L',
          type: 'item',
          
          url: '/blocks/Lblock',
          breadcrumbs: false
        },
        {
          id: 'block-m',
          title: 'Block M',
          type: 'item',
         
          url: '/blocks/Mblock',
          breadcrumbs: false
        },
        {
          id: 'block-n',
          title: 'Block N',
          type: 'item',
          
          url: '/blocks/Nblock',
          breadcrumbs: false
        },
        {
          id: 'block-k',
          title: 'Block K',
          type: 'item',
          
          url: '/blocks/Kblock',
          breadcrumbs: false
        },
        {
          id: 'block-sms',
          title: 'SMS Block',
          type: 'item',
          
          url: '/blocks/SMSblock/',
          breadcrumbs: false
        },
        {
          id: 'block-rnd',
          title: 'Research & Development Block',
          type: 'item',
         
          url: '/blocks/R&Dblock',
          breadcrumbs: false
        },
      ]
    }
  ],
  breadcrumbs: 'false',
  
};

export default utilities;
