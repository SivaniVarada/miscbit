// assets
import { IconTypography, IconPalette, IconShadow } from '@tabler/icons-react';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ScienceIcon from '@mui/icons-material/Science';
import StorageIcon from '@mui/icons-material/Storage';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { isAdmin } from './isadmin';

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
      icon: AlignHorizontalLeftIcon,
      breadcrumbs: false
    },
    // {
    //   id: 'admin-bulkupload',
    //   title: 'Bulk Upload',
    //   type: 'item',
    //   url: '/bulkupload',
    //   icon: DriveFolderUploadIcon,
    //   breadcrumbs: false
    // },
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
          url: '/blocks/Ablock',
          breadcrumbs: false,
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
          id: 'block-d',
          title: 'Block D',
          type: 'item',
          url: '/blocks/Dblock',
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
          id: 'block-k',
          title: 'Block K',
          type: 'item',
          
          url: '/blocks/Kblock',
          breadcrumbs: false
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
    
  ],
  breadcrumbs: 'false',
  
};




if (isAdmin()) {
  console.log('hi')
  utilities.children.push({
    id: 'admin-bulkupload',
    title: 'Bulk Upload',
    type: 'item',
    url: '/bulkupload',
    icon: DriveFolderUploadIcon,
    breadcrumbs: false
  });
  utilities.children.push({
    id: 'admin-blocks',
    title: 'Admin Blocks',
    type: 'collapse',
    icon: AdminPanelSettingsIcon,
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
        id: 'admin-b',
        title: 'Block B',
        type: 'item',
        url: '/admin/Bblock',
        breadcrumbs: false,
        
      },
      {
        id: 'admin-c',
        title: 'Block C',
        type: 'item',
        url: '/admin/Cblock',
        breadcrumbs: false,
        
      },
      {
        id: 'admin-d',
        title: 'Block D',
        type: 'item',
        
        url: '/admin/Dblock',
        breadcrumbs: false,
       
      },
      {
        id: 'admin-g',
        title: 'Block G',
        type: 'item',
        
        url: '/admin/Gblock',
        breadcrumbs: false,
       
      },
      {
        id: 'admin-h',
        title: 'Block H',
        type: 'item',
        
        url: '/admin/Hblock',
        breadcrumbs: false,
       
      },
      {
        id: 'admin-k',
        title: 'Block K',
        type: 'item',
        
        url: '/admin/Kblock',
        breadcrumbs: false
      },
      {
        id: 'admin-l',
        title: 'Block L',
        type: 'item',
        
        url: '/admin/Lblock',
        breadcrumbs: false
      },
      {
        id: 'admin-m',
        title: 'Block M',
        type: 'item',
       
        url: '/admin/Mblock',
        breadcrumbs: false
      },
      {
        id: 'admin-n',
        title: 'Block N',
        type: 'item',
        
        url: '/admin/Nblock',
        breadcrumbs: false
      },
      {
        id: 'admin-sms',
        title: 'SMS Block',
        type: 'item',
        
        url: '/admin/SMSblock/',
        breadcrumbs: false
      },
      {
        id: 'admin-rnd',
        title: 'Research & Development Block',
        type: 'item',
       
        url: '/admin/R&Dblock',
        breadcrumbs: false
      },
    ]
  });
}
export default utilities;