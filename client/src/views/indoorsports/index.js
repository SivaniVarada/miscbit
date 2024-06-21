import React, { useRef } from 'react';
import { Grid, Typography, Button, Avatar, List, ListItem, ListItemText, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import html2pdf from 'html2pdf.js';
import image1 from './images/Aerobics.jpg';
import image2 from './images/Badminton.jpg';
import image3 from './images/Carroms.jpg';
import image4 from './images/Chess.jpg';
import image5 from './images/Gym.jpg';
import image6 from './images/Tabletennis.jpg';
import { fontWeight } from '@mui/system';

const Block = ({ title, imageUrl, parameters }) => (
  <MainCard
    title={title}
    sx={{
      textAlign: 'center',
      padding: '16px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
    }}
    titleProps={{ variant: 'h5', fontWeight: 'bold' }} // Bold title
  >
    <Avatar variant="rounded" sx={{ width: '100%', height: 'auto', mb: 1 }} src={imageUrl} />
    <List sx={{ '& .MuiListItem-root': { py: 0 } }}>
      {parameters.map((param, index) => (
        <ListItem key={index} disablePadding sx={{ justifyContent: 'center' }}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography variant="body1" component="span" style={{ fontWeight: 'bold' }}>
                  {param.label}:
                </Typography>
                <Typography variant="body1" component="span" sx={{ marginLeft: '10px' }}>
                  {param.value}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  </MainCard>
);

const IndoorSports = ({ blocksData }) => {
  const contentRef = useRef(null);

  const downloadPdf = () => {
    const content = contentRef.current;

    if (!content) {
      console.error('Content reference is not available');
      return;
    }

    html2pdf()
      .set({
        margin: [2, 2],
        filename: 'Indoor Sports Infrastructure CBIT.pdf'
      })
      .from(content)
      .save();
  };

  return (
    <Grid container spacing={3} alignItems="center" ref={contentRef}>
      {/* White block containing Seminar Halls heading and Download PDF button */}
      <Grid item xs={12}>
        <Paper style={{ padding: '20px', background: '#fff' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h1" sx={{ color: '#941b1c' }}>
                INDOOR SPORTS
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={downloadPdf}>
                Download PDF
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{ maxWidth: '1200px' }}>
        <Grid container spacing={3}>
          {blocksData &&
            blocksData.map((block, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Block {...block} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const App = () => {
  const blocksData = [
    {
      title: 'Aerobics Room',
      imageUrl: image1,
      parameters: [
        { label: 'Capacity', value: '100' },
        { label: 'Floor', value: '1' },
        { label: 'Equipment Condition', value: 'Working' },
        { label: 'Available', value: 'Yes' }
      ]
    },
    {
      title: 'Badminton',
      imageUrl: image2,
      parameters: [
        { label: 'Capacity', value: '50' },
        { label: 'Floor', value: 'Ground' },
        { label: 'Equipment Condition', value: 'Working' },
        { label: 'Available', value: 'Yes' }
      ]
    },
    {
      title: 'Carroms Room',
      imageUrl: image3,
      parameters: [
        { label: 'Capacity', value: '30' },
        { label: 'Floor', value: '1' },
        { label: 'Equipment Condition', value: 'Working' },
        { label: 'Available', value: 'Yes' }
      ]
    },
    {
      title: 'Chess Room',
      imageUrl: image4,
      parameters: [
        { label: 'Capacity', value: '30' },
        { label: 'Floor', value: '1' },
        { label: 'Equipment Condition', value: 'Working' },
        { label: 'Available', value: 'Yes' }
      ]
    },
    {
      title: 'Gymansium',
      imageUrl: image5,
      parameters: [
        { label: 'Capacity', value: '50' },
        { label: 'Floor', value: 'Ground' },
        { label: 'Equipment Condition', value: 'Working' },
        { label: 'Available', value: 'Yes' }
      ]
    },
    {
      title: 'Table Tennis Room',
      imageUrl: image6,
      parameters: [
        { label: 'Capacity', value: '50' },
        { label: 'Floor', value: '2' },
        { label: 'Equipment Condition', value: 'Working' },
        { label: 'Available', value: 'Yes' }
      ]
    }
    // Add data for other blocks as needed
  ];

  return <IndoorSports blocksData={blocksData} />;
};

export default App;
