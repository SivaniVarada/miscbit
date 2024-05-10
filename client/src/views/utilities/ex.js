import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const FilterSearchblock = ({ block, department}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL DATA');
  const [departmentData, setDepartmentData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jsonData, setJsonData] = useState(null);
  const [excelGenerated, setExcelGenerated] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const navigate= useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8010/api/block/categories/${block}/${department}`);
        setCategories(response.data);
      } catch (error) {
        console.error(`Error fetching categories for department ${department} in block ${block}:`, error);
      }
    };
    fetchCategories();
  }, [block, department]);

  useEffect(() => {
    handleCategorySelect(selectedCategory);
  }, [selectedCategory]);
  
  const handlealldataselect=async(category)=>{
    try{
      navigate(`/${department}`);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    const url = category === 'ALL DATA' ? 
      `http://localhost:8010/api/block/allData/${block}/${department}` :
      `http://localhost:8010/api/block/category/${block}/${department}/${category}`;
    try {
      const response = await axios.get(url);
      if(response.data==null){
        response.data=`NO ${category} are there `
      }
      setDepartmentData(response.data);
      fetchJsonData(url);
    } catch (error) {
      console.error(`Error fetching ${category} for department ${department} in block ${block}:`, error);
    }
  };

  const fetchJsonData = (url) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(json => {
        if (json && json.length > 0) {
          setJsonData(json);
        } else {
          throw new Error('Empty JSON response');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const convertJsonToExcel = () => {
    if (!jsonData) return;

    const keys = Object.keys(jsonData[0]);
    const data = jsonData.map(item => {
      const row = {};
      keys.forEach(key => {
        if (key !== '_id') {
          row[key] = item[key];
        }
      });
      return row;
    });

    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, 'posts');

    XLSX.writeFile(workBook, 'postsData.xlsx');

    setExcelGenerated(true);
  };

  const convertJsonToPDF = () => {
    if (!jsonData) return;

    const keys = Object.keys(jsonData[0]).filter(key => key !== '_id');
    const data = jsonData.map(item =>
      keys.map(key => (typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]))
    );

    const doc = new jsPDF();
    doc.autoTable({ head: [keys], body: data });
    doc.save('jsonData.pdf');

    setPdfGenerated(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Select
          value={selectedCategory}
          onChange={(e) => handleCategorySelect(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
        <Button 
          onClick={() => handlealldataselect('ALL DATA')}
          style={{
            width: '15%', 
            marginBottom: '10px', 
            backgroundColor: selectedCategory === 'ALL DATA' ? 'darkgreen' : '#EFA198',
            color: 'white',
          }}
          variant="contained"
        >
          ALL DATA
        </Button>
      </div>
      <Paper style={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer style={{ maxHeight: '440px', overflowY: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {departmentData.length > 0 && typeof departmentData[0] === 'object' && (
                  Object.keys(departmentData[0]).map((key) => (
                    key !== '_id' && <TableCell key={key}>{key}</TableCell>
                  ))
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentData.map((item, index) => (
                <TableRow key={index}>
                  {typeof item === 'object' && Object.keys(item).map((key) => (
                    key !== '_id' && (
                      <TableCell key={key}>
                        {typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]}
                      </TableCell>
                    )
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ marginTop: '20px' }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={departmentData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={convertJsonToExcel} style={{ marginRight: '10px' }} variant="contained" color="primary">Generate Excel</Button>
        <Button onClick={convertJsonToPDF} variant="contained" color="primary">Generate PDF</Button>
      </div>
      {excelGenerated && <p>Excel file generated successfully.</p>}
      {pdfGenerated && <p>PDF file generated successfully.</p>}
    </div>
  );
};

export default FilterSearchblock;