import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import sportbg from '../../../assets/images/sportbg.webp';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundImage: `url(${sportbg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const Mytest = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        mt: 1,
                        a:{
                          color: '#ffffff',
                        }
                      }}
                    >
                      <a href="/indoorsports"><EmojiEventsIcon fontSize="inherit" /></a>
                    </Avatar>
                  </Grid>
                  {/* Removed the second Avatar component */}
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{color:'white',fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>13</Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.primary[200],
                        a:{
                          color: theme.palette.primary.dark
                        } 
                      }}
                    >
                      <a href="/indoorsports"><ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} /></a>
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.primary[200]
                  }}
                >
                  Number of Sports Facilities
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

Mytest.propTypes = {
  isLoading: PropTypes.bool
};

export default Mytest;