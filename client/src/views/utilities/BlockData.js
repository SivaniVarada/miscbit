// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Paper from '@mui/material/Paper';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import TablePagination from '@mui/material/TablePagination';
// import Button from '@mui/material/Button';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

// const FilterSearchblock = ({ block, department }) => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('Labs'); // Default to 'Labs'
//   const [departmentData, setDepartmentData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [excelGenerated, setExcelGenerated] = useState(false);
//   const [pdfGenerated, setPdfGenerated] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/block/categories/${block}/${department}`);
//         setCategories(response.data);
//       } catch (error) {
//         console.error(`Error fetching categories for department ${department} in block ${block}:`, error);
//       }
//     };
//     fetchCategories();
//   }, [block, department]);

//   useEffect(() => {
//     // When selectedCategory changes, automatically fetch data
//     if (selectedCategory !== 'All Data') {
//       fetchData();
//     }
//   }, [selectedCategory, block, department]);

//   useEffect(() => {
//     if (!Array.isArray(departmentData)) {
//       setDepartmentData([]);
//     }
//   }, [departmentData]);

//   const handlealldataselect = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:8000/api/block/allData/${block}/${department}`);
//       if (!response.data) {
//         console.error(`No data found for department ${department} in block ${block}`);
//         setDepartmentData([]);
//       } else {
//         setDepartmentData(response.data.Labs || []);
//       }
//     } catch (err) {
//       console.error(err);
//       setDepartmentData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategorySelect = async (category) => {
//     setLoading(true);
//     setSelectedCategory(category);
//     const url = category === 'All Data' ?
//       `http://localhost:8000/api/block/department/data/${block}/${department}` :
//       `http://localhost:8000/api/block/category/data/${block}/${department}/${category}`;
//     try {
//       const response = await axios.get(url);
//       if (response.data && typeof response.data === 'object') {
//         setDepartmentData(response.data[category] || []);
//       } else {
//         setDepartmentData([]);
//       }
//     } catch (error) {
//       console.error(`Error fetching data for category ${category} in department ${department} in block ${block}:`, error);
//       setDepartmentData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const convertJsonToExcel = () => {
//     const keys = Object.keys(departmentData[0]);
//     const data = departmentData.map(item => {
//       const row = {};
//       keys.forEach(key => {
//         if (key !== '_id') {
//           row[key] = item[key];
//         }
//       });
//       return row;
//     });

//     const workSheet = XLSX.utils.json_to_sheet(data);
//     const workBook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(workBook, workSheet, 'posts');

//     XLSX.writeFile(workBook, 'postsData.xlsx');

//     setExcelGenerated(true);
//   };

//   const convertJsonToPDF = () => {
//     const keys = Object.keys(departmentData[0]).filter(key => key !== '_id');
//     const data = departmentData.map(item =>
//       keys.map(key => (typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]))
//     );

//     const doc = new jsPDF();
//     doc.autoTable({ head: [keys], body: data });
//     doc.save('jsonData.pdf');

//     setPdfGenerated(true);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     const url = `http://localhost:8000/api/block/category/data/${block}/${department}/${selectedCategory}`;
//     try {
//       const response = await axios.get(url);
//       console.log(response)
//       if (response.data && typeof response.data === 'object') {
//         setDepartmentData(response.data[selectedCategory] || []);
//       } else {
//         setDepartmentData([]);
//       }
//     } catch (error) {
//       console.error(`Error fetching data for category ${selectedCategory} in department ${department} in block ${block}:`, error);
//       setDepartmentData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <div style={{ marginBottom: '20px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//         <Select
//           value={selectedCategory}
//           onChange={(e) => handleCategorySelect(e.target.value)} // Modified here to directly call handleCategorySelect
//           style={{ width: '100%', marginBottom: '10px', borderRadius: '4px' }}
//           displayEmpty
//           inputProps={{ 'aria-label': 'Select category' }}
//         >
//           {categories.map((category) => (
//             <MenuItem key={category} value={category}>{category}</MenuItem>
//           ))}
//         </Select>
//       </div>
//       <Paper style={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
//         <TableContainer style={{ maxHeight: '440px', overflowY: 'auto' }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {departmentData.length > 0 && typeof departmentData[0] === 'object' && (
//                   Object.keys(departmentData[0]).map((key) => (
//                     key !== '_id' && (
//                       <TableCell key={key}>
//                         <strong>{key.toUpperCase()}</strong>
//                       </TableCell>
//                     )
//                   ))
//                 )}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={Object.keys(departmentData[0] || {}).length || 1} style={{ textAlign: 'center' }}>
//                     Loading...
//                   </TableCell>
//                 </TableRow>
//               ) : departmentData.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={Object.keys(departmentData[0] || {}).length || 1} style={{ textAlign: 'center' }}>
//                     No data available
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 departmentData.map((item, index) => (
//                   <TableRow key={index}>
//                     {Object.keys(item).map((key) => (
//                       key !== '_id' && (
//                         <TableCell key={key}>
//                           {typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]}
//                         </TableCell>
//                       )
//                     ))}
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           style={{ marginTop: '20px' }}
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={departmentData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <div style={{ marginTop: '20px' }}>
//         <Button onClick={convertJsonToExcel} style={{ marginRight: '10px' }} variant="contained" color="primary">Generate Excel</Button>
//         <Button onClick={convertJsonToPDF} variant="contained" color="primary">Generate PDF</Button>
//       </div>
//       {excelGenerated && <p>Excel file generated successfully.</p>}
//       {pdfGenerated && <p>PDF file generated successfully.</p>}
//     </div>
//   );
// };

// export default FilterSearchblock;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Paper from '@mui/material/Paper';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import TablePagination from '@mui/material/TablePagination';
// import Button from '@mui/material/Button';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';

// const FilterSearchblock = ({ block, department }) => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('Labs');
//   const [departmentData, setDepartmentData] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editedRow, setEditedRow] = useState({});
//   const [oldRow, setOldRow] = useState({});
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isModified, setIsModified] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/block/categories/${block}/${department}`);
//         setCategories(response.data);
//       } catch (error) {
//         console.error(`Error fetching categories for department ${department} in block ${block}:`, error);
//       }
//     };
//     fetchCategories();
//   }, [block, department]);

//   useEffect(() => {
//     if (selectedCategory !== 'All Data') {
//       fetchData();
//     }
//   }, [selectedCategory, block, department]);

//   useEffect(() => {
//     if (!Array.isArray(departmentData)) {
//       setDepartmentData([]);
//     }
//   }, [departmentData]);

//   const handleCategorySelect = async (category) => {
//     setLoading(true);
//     setSelectedCategory(category);
//     const url = category === 'All Data'
//       ? `http://localhost:8000/api/block/department/data/${block}/${department}`
//       : `http://localhost:8000/api/block/category/data/${block}/${department}/${category}`;
//     try {
//       const response = await axios.get(url);
//       if (response.data && typeof response.data === 'object') {
//         setDepartmentData(response.data[category] || []);
//       } else {
//         setDepartmentData([]);
//       }
//     } catch (error) {
//       console.error(`Error fetching data for category ${category} in department ${department} in block ${block}:`, error);
//       setDepartmentData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (id) => {
//     setEditingId(id);
//     const row = departmentData.find(item => item._id === id);
//     setOldRow({ ...row }); // Store old data
//     setEditedRow({ ...row });
//   };

//   const handleDeleteClick = (id) => {
//     setDepartmentData(prevData => prevData.filter(item => item._id !== id));
//     setIsModified(true);
//   };

//   const handleInputChange = (event, field) => {
//     setEditedRow({ ...editedRow, [field]: event.target.value });
//     setIsModified(true);
//   };

//   const handleSaveClick = () => {
//     setDepartmentData(prevData => prevData.map(item => item._id === editingId ? editedRow : item));
//     setEditingId(null);
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       oldData: oldRow,
//       newData: editedRow,
//       selectedCategory: selectedCategory // Send the selected category
//     };
//     try {
//       await axios.put(`http://localhost:8000/api/block/update/${block}/${department}`, payload);
//       console.log('Data submitted successfully');
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//     setIsModified(false);
//   };
  

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const convertJsonToExcel = () => {
//     const keys = Object.keys(departmentData[0]);
//     const data = departmentData.map(item => {
//       const row = {};
//       keys.forEach(key => {
//         if (key !== '_id') {
//           row[key] = item[key];
//         }
//       });
//       return row;
//     });

//     const workSheet = XLSX.utils.json_to_sheet(data);
//     const workBook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(workBook, workSheet, 'posts');

//     XLSX.writeFile(workBook, 'postsData.xlsx');
//   };

//   const convertJsonToPDF = () => {
//     const keys = Object.keys(departmentData[0]).filter(key => key !== '_id');
//     const data = departmentData.map(item =>
//       keys.map(key => (typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]))
//     );

//     const doc = new jsPDF();
//     doc.autoTable({ head: [keys], body: data });
//     doc.save('jsonData.pdf');
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     const url = `http://localhost:8000/api/block/category/data/${block}/${department}/${selectedCategory}`;
//     try {
//       const response = await axios.get(url);
//       if (response.data && typeof response.data === 'object') {
//         setDepartmentData(response.data[selectedCategory] || []);
//       } else {
//         setDepartmentData([]);
//       }
//     } catch (error) {
//       console.error(`Error fetching data for category ${selectedCategory} in department ${department} in block ${block}:`, error);
//       setDepartmentData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <div style={{ marginBottom: '20px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//         <Select
//           value={selectedCategory}
//           onChange={(e) => handleCategorySelect(e.target.value)}
//           style={{ width: '100%', marginBottom: '10px', borderRadius: '4px' }}
//           displayEmpty
//           inputProps={{ 'aria-label': 'Select category' }}
//         >
//           {categories.map((category) => (
//             <MenuItem key={category} value={category}>{category}</MenuItem>
//           ))}
//         </Select>
//       </div>
//       <Paper style={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
//         <TableContainer style={{ maxHeight: '440px', overflowY: 'auto' }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {departmentData.length > 0 && typeof departmentData[0] === 'object' && (
//                   Object.keys(departmentData[0]).map((key) => (
//                     key !== '_id' && (
//                       <TableCell key={key}>
//                         <strong>{key.toUpperCase()}</strong>
//                       </TableCell>
//                     )
//                   ))
//                 )}
//                 <TableCell><strong>ACTIONS</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={Object.keys(departmentData[0] || {}).length + 1 || 1} style={{ textAlign: 'center' }}>
//                     Loading...
//                   </TableCell>
//                 </TableRow>
//               ) : departmentData.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={Object.keys(departmentData[0] || {}).length + 1 || 1} style={{ textAlign: 'center' }}>
//                     No data available
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 departmentData.map((item, index) => (
//                   <TableRow key={index}>
//                     {Object.keys(item).map((key) => (
//                       key !== '_id' && (
//                         <TableCell key={key}>
//                           {editingId === item._id ? (
//                             <TextField
//                               value={editedRow[key]}
//                               onChange={(e) => handleInputChange(e, key)}
//                             />
//                           ) : (
//                             typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]
//                           )}
//                         </TableCell>
//                       )
//                     ))}
//                     <TableCell>
//                       {editingId === item._id ? (
//                         <Button onClick={handleSaveClick} variant="contained" color="secondary">Save</Button>
//                       ) : (
//                         <>
//                           <Button onClick={() => handleEditClick(item._id)} variant="contained" color="primary">Modify</Button>
//                           <Button onClick={() => handleDeleteClick(item._id)} variant="contained" color="error">Delete</Button>
//                         </>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           style={{ marginTop: '20px' }}
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={departmentData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <div style={{ marginTop: '20px' }}>
//         <Button onClick={convertJsonToExcel} style={{ marginRight: '10px' }} variant="contained" color="primary">Generate Excel</Button>
//         <Button onClick={convertJsonToPDF} variant="contained" color="primary">Generate PDF</Button>
//       </div>
//       {isModified && (
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           style={{ position: 'fixed', bottom: '20px', right: '20px' }}
//         >
//           Submit
//         </Button>
//       )}
//     </div>
//   );
// };

// export default FilterSearchblock;






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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const FilterSearchblock = ({ block, department }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Labs');
  const [departmentData, setDepartmentData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldRow, setOldRow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/block/categories/${block}/${department}`);
        setCategories(response.data);
      } catch (error) {
        console.error(`Error fetching categories for department ${department} in block ${block}:`, error);
      }
    };
    fetchCategories();
  }, [block, department]);

  useEffect(() => {
    if (selectedCategory !== 'All Data') {
      fetchData();
    }
  }, [selectedCategory, block, department]);

  useEffect(() => {
    if (!Array.isArray(departmentData)) {
      setDepartmentData([]);
    }
  }, [departmentData]);

  const handleCategorySelect = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    const url = category === 'All Data'
      ? `http://localhost:8000/api/block/department/data/${block}/${department}`
      : `http://localhost:8000/api/block/category/data/${block}/${department}/${category}`;
    try {
      const response = await axios.get(url);
      if (response.data && typeof response.data === 'object') {
        setDepartmentData(response.data[category] || []);
      } else {
        setDepartmentData([]);
      }
    } catch (error) {
      console.error(`Error fetching data for category ${category} in department ${department} in block ${block}:`, error);
      setDepartmentData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (id) => {
    const row = departmentData.find(item => item._id === id);
    setEditingId(id);
    setEditedRow({ ...row });
    setOldRow({ ...row }); // Store the original data
  };

  const handleDeleteClick = async (id) => {
    try {
      // Send a DELETE request to the server with the specific ID
      const response = await axios.delete(`http://localhost:8000/api/block/delete/${block}/${department}/${id}`);
      
      // Check if deletion was successful
      if (response.status === 200) {
        console.log('Data deleted successfully');
        // Optionally update local state or perform additional actions
        setDepartmentData(prevData => prevData.filter(item => item._id !== id));
        setIsModified(true);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  
  const handleInputChange = (event, field) => {
    setEditedRow({ ...editedRow, [field]: event.target.value });
    setIsModified(true);
  };

  const handleSaveClick = () => {
    setDepartmentData(prevData => prevData.map(item => item._id === editingId ? editedRow : item));
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!oldRow) {
      console.error('Old data is not defined');
      return;
    }
  
    const payload = {
      oldData: oldRow,
      newData: editedRow,
      selectedCategory: selectedCategory // Send the selected category
    };
  
    try {
      console.log('Submitting changes...');
      await axios.put(`http://localhost:8000/api/block/update/${block}/${department}`, payload);
      console.log('Updated department data:', departmentData);
      console.log('Data submitted successfully');
      setIsModified(false);
      alert('Changes submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Only one definition of handleChangePage
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 const convertJsonToExcel = () => {
    const keys = Object.keys(departmentData[0]);
    const data = departmentData.map(item => {
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

    XLSX.utils.book_append_sheet(workBook, workSheet, `${selectedCategory}`);

    XLSX.writeFile(workBook, `${block}Block-${selectedCategory}-Data.xlsx`);
  };

  const convertJsonToPDF = () => {
    const keys = Object.keys(departmentData[0]).filter(key => key !== '_id');
    const data = departmentData.map(item =>
      keys.map(key => (typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]))
    );

    const doc = new jsPDF();
    doc.autoTable({ head: [keys], body: data });
    doc.save(`${block}Block-${selectedCategory}-Data.pdf`);
  };

  const fetchData = async () => {
    setLoading(true);
    const url = `http://localhost:8000/api/block/category/data/${block}/${department}/${selectedCategory}`;
    try {
      const response = await axios.get(url);
      if (response.data && typeof response.data === 'object') {
        setDepartmentData(response.data[selectedCategory] || []);
      } else {
        setDepartmentData([]);
      }
    } catch (error) {
      console.error(`Error fetching data for category ${selectedCategory} in department ${department} in block ${block}:`, error);
      setDepartmentData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ marginBottom: '20px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Select
          value={selectedCategory}
          onChange={(e) => handleCategorySelect(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', borderRadius: '4px' }}
          displayEmpty
          inputProps={{ 'aria-label': 'Select category' }}
        >
          <MenuItem value="" disabled>Select a category</MenuItem>
          {categories.map((category) => (
            category!=='Student' && category!=='Faculty' && category!=='Faculty'  && category!=='Research' && category!=='Timetables' && category!=='Committe' &&category!=='EventsOrganized' &&category!=='EventsParticipated' &&category!=='Clubs' && category!=='Mentoring' &&(
            <MenuItem key={category} value={category}>{category}</MenuItem>
         ) ))}
        </Select>
      </div>
      <Paper style={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer style={{ maxHeight: '440px', overflowY: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {departmentData.length > 0 && Object.keys(departmentData[0]).map((key) => (
                  key !== '_id' && <TableCell key={key}><strong>{key.toUpperCase()}</strong></TableCell>
                ))}
                <TableCell><strong>ACTIONS</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={Object.keys(departmentData[0] || {}).length + 1} style={{ textAlign: 'center' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : departmentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={Object.keys(departmentData[0] || {}).length + 1} style={{ textAlign: 'center' }}>
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                departmentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <TableRow key={item._id}>
                    {Object.keys(item).map((key) => (
                      key !== '_id' && (
                        <TableCell key={key}>
                          {editingId === item._id ? (
                            <TextField
                              value={editedRow[key]}
                              onChange={(e) => handleInputChange(e, key)}
                              fullWidth
                            />
                          ) : (
                            typeof item[key] === 'boolean' ? (item[key] ? 'Yes' : 'No') : item[key]
                          )}
                        </TableCell>
                      )
                    ))}
                    <TableCell>
                      {editingId === item._id ? (
                        <Button onClick={handleSaveClick} variant="contained" color="secondary">Save</Button>
                      ) : (
                        <>
                          <Button onClick={() => handleEditClick(item._id)} variant="contained" color="primary" style={{ marginRight: '10px' }}>Modify</Button>
                          <Button onClick={() => handleDeleteClick(item._id)} variant="contained" color="error">Delete</Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
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
      {isModified && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          Submit
        </Button>
      )}
      {error && <Alert severity="error" style={{ marginTop: '20px' }}>{error}</Alert>}
    </div>
  );
};

export default FilterSearchblock;


