import React, { useRef } from 'react';
import { Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const SamplePage1 = () => {
  const contentRef = useRef(null);

  const handleBlockChange = (event) => {
    const block = event.target.value;
    const blockRef = document.getElementById(`${block.toLowerCase()}-block`);
    if (blockRef) {
      blockRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Grid container spacing={3} ref={contentRef}>
      {/* Heading section */}
      <Grid item xs={12}>
        <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h1" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                BULK UPLOAD
              </Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Block Dropdown */}
      <Grid item xs={12}>
        <Select
          fullWidth
          value=""
          onChange={handleBlockChange}
          variant="outlined"
          sx={{ marginTop: 2 }}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Block
          </MenuItem>
          <MenuItem value="A">A Block Data</MenuItem>
          <MenuItem value="B">B Block Data</MenuItem>
          <MenuItem value="C">C Block Data</MenuItem>
          <MenuItem value="D">D Block Data</MenuItem>
          <MenuItem value="G">G Block Data</MenuItem>
          <MenuItem value="H">H Block Data</MenuItem>
          <MenuItem value="L">L Block Data</MenuItem>
          <MenuItem value="M">M Block Data</MenuItem>
          <MenuItem value="N">N Block Data</MenuItem>
          <MenuItem value="K">K Block Data</MenuItem>
          <MenuItem value="SMS">SMS Block Data</MenuItem>
          <MenuItem value="R&D">R&D Block Data</MenuItem>
        </Select>
      </Grid>

      {/* A Table section */}
      <Grid id="a-block" item xs={12}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    A BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* A BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                CSE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Button</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Button</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Button</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Button</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* A BLOCK END */}

      {/* B Table section */}
      <Grid id="b-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    B BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* B BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* B BLOCK END */}

      {/* C Table section */}
      <Grid id="c-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    C BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* C BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* C BLOCK END */}

      {/* D Table section */}
      <Grid id="d-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    D BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* D BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* D BLOCK END */}

      {/* G Table section */}
      <Grid id="g-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    G BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* G BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* G BLOCK END */}

      {/* H Table section */}
      <Grid id="h-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    H BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* H BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* H BLOCK END */}



      {/* L Table section */}
      <Grid id="l-block" item xs={12}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    L BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
         </Grid>

          {/* L BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                IT DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>


         {/* EEE BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                EEE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>


      {/* M Table section */}
      <Grid id="m-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    M BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* M BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* M BLOCK END */}

      {/* N Table section */}
      <Grid id="n-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    N BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* N BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* N BLOCK END */}


      {/* K Table section */}
      <Grid id="k-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    K BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* K BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* K BLOCK END */}

      {/* SMS Table section */}
      <Grid id="sms-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    SMS BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* SMS BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* SMS BLOCK END */}

      {/* R&D Table section */}
      <Grid id="r&d-block" item xs={12}>
        <MainCard >
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#ba2c1b' }}>
                    R&D BLOCK DATA
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* R&D BLOCK DATA */}
         <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#ba2c1b', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Classrooms</TableCell>
                      <TableCell align="center">Labs</TableCell>
                      <TableCell align="center">Seminar Halls</TableCell>
                      <TableCell align="center">Washrooms</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                      <TableCell align="center"><Button variant="contained">Upload</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
         </Grid>
        </MainCard>
      </Grid>
      {/* R&D BLOCK END */}

    </Grid>
  );
};

export default SamplePage1;
