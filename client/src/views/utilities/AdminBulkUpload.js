import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import PinIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const SamplePage1 = () => {
  const contentRef = useRef(null);
  const [block, setBlock] = useState('');
  const [uploadKey, setUploadKey] = useState(Date.now()); // Add a state for forcing re-render of file input
  //const [isAdmin, setIsAdmin] = useState(false);
  // useEffect(() => {
  //   // Check user's role when component mounts
  //   const userRole = localStorage.getItem('token'); // Assuming role is stored in localStorage
  //   setIsAdmin(userRole === 'admin');
  // }, []);

  const handleBlockChange = (event) => {
    const selectedBlock = event.target.value;
    setBlock(selectedBlock);
    const blockRef = document.getElementById(`${selectedBlock.toLowerCase()}-block`);
    
    if (blockRef) {
      blockRef.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleFileUpload = async (event, dataType, block) => {
    event.preventDefault(); // Prevent default form submission
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http://localhost:8000/data/import/${dataType}/${block}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response && response.data && response.data.success) {
        alert('Uploaded successfully');
      } else {
        alert('Upload successful, but no message returned from server.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);

      if (error.response && error.response.data && error.response.data.msg) {
        alert('Error uploading file: ' + error.response.data.msg);
      } else {
        alert('Error uploading file: ' + error.message);
      }
    }
    setUploadKey(Date.now());
  };

  const downloadFile = (fileName) => {
    const link = document.createElement('a');
    link.href = `client/src/views/utilities/Templatesbulkupload/${fileName}.xlsx`; // Adjust the path to your actual file location
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Grid container spacing={3} ref={contentRef}>
      {/* Heading section */}
      <Grid item xs={12}>
  <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h1" sx={{ textAlign: 'center', color: '#941b1c' }}>
          BULK UPLOAD
        </Typography>
      </Grid>
      <Grid item>
        <Tooltip title="Bulk Upload Templates">
          <div style={{ paddingRight: '10px' }}>
          <Link to="https://drive.google.com/drive/folders/1VmQN68ulegklC8rTP3l7N7CbxTqB4mgr?usp=sharing" target='_blank'>
            <PinIcon /> {/* This is the Material-UI Pin icon */}
          </Link> {/* This is the Material-UI Pin icon */}
          </div>
        </Tooltip>
      </Grid>
    </Grid>
  </MainCard>
</Grid>


      {/* Block Dropdown */}
      <Grid item xs={12}>
        <Select fullWidth value={block} onChange={handleBlockChange} variant="outlined" sx={{ marginTop: 2 }} displayEmpty>
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

      {/* A Block section */}
      <Grid id="a-block" item xs={12} style={{ display: block === 'A' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
                    {`A BLOCK DATA`}
                  </Typography>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography
                variant="h3"
                sx={{ textAlign: 'left', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%', paddingLeft: '25px' }}
              >
                CSE DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>



      {/* B Table section */}
      <Grid id="b-block" item xs={12} style={{ display: block === 'B' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>


      {/* C Table section */}
      <Grid id="c-block" item xs={12} style={{ display: block === 'C' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>



      {/* D Table section */}
      <Grid id="d-block" item xs={12} style={{ display: block === 'D' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms', type: 'classrooms' },
                      { label: 'Labs', id: 'upload-labs', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>



      {/* G Table section */}
      <Grid id="g-block" item xs={12} style={{ display: block === 'G' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>


      {/* H Table section */}
      <Grid id="h-block" item xs={12} style={{ display: block === 'H' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      {/* H BLOCK END */}




      {/* L Table section */}
      <Grid id="l-block" item xs={12} style={{ display: block === 'L' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                IT DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          {/* EEE BLOCK DATA */}
          <Grid container direction="column" spacing={2}>
            {/* Title */}
            <Grid item>
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '4%' }}>
                EEE DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms-eee', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs-eee', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls-eee', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms-eee', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      {/* L BLOCK END */}


      {/* M Table section */}
      <Grid id="m-block" item xs={12} style={{ display: block === 'M' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms-m', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs-m', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls-m', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms-m', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      {/* M BLOCK END */}




      {/* N Table section */}
      <Grid id="n-block" item xs={12} style={{ display: block === 'N' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>

            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms-n', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs-n', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls-n', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms-n', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      {/* N BLOCK END */}


      {/* K Table section */}
      <Grid id="k-block" item xs={12} style={{ display: block === 'K' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms-k', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs-k', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls-k', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms-k', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      {/* K BLOCK END */}


      {/* SMS Table section */}
      <Grid id="sms-block" item xs={12} style={{ display: block === 'SMS' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms-sms', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs-sms', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls-sms', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms-sms', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      {/* SMS BLOCK END */}


      {/* R&D Table section */}
      <Grid id="r&d-block" item xs={12} style={{ display: block === 'R&D' ? 'block' : 'none' }}>
        <MainCard>
          <Grid item xs={12}>
            <MainCard sx={{ paddingTop: { xs: '20px', sm: '0px' } }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h2" sx={{ textAlign: 'center', color: '#941b1c' }}>
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
              <Typography variant="h3" sx={{ textAlign: 'center', color: '#941b1c', paddingTop: '2%', paddingBottom: '7%' }}>
                DEPARTMENT TITLE DETAILS
              </Typography>
            </Grid>
            {/* Table */}
            <Grid item xs={12} style={{ overflowX: 'auto' }}>
              <TableContainer style={{ minWidth: 300, overflowX: 'auto' }}>
                <Table stickyHeader style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Resource Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'Classrooms', id: 'upload-classrooms-rnd', type: 'Classrooms' },
                      { label: 'Labs', id: 'upload-labs-rnd', type: 'Labs' },
                      { label: 'Seminar Halls', id: 'upload-seminar-halls-rnd', type: 'SeminarHalls' },
                      { label: 'Washrooms', id: 'upload-washrooms-rnd', type: 'Washrooms' },
                    ].map(({ label, id, type }) => (
                      <TableRow key={id}>
                        <TableCell align="center">{label}</TableCell>
                        <TableCell align="center">
                          <input
                            key={uploadKey} // Force re-render by changing key
                            accept=".csv"
                            style={{ display: 'none' }}
                            id={id}
                            type="file"
                            onChange={(event) => handleFileUpload(event, type, block)}
                          />
                          <label htmlFor={id}>
                            <Button variant="contained" component="span">
                              Upload
                            </Button>
                          </label>
                        </TableCell>
                      </TableRow>
                    ))}
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
