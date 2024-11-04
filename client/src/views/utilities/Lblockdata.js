import { styled } from '@mui/material/styles';
import { Card, Button } from '@mui/material';
import FilterSearch from 'menu-items/DataTable';
import React, { useRef } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import FilterSearchblock from './blocks';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

import LinkIcon from '@mui/icons-material/Link';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light
}));

// =============================|| TABLER ICONS ||============================= //

const TablerIcons = () => {
  const itRef = useRef(null);
  const eeeRef = useRef(null);

  const scrollToIT = () => {
    itRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEEE = () => {
    eeeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainCard title="L BLOCK INFRASTRUCTURE" sx={{ textTransform: 'uppercase' }}>
      <div style={{ marginBottom: '10px' }}>
        <Button
          onClick={scrollToIT}
          sx={{
            textTransform: 'none',
            marginRight: '2px',
            width: '49%',
            border: '1px solid #941b1c', // thin border with specified color
            '&:hover': {
              backgroundColor: '#941b1c', // darker green on hover
              color: '#ffffff' // white text on hover
            }
          }}
        >
          IT
        </Button>
        <Button
          onClick={scrollToEEE}
          sx={{
            textTransform: 'none',
            width: '49%',
            marginLeft: '1px',
            border: '1px solid #941b1c', // thin border with specified color
            '&:hover': {
              backgroundColor: '#941b1c', // darker green on hover
              color: '#ffffff' // white text on hover
            }
          }}
        >
          EEE
        </Button>
      </div>
      <MainCard title="IT DETAILS" sx={{ textAlign: 'center', color: '#941b1c' }} ref={itRef}>
        <FilterSearchblock block={'L'} department={'IT'} />
      </MainCard>
      <MainCard title="EEE DETAILS" ref={eeeRef}>
        <FilterSearchblock block={'L'} department={'EEE'} />
      </MainCard>
    </MainCard>
  );
};

export default TablerIcons;