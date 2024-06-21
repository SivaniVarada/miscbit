import React, { useState, useEffect } from 'react';
import { Grid,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import './Filter.css';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
  const [excelGenerated, setExcelGenerated] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const response = await fetch('https://miscbit-8.onrender.com/api/block/blocks');
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
      const response = await fetch(`https://miscbit-8.onrender.com/api/block/data/${blockName}`);
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
        const response = await fetch(`https://miscbit-8.onrender.com/api/block/departments/${blockName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data);
      } else {
        // Fetch departments without specifying a block
        const response = await fetch(`https://miscbit-8.onrender.com/api/block/departments`);
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
      const response = await fetch(`https://miscbit-8.onrender.com/api/block/department/datas/${departmentName}`);
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
      const response = await fetch(`https://miscbit-8.onrender.com/api/block/blocks/categories/${blockName}`);
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
        const response = await fetch(`https://miscbit-8.onrender.com/api/block/fetchcategories/${blockName}/${departmentName}`);
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
      const response = await fetch(`https://miscbit-8.onrender.com/api/block/category/data/${blockName}/${departmentName}/${categoryName}`);
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
  const convertJsonToExcel = () => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    console.log(blockData)
    const createSheetData = (data, keys) => {
      return data.map(item => {
          const row = {};
          keys.forEach(key => {
              if (key !== '_id') {
                  row[key] = item[key];
              }
          });
          return row;
      });
  };

  const workBook = XLSX.utils.book_new();

  const categories = [
      "Department",
      "Labs",
      "classrooms",
      "SeminarHalls",
      "Timetables",
      "Student",
      "Faculty",
      "Research",
      "Committe",
      "Mentoring",
      "EventsOrganized",
      "EventsParticipated",
      "Clubs"
  ];

  categories.forEach(category => {
      const data = [];
      blockData.forEach(block => {
          if (block[category] && Array.isArray(block[category])) {
              block[category].forEach(item => {
                  const row = { Block: block.Block, ...item };
                  data.push(row);
              });
          }
      });
      if (data.length > 0) {
          const keys = Object.keys(data[0]);
          const sheetData = createSheetData(data, keys);
          const workSheet = XLSX.utils.json_to_sheet(sheetData);
          XLSX.utils.book_append_sheet(workBook, workSheet, category);
      }
  });
  

  XLSX.writeFile(workBook, `${selectedBlock}-BlockData.xlsx`);
  setExcelGenerated(true);

  };

  const convertJsonToPDF = () => {
    const doc = new jsPDF();
  
    blockData.forEach(block => {
      doc.text(`Block: ${block.Block}`, 10, 10);
      
      // Handle Labs
      if (block.Labs && block.Labs.length > 0) {
        doc.addPage();
        doc.text('Labs', 10, 10);
        const labKeys = Object.keys(block.Labs[0]).filter(key => key !== '_id');
        const labData = block.Labs.map(lab => labKeys.map(key => lab[key]));
        doc.autoTable({
          head: [labKeys],
          body: labData,
          startY: 20,
        });
      }
  
      // Handle Classrooms
      if (block.classrooms && block.classrooms.length > 0) {
        doc.addPage();
        doc.text('Classrooms', 10, 10);
        const classroomKeys = Object.keys(block.classrooms[0]).filter(key => key !== '_id');
        const classroomData = block.classrooms.map(classroom => classroomKeys.map(key => classroom[key]));
        doc.autoTable({
          head: [classroomKeys],
          body: classroomData,
          startY: 20,
        });
      }
  
      // Handle Departments
      if (block.Department && block.Department.length > 0) {
        doc.addPage();
        doc.text('Departments', 10, 10);
        const departmentKeys = Object.keys(block.Department[0]).filter(key => key !== '_id');
        const departmentData = block.Department.map(department => departmentKeys.map(key => department[key]));
        doc.autoTable({
          head: [departmentKeys],
          body: departmentData,
          startY: 20,
        });
      }
  
      // Handle Seminar Halls
      if (block.SeminarHalls && block.SeminarHalls.length > 0) {
        doc.addPage();
        doc.text('Seminar Halls', 10, 10);
        const seminarHallKeys = Object.keys(block.SeminarHalls[0]).filter(key => key !== '_id');
        const seminarHallData = block.SeminarHalls.map(hall => seminarHallKeys.map(key => hall[key]));
        doc.autoTable({
          head: [seminarHallKeys],
          body: seminarHallData,
          startY: 20,
        });
      }
  
      // Handle Timetables
      if (block.Timetables && block.Timetables.length > 0) {
        doc.addPage();
        doc.text('Timetables', 10, 10);
        const timetableKeys = Object.keys(block.Timetables[0]).filter(key => key !== '_id');
        const timetableData = block.Timetables.map(tt => timetableKeys.map(key => tt[key]));
        doc.autoTable({
          head: [timetableKeys],
          body: timetableData,
          startY: 20,
        });
      }
  
      // Handle Students
      if (block.Student && block.Student.length > 0) {
        doc.addPage();
        doc.text('Students', 10, 10);
        const studentKeys = Object.keys(block.Student[0]).filter(key => key !== '_id');
        const studentData = block.Student.map(student => studentKeys.map(key => student[key]));
        doc.autoTable({
          head: [studentKeys],
          body: studentData,
          startY: 20,
        });
      }
  
      // Handle Faculty
      if (block.Faculty && block.Faculty.length > 0) {
        doc.addPage();
        doc.text('Faculty', 10, 10);
        const facultyKeys = Object.keys(block.Faculty[0]).filter(key => key !== '_id');
        const facultyData = block.Faculty.map(faculty => facultyKeys.map(key => faculty[key]));
        doc.autoTable({
          head: [facultyKeys],
          body: facultyData,
          startY: 20,
        });
      }
  
      // Handle Research
      if (block.Research && block.Research.length > 0) {
        doc.addPage();
        doc.text('Research', 10, 10);
        const researchKeys = Object.keys(block.Research[0]).filter(key => key !== '_id');
        const researchData = block.Research.map(research => researchKeys.map(key => research[key]));
        doc.autoTable({
          head: [researchKeys],
          body: researchData,
          startY: 20,
        });
      }
  
      // Handle Committees
      if (block.Committe && block.Committe.length > 0) {
        doc.addPage();
        doc.text('Committees', 10, 10);
        const committeeKeys = Object.keys(block.Committe[0]).filter(key => key !== '_id');
        const committeeData = block.Committe.map(committee => committeeKeys.map(key => committee[key]));
        doc.autoTable({
          head: [committeeKeys],
          body: committeeData,
          startY: 20,
        });
      }
  
      // Handle Mentoring
      if (block.Mentoring && block.Mentoring.length > 0) {
        doc.addPage();
        doc.text('Mentoring', 10, 10);
        const mentoringKeys = Object.keys(block.Mentoring[0]).filter(key => key !== '_id');
        const mentoringData = block.Mentoring.map(mentoring => mentoringKeys.map(key => mentoring[key]));
        doc.autoTable({
          head: [mentoringKeys],
          body: mentoringData,
          startY: 20,
        });
      }
  
      // Handle Events Organized
      if (block.EventsOrganized && block.EventsOrganized.length > 0) {
        doc.addPage();
        doc.text('Events Organized', 10, 10);
        const eventsOrganizedKeys = Object.keys(block.EventsOrganized[0]).filter(key => key !== '_id');
        const eventsOrganizedData = block.EventsOrganized.map(event => eventsOrganizedKeys.map(key => event[key]));
        doc.autoTable({
          head: [eventsOrganizedKeys],
          body: eventsOrganizedData,
          startY: 20,
        });
      }
  
      // Handle Events Participated
      if (block.EventsParticipated && block.EventsParticipated.length > 0) {
        doc.addPage();
        doc.text('Events Participated', 10, 10);
        const eventsParticipatedKeys = Object.keys(block.EventsParticipated[0]).filter(key => key !== '_id');
        const eventsParticipatedData = block.EventsParticipated.map(event => eventsParticipatedKeys.map(key => event[key]));
        doc.autoTable({
          head: [eventsParticipatedKeys],
          body: eventsParticipatedData,
          startY: 20,
        });
      }
  
      // Handle Clubs
      if (block.Clubs && block.Clubs.length > 0) {
        doc.addPage();
        doc.text('Clubs', 10, 10);
        const clubsKeys = Object.keys(block.Clubs[0]).filter(key => key !== '_id');
        const clubsData = block.Clubs.map(club => clubsKeys.map(key => club[key]));
        doc.autoTable({
          head: [clubsKeys],
          body: clubsData,
          startY: 20,
        });
      }
    });

    doc.save(`${selectedBlock}-Blockdata`);
    setPdfGenerated(true);
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
      <br />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h3" style={{ marginBottom: '30px', color: '#ba2c1b', fontWeight: 'bold' }}>
          SELECT A BLOCK DEPARTMENT & CATEGORY
        </Typography>
      </div>
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={4}>
          <InputLabel>BLOCK</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            value={selectedBlock}
            onChange={handleBlockChange}
            label="BLOCK"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {blocks.map((block, index) => (
              <MenuItem key={index} value={block}>
                {block}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel>DEPARTMENT</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            label="DEPARTMENT"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {departments.map((department, index) => (
              <MenuItem key={index} value={department}>
                {department}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="table-select-label">Table</InputLabel>
          <Select
            labelId="table-select-label"
            fullWidth
            value={selectedTable}
            onChange={handleTableChange}
            label="Table"
          >
            <MenuItem value="">All Tables</MenuItem>
            <MenuItem value="Classrooms">Classrooms</MenuItem>
            <MenuItem value="Labs">Labs</MenuItem>
            <MenuItem value="Faculty">Washrooms</MenuItem>
            <MenuItem value="SeminarHalls">SeminarHalls</MenuItem>
            {/* Add more menu items for other tables */}
          </Select>
        </Grid>
      </Grid>
      {selectedBlock && Object.keys(blockData).length > 0 && !selectedDepartment && (
        <div>
          {(!selectedTable || selectedTable === 'Classrooms') && (
            <div>
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>
                CLASSROOMS
              </Typography>
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
                    {blockData.flatMap((block) =>
                      block.classrooms.map((classroom) => (
                        <TableRow key={classroom._id}>
                          <TableCell>{classroom.number}</TableCell>
                          <TableCell>{classroom.capacity}</TableCell>
                          <TableCell>{classroom.DepartmentId}</TableCell>
                          <TableCell>{classroom.Floor}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {(!selectedTable || selectedTable === 'Labs') && (
            <div>
              <br />
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>
                LABS
              </Typography>
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
                    {blockData.flatMap((block) =>
                      block.Labs.map((lab) => (
                        <TableRow key={lab._id}>
                          <TableCell>{lab.Lab_num}</TableCell>
                          <TableCell>{lab.name}</TableCell>
                          <TableCell>{lab.Department}</TableCell>
                          <TableCell>{lab.Equipment_status}</TableCell>
                          <TableCell>{lab.Floor}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {(!selectedTable || selectedTable === 'Faculty') && (
            <div>
              <br />
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>
                WASHROOMS
              </Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>S_NO</TableCell>
                      <TableCell>TYPE</TableCell>
                      <TableCell>GENDER</TableCell>
                      <TableCell>FLOOR</TableCell>
                      <TableCell>COUNT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blockData.flatMap((block) =>
                      block.Washrooms.map((faculty) => (
                        <TableRow key={faculty._id}>
                          <TableCell>{faculty.S_NO}</TableCell>
                          <TableCell>{faculty.TYPE}</TableCell>
                          <TableCell>{faculty.GENDER}</TableCell>
                          <TableCell>{faculty.FLOOR}</TableCell>
                          <TableCell>{faculty.COUNT}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

{(!selectedTable || selectedTable === 'SeminarHalls') && (
            <div>
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>
                SeminarHalls
              </Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Hall Number</TableCell>
                      <TableCell>Name</TableCell>
                      
                      <TableCell>Capacity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blockData.flatMap((block) =>
                      block.SeminarHalls.map((classroom) => (
                        <TableRow key={classroom.Hall_number}>
                          <TableCell>{classroom.Hall_number}</TableCell>
                          <TableCell>{classroom.name}</TableCell>
                          <TableCell>{classroom.capacity}</TableCell>
                          
                          
                        </TableRow>
                      ))
                    )}
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
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>
                CLASSROOMS
              </Typography>
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
                    {departmentData.classrooms.map((classroom) => (
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
              <br />
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>
                LABS
              </Typography>
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
                    {departmentData.Labs.map((lab) => (
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

          {(!selectedTable || selectedTable === 'Washrooms') && (
            <div>
              <br />
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>
                WASHROOMS
              </Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>S_NO</TableCell>
                      <TableCell>TYPE</TableCell>
                      <TableCell>GENDER</TableCell>
                      <TableCell>FLOOR</TableCell>
                      <TableCell>COUNT</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {departmentData.Washrooms.map((faculty) => (
                      <TableRow key={faculty.S_NO}>
                        <TableCell>{faculty.TYPE}</TableCell>
                        <TableCell>{faculty.GENDER}</TableCell>
                        <TableCell>{faculty.FLOOR}</TableCell>
                        <TableCell>{faculty.COUNT}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
           {(!selectedTable || selectedTable === 'SeminarHalls') && (
            <div>
              <br />
              <Typography variant="h3" style={{ marginBottom: '20px', color: '#ba2c1b', fontWeight: 'bold' }}>
                SEMINAR HALLS
              </Typography>
              <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>HALL NUMBER</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Capacity</TableCell>
                     
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {departmentData.SeminarHalls.map((hall) => (
                      <TableRow key={hall.Hall_number}>
                        <TableCell>{hall.Hall_number}</TableCell>
                        <TableCell>{hall.name}</TableCell>
                        <TableCell>{hall.capacity}</TableCell>
                       
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
      <div className="button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="button" onClick={convertJsonToExcel}>
          Generate Excel
        </button>
        <button className="button" onClick={convertJsonToPDF}>
          Generate PDF
        </button>
        {/* {excelGenerated && <p className="message">Excel file generated successfully.</p>}
        {pdfGenerated && <p className="message">PDF file generated successfully.</p>} */}
      </div>
    </div>
  );
};

  

export default FilterSearch;
