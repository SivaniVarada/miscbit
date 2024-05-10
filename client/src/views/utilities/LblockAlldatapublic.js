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
import MainCard from 'ui-component/cards/MainCard';

const FilterSearchblock = ({ block, department }) => {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modifiedData, setModifiedData] = useState({});
  const [isModifying, setIsModifying] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8010/api/block/categories/L/IT`);
        setCategories(response.data);
      } catch (error) {
        console.error(`Error fetching categories for department ${department} in block ${block}:`, error);
      }
    };
    fetchCategories();
  }, [block, department]);

  useEffect(() => {
    const fetchDataForCategories = async () => {
      categories.forEach(async (category) => {
        try {
          const response = await axios.get(`http://localhost:8010/api/block/category/L/IT/${category}`);
          setCategoryData(prevData => ({
            ...prevData,
            [category]: response.data
          }));
        } catch (error) {
          console.error(`Error fetching ${category} data for department ${department} in block ${block}:`, error);
        }
      });
    };
    fetchDataForCategories();
  }, [block, department, categories]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModifyData = (id) => {
    setIsModifying(prevState => ({
      ...prevState,
      [id]: true
    }));
  };

  const handleSubmitData = async (category, id) => {
    try {
      await axios.put(`http://localhost:8010/api/block/category/L/IT/${category}/${id}`, modifiedData[id]);
      // Refresh data after modification
      const response = await axios.get(`http://localhost:8010/api/block/category/L/IT/${category}`);
      setCategoryData(prevData => ({
        ...prevData,
        [category]: response.data
      }));
      setIsModifying(prevState => ({
        ...prevState,
        [id]: false
      }));
    } catch (error) {
      console.error(`Error modifying/updating data for category ${category} at id ${id}:`, error);
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setModifiedData(prevData => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [name]: value
      }
    }));
  };

  return (
    <MainCard title="L Block - IT Dept Details">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {categories.map((category, index) => (
        <Paper key={index} style={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
          <TableContainer style={{ maxHeight: '440px', overflowY: 'auto' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={Object.keys(categoryData[category]?.[0] || {}).length + 2} style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
                    Category: {category}

                  </TableCell>
                </TableRow>
                <TableRow>
                  {Object.keys(categoryData[category]?.[0] || {}).map((key, keyIndex) => (
                    key !== '_id' && // Filter out _id field
                    <TableCell key={keyIndex}>{key}</TableCell>
                  ))}
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryData[category] && categoryData[category].map((dataItem, dataIndex) => (
                  <TableRow key={dataIndex}>
                    {Object.keys(dataItem).map((key, keyIndex) => (
                      key !== '_id' && // Filter out _id field
                      <TableCell key={keyIndex}>
                        {isModifying[dataItem._id] ? (
                          <input
                            type="text"
                            name={key}
                            value={modifiedData[dataItem._id]?.[key] || dataItem[key]}
                            onChange={(e) => handleInputChange(e, dataItem._id)}
                          />
                        ) : (
                          dataItem[key]
                        )}
                      </TableCell>
                    ))}
                    {/* <TableCell>
                      {isModifying[dataItem._id] ? (
                        <Button
                          onClick={() => handleSubmitData(category, dataItem._id)}
                          variant="contained"
                          color="primary"
                          style={{ marginRight: '10px' }}
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleModifyData(dataItem._id)}
                          variant="contained"
                          color="primary"
                          style={{ marginRight: '10px' }}
                        >
                          Modify
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteData(category, dataItem._id)}
                        variant="contained"
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{ marginTop: '20px' }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={categoryData[category] ? categoryData[category].length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ))}
    </div>
    </MainCard>
  );
};

export default FilterSearchblock;
