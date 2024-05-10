import React, { useRef } from 'react';
import { Grid, Typography, Button, Avatar, List, ListItem, ListItemText, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import html2pdf from 'html2pdf.js'; // Import html2pdf library
import image1 from './images/image1.jpeg';
import image2 from './images/image1.jpeg';
import image3 from './images/image1.jpeg';
import image4 from './images/image1.jpeg';
import image5 from './images/image1.jpeg';
import image6 from './images/image1.jpeg';

const Block = ({ title, imageUrl, parameters }) => (
  <MainCard title={title}>
    <Avatar variant="rounded" sx={{ width: '100%', height: 200, mb: 1 }} src={imageUrl} />
    <List sx={{ '& .MuiListItem-root': { py: 0 } }}>
      {parameters.map((param, index) => (
        <ListItem key={index} disablePadding>
          <ListItemText
            primary={
              <React.Fragment>
                <span style={{ fontWeight: 'bold' }}>{param.label}:</span> {param.value}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  </MainCard>
);

const SeminarHalls1 = ({ blocksData }) => {
  const contentRef = useRef(null); // Create a reference for the content container

  const downloadPdf = () => {
    const content = contentRef.current; // Target the content container

    if (!content) {
      console.error("Content reference is not available");
      return;
    }

    // Convert content to PDF
    html2pdf().set({
      margin: [2, 2], // Add margins
      filename: 'Seminar Halls Infrastructure CBIT.pdf' // Set filename
    }).from(content).save();
  };

  return (
    <Grid container spacing={3} alignItems="center" ref={contentRef}>
      {/* White block containing Seminar Halls heading and Download PDF button */}
      <Grid item xs={12}>
        <Paper style={{ padding: '20px', background: '#fff' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h1" sx={{ color: '#ba2c1b' }}>
                SEMINAR HALLS
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={downloadPdf}>Download PDF</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {/* Main content */}
      {blocksData && blocksData.map((block, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Block {...block} />
        </Grid>
      ))}
    </Grid>
  );
};

export default App;
