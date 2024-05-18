import React, { useState, useEffect } from 'react';
import { Grid,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import './Filter.css';

const Header = styled(Typography)({
  textAlign: 'center',
  color: 'black',
 
});

const DropdownContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginBottom: '20px',
});

const Dropdown = styled(FormControl)({
  minWidth: 200,
  '& .MuiInputLabel-root': {
    color: '#ba2c1b',
  },
  '& .MuiSelect-root': {
    color: 'blue',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ba2c1b',
  },
});

const FilterSearch = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState('');
  const [blockData, setBlockData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departmentData, setDepartmentData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryData, setCategoryData] = useState({});
  const [selectedTable, setSelectedTable] = useState('');

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/block/blocks');
      if (!response.ok) {
        throw new Error('Failed to fetch blocks');
      }
      const data = await response.json();
      setBlocks(data.map(block => block.Block));
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };

  const fetchBlockData = async (blockName) => {
    try {
      const response = await fetch(`http://localhost:8000/api/block/data/${blockName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch block data');
      }
      const data = await response.json();
      console.log(Object.keys(blockData));
      setBlockData(data);
    } catch (error) {
      console.error('Error fetching block data:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async (blockName) => {
    try {
      if (blockName) {
        const response = await fetch(`http://localhost:8000/api/block/departments/${blockName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data);
      } else {
        // Fetch departments without specifying a block
        const response = await fetch(`http://localhost:8000/api/block/departments`);
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  
  const fetchDepartmentData = async (departmentName) => {
    try {
      const response = await fetch(`http://localhost:8000/api/block/department/datas/${departmentName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch department data');
      }
      const data = await response.json();
      setDepartmentData(data);
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const fetchCategoriesForBlock = async (blockName) => {
    try {
      const response = await fetch(`http://localhost:8000/api/block/blocks/categories/${blockName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories for block');
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories for block:', error);
    }
  };

  const fetchCategories = async (blockName, departmentName) => {
    if (departmentName) {
      try {
        const response = await fetch(`http://localhost:8000/api/block/fetchcategories/${blockName}/${departmentName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.documentNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    } else {
      await fetchCategoriesForBlock(blockName);
    }
  };

  const fetchCategoryData = async (blockName, departmentName, categoryName) => {
    try {
      const response = await fetch(`http://localhost:8000/api/block/category/data/${blockName}/${departmentName}/${categoryName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category data');
      }
      const data = await response.json();
      setCategoryData(data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useEffect(() => {
    if (selectedBlock) {
      fetchDepartments(selectedBlock);
      fetchBlockData(selectedBlock);
      fetchCategories(selectedBlock, selectedDepartment);
    }
  }, [selectedBlock]);

  useEffect(() => {
    if (selectedDepartment) {
      fetchDepartmentData(selectedDepartment);
      fetchCategories(selectedBlock, selectedDepartment);
    }
  }, [selectedDepartment]);

  const handleBlockChange = (event) => {
    const blockName = event.target.value;
    setSelectedBlock(blockName);
    setSelectedDepartment('');
    setDepartments([]);
    setDepartmentData({});
    setSelectedCategory('');
    setCategories([]);
    setCategoryData({});
  };

  const handleDepartmentChange = (event) => {
    const departmentName = event.target.value;
    setSelectedDepartment(departmentName);
    setSelectedCategory('');
    setCategories([]);
    setCategoryData({});
  };

  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    setSelectedCategory(categoryName);
    fetchCategoryData(selectedBlock, selectedDepartment, categoryName);
  };

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };
  return (
    <div className="container">
      <Grid item xs={12}>
         <Paper style={{ padding: '20px', background: '#fff' }}>
           <Grid container justifyContent="space-between" alignItems="center">
             <Grid item>
               <Typography variant="h1" sx={{ color: '#ba2c1b' }}>
                 ALL DATA FILTER
               </Typography>
             </Grid>
           </Grid>
         </Paper>
       </Grid>
       <br></br>
       <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Header variant="h3" style={{ marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>Select a Block, Department and Category</Header>
       </div>
       <DropdownContainer style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Dropdown variant="outlined" style={{ width: 'calc(33.33% - 8px)' }}>
        <InputLabel>BLOCK</InputLabel>
        <Select value={selectedBlock} onChange={handleBlockChange} label="Select a block...">
          <MenuItem value=""><em>None</em></MenuItem>
          {blocks.map((block, index) => (
            <MenuItem key={index} value={block}>{block}</MenuItem>
          ))}
        </Select>
      </Dropdown>
      <Dropdown variant="outlined" style={{ width: 'calc(33.33% - 8px)' }}>
        <InputLabel>DEPARTMENT</InputLabel>
        <Select value={selectedDepartment} onChange={handleDepartmentChange} label="Select a department...">
          <MenuItem value=""><em>None</em></MenuItem>
          {departments.map((department, index) => (
            <MenuItem key={index} value={department}>{department}</MenuItem>
          ))}
        </Select>
      </Dropdown>
      <Dropdown variant="outlined" style={{ width: 'calc(33.33% - 8px)' }}>
        <InputLabel id="table-select-label">Table</InputLabel>
        <Select
          labelId="table-select-label"
          value={selectedTable}
          onChange={handleTableChange}
          label="Table"
        >
          <MenuItem value="">All Tables</MenuItem>
          <MenuItem value="Classrooms">Classrooms</MenuItem>
          <MenuItem value="Labs">Labs</MenuItem>
          <MenuItem value="Faculty">Faculty</MenuItem>
          {/* Add more menu items for other tables */}
        </Select>
      </Dropdown>
    </DropdownContainer>
      {selectedBlock && Object.keys(blockData).length > 0 && !selectedDepartment && (
        <div>
          {(!selectedTable || selectedTable === 'Classrooms') && (
            <div>
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>CLASSROOMS</Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Classroom Number</TableCell>
                      <TableCell>Capacity</TableCell>
                      <TableCell>Department Id</TableCell>
                      <TableCell>Floor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blockData.flatMap((block) => block.classrooms.map((classroom) => (
                      <TableRow key={classroom._id}>
                        <TableCell>{classroom.number}</TableCell>
                        <TableCell>{classroom.capacity}</TableCell>
                        <TableCell>{classroom.DepartmentId}</TableCell>
                        <TableCell>{classroom.Floor}</TableCell>
                      </TableRow>
                    )))}
                  </TableBody>
                </Table>
              </TableContainer>
              
            </div>
          )}
          
          {(!selectedTable || selectedTable === 'Labs') && (
            <div>
              <br></br>
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }} >LABS</Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Lab Number</TableCell>
                      <TableCell>Lab Name</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Equipment Status</TableCell>
                      <TableCell>Floor</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {blockData.flatMap((block) => block.Labs.map((lab) => (
                      <TableRow key={lab._id}>
                        <TableCell>{lab.Lab_num}</TableCell>
                        <TableCell>{lab.name}</TableCell>
                        <TableCell>{lab.Department}</TableCell>
                        <TableCell>{lab.Equipment_status}</TableCell>
                        <TableCell>{lab.Floor}</TableCell>
                      </TableRow>
                    )))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          
          {(!selectedTable || selectedTable === 'Faculty') && (
            <div>
              <br></br>
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>FACULTY</Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Faculty ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Designation</TableCell>
                      <TableCell>Date of Joining</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blockData.flatMap((block) => block.Faculty.map((faculty) => (
                      <TableRow key={faculty._id}>
                        <TableCell>{faculty.Facultyid}</TableCell>
                        <TableCell>{faculty.name}</TableCell>
                        <TableCell>{faculty.Designation}</TableCell>
                        <TableCell>{faculty.DOJ}</TableCell>
                        <TableCell>{faculty.Department}</TableCell>
                        <TableCell>{faculty.Role}</TableCell>
                      </TableRow>
                    )))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          {/* Add other tables for Students, Research, Committees, Mentoring, EventsOrganized, EventsParticipated, Clubs in a similar manner */}
        </div>
      )}

      {selectedDepartment && Object.keys(departmentData).length > 0 && !selectedCategory && (
        <div>
          {(!selectedTable || selectedTable === 'Classrooms') && (
            <div>
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>CLASSROOMS</Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Classroom Number</TableCell>
                      <TableCell>Capacity</TableCell>
                      <TableCell>Department Id</TableCell>
                      <TableCell>Floor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {departmentData.classrooms.map(classroom => (
                      <TableRow key={classroom._id}>
                        <TableCell>{classroom.number}</TableCell>
                        <TableCell>{classroom.capacity}</TableCell>
                        <TableCell>{classroom.DepartmentId}</TableCell>
                        <TableCell>{classroom.Floor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {(!selectedTable || selectedTable === 'Labs') && (
            <div>
              <br></br>
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>LABS</Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Lab Number</TableCell>
                      <TableCell>Lab Name</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Equipment Status</TableCell>
                      <TableCell>Floor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {departmentData.Labs.map(lab => (
                      <TableRow key={lab._id}>
                        <TableCell>{lab.Lab_num}</TableCell>
                        <TableCell>{lab.name}</TableCell>
                        <TableCell>{lab.Department}</TableCell>
                        <TableCell>{lab.Equipment_status}</TableCell>
                        <TableCell>{lab.Floor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {(!selectedTable || selectedTable === 'Faculty') && (
            <div>
              <br></br>
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>FACULTY</Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Faculty ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Designation</TableCell>
                      <TableCell>Date of Joining</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {departmentData.Faculty.map(faculty => (
                      <TableRow key={faculty.Facultyid}>
                        <TableCell>{faculty.Facultyid}</TableCell>
                        <TableCell>{faculty.name}</TableCell>
                        <TableCell>{faculty.Designation}</TableCell>
                        <TableCell>{faculty.DOJ}</TableCell>
                        <TableCell>{faculty.Department}</TableCell>
                        <TableCell>{faculty.Role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          {/* Render other tables (Seminar Halls, Students, Research, etc.) similarly */}
        </div>
      )}

      {selectedCategory && (
        <div>
          <Typography variant="h2">Category Data</Typography>
          <pre>{JSON.stringify(categoryData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
  };

export default FilterSearch;
