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
//   <MainCard title="R&D Block Details (No data available as of now)">
//    <FilterSearchblock block={'RD'} department={'IT'} />
   
//   </MainCard>
// );

// export default TablerIcons;
import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import FilterSearchblock from './blocks';
import axios from 'axios';

const RnDTablerIcons = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8000/api/block/blocks/deleteAll/RD`);
      console.log(response.data); // Log success message or handle as needed
    } catch (error) {
      console.error('Error deleting all data:', error);
      // Handle error message or show notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="R&D Block Details (No data available as of now)">
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteAll}
        disabled={loading}
        style={{ marginBottom: '10px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Delete All Data'}
      </Button>
      <FilterSearchblock block={'RD'} department={'IT'} />
    </MainCard>
  );
};

export default RnDTablerIcons;
