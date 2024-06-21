// import { styled } from '@mui/material/styles';
// import { Card } from '@mui/material';
// import FilterSearch from 'menu-items/DataTable';

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

// const TablerIcons = () => (
//   <MainCard title="Administrator Block Details (No data available as of now)">
//    <FilterSearchblock block={'B'} department={'Admin'} />
//   </MainCard>
// );

// export default TablerIcons;
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import FilterSearchblock from './BlockData';
import axios from 'axios';

const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
}));

const TablerIcons = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      const response = await axios.delete('http://localhost:8000/api/block/blocks/deleteAll/B');
      console.log(response.data); // Log success message or handle as needed
    } catch (error) {
      console.error('Error deleting all data:', error);
      // Handle error message or show notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="Administrator Block Details (No data available as of now)">
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteAll}
        disabled={loading}
        style={{ marginBottom: '10px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Delete All Data'}
      </Button>
      <FilterSearchblock block={'B'} department={'Admin'} />
      {/* Add other components or functionality as needed */}
    </MainCard>
  );
};

export default TablerIcons;
