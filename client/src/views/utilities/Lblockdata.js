// import { styled } from '@mui/material/styles';
// import { Card, Button } from '@mui/material';
// import FilterSearch from 'menu-items/DataTable';
// import React, { useRef } from 'react';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import FilterSearchblock from './BlockData';
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

// import LinkIcon from '@mui/icons-material/Link';

// // styles
// const IFrameWrapper = styled('iframe')(({ theme }) => ({
//   height: 'calc(100vh - 210px)',
//   border: '1px solid',
//   borderColor: theme.palette.primary.light
// }));

// // =============================|| TABLER ICONS ||============================= //

// const TablerIcons = () => {
//   const itRef = useRef(null);
//   const eeeRef = useRef(null);

//   const scrollToIT = () => {
//     itRef.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   const scrollToEEE = () => {
//     eeeRef.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <MainCard title="L BLOCK INFRASTRUCTURE" sx={{ textTransform: 'uppercase' }}>
//       <div style={{ marginBottom: '10px' }}>
//       <Button
//           onClick={scrollToIT}
//           sx={{
//             textTransform: 'none',
//             marginRight: '2px',
//             width: '49%',
//             border: '1px solid #BA2C1B', // thin border with specified color
//             '&:hover': {
//               backgroundColor: '#BA2C1B', // darker green on hover
//               color: '#ffffff' // white text on hover
//             }
//           }}
//         >
//           INFORMATION TECHNOLOGY
//         </Button>
//         <Button
//           onClick={scrollToEEE}
//           sx={{
//             textTransform: 'none',
//             width: '49%',
//             marginLeft: '1px',
//             border: '1px solid #BA2C1B', // thin border with specified color
//             '&:hover': {
//               backgroundColor: '#BA2C1B', // darker green on hover
//               color: '#ffffff' // white text on hover
//             }
//           }}
//         >
//           ELECTRICAL & ELECTRONICS ENGINEERING
//         </Button>
//       </div>
//       <MainCard title="IT DETAILS" sx={{ textAlign: 'center', color: '#BA2C1B' }} ref={itRef}>
//         <FilterSearchblock block={'L'} department={'IT'} />
//       </MainCard>
//       <MainCard
//         title="EEE DETAILS"
//         ref={eeeRef}
//       >
//         <FilterSearchblock block={'L'} department={'EEE'} />
//       </MainCard>
//     </MainCard>
//   );
// };

// export default TablerIcons;
import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import FilterSearchblock from './BlockData';
import axios from 'axios';

const LTablerIcons = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8000/api/block/blocks/deleteAll/L`);
      console.log(response.data); // Log success message or handle as needed
    } catch (error) {
      console.error('Error deleting all data:', error);
      // Handle error message or show notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="L BLOCK INFRASTRUCTURE">
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteAll}
        disabled={loading}
        style={{ marginBottom: '10px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Delete All Data'}
      </Button>
      <MainCard title="IT DETAILS" sx={{ textAlign: 'center', color: '#BA2C1B' }}>
        <FilterSearchblock block={'L'} department={'IT'} />
      </MainCard>
      <MainCard title="EEE DETAILS">
        <FilterSearchblock block={'L'} department={'EEE'} />
      </MainCard>
    </MainCard>
  );
};

export default LTablerIcons;
