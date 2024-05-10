const express = require('express');
const router = express.Router();
const BlockData= require('../Models/universaldata');

router.post("/",async(req,res)=>{
     try{
      const newBlockdata = await new BlockData(req.body);
      await newBlockdata.save();
      res.status(200).json(newBlockdata)
      
     }
     catch(err){
         
        console.log(err);
        res.status(500).json("Internal server error")
     }
})

router.post('/Classrooms', async (req, res) => {
  try {
    const newData = req.body; 

    const blockData = await BlockData.findOne(); 

    blockData.Classrooms.push(newData);

    await blockData.save();

    res.status(201).json({ message: 'Classroom data added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get("/BlockData",async(req,res)=>{
    try{
        const data = await BlockData.find();
        res.json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal server error")
    }
})

router.get('/Blockdata/:id/Department',async(req,res)=>{

    try{
        const data = await BlockData.find(req.params.id);
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.get('/labs', async (req, res) => {
    try {
        const labsData = await BlockData.find({}, 'Labs');
        res.json(labsData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Classrooms
router.get('/classrooms', async (req, res) => {
    try {
        const classroomsData = await BlockData.find({}, 'Classrooms');
        res.json(classroomsData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Seminar Halls
router.get('/seminarhalls', async (req, res) => {
    try {
        const seminarHallsData = await BlockData.find({}, 'SeminarHalls');
        res.json(seminarHallsData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Timetables
router.get('/timetables', async (req, res) => {
    try {
        const timetablesData = await BlockData.find({}, 'Timetables');
        res.json(timetablesData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Mentoring
router.get('/mentoring', async (req, res) => {
    try {
        const mentoringData = await BlockData.find({}, 'Mentoring');
        res.json(mentoringData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Students
router.get('/students', async (req, res) => {
    try {
        const studentsData = await BlockData.find({}, 'Student');
        res.json(studentsData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Faculty
router.get('/faculty', async (req, res) => {
    try {
        const facultyData = await BlockData.find({}, 'Faculty');
        res.json(facultyData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Research
router.get('/research', async (req, res) => {
    try {
        const researchData = await BlockData.find({}, 'Research');
        res.json(researchData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Committees
router.get('/committees', async (req, res) => {
    try {
        const committeesData = await BlockData.find({}, 'Committe');
        res.json(committeesData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Events Organized
router.get('/eventsorganized', async (req, res) => {
    try {
        const eventsOrganizedData = await BlockData.find({}, 'EventsOrganized');
        res.json(eventsOrganizedData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Events Participated
router.get('/eventsparticipated', async (req, res) => {
    try {
        const eventsParticipatedData = await BlockData.find({}, 'EventsParticipated');
        res.json(eventsParticipatedData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// Retrieve data for Clubs
router.get('/clubs', async (req, res) => {
    try {
        const clubsData = await BlockData.find({}, 'Clubs');
        res.json(clubsData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});



// API to get all labs data based on department Id or department name
router.get('/labs/:departmentIdOrName', async (req, res) => {
    try {
        const { departmentIdOrName } = req.params;
        const labsData = await BlockData.find({
            $or: [
                { 'Department.Id': departmentIdOrName },
                { 'Department.name': departmentIdOrName }
            ]
        }, 'Labs');
        res.json(labsData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// API to get all labs data based on blockname
router.get('/labs/block/:blockName', async (req, res) => {
    try {
        const { blockName } = req.params;
        const labsData = await BlockData.find({ 'Block': blockName }, 'Labs');
        res.json(labsData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

// API to fetch data based on block name and department name
router.get('/data/:blockName/:departmentName', async (req, res) => {
    try {
        const { blockName, departmentName } = req.params;
        const blockData = await BlockData.findOne({ 'Block': blockName });

        // Filter out block and department data
        const { Block, Department, ...categoryData } = blockData.toObject();

        // Find the department within the block
        const department = Department.find(dep => dep.name === departmentName);
        if (!department) {
            return res.status(404).json('Department not found in the block');
        }

        res.json(categoryData);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});


router.get('/categories/:blockName/:departmentName', async (req, res) => {
    const { blockName, departmentName } = req.params;
    try {
      const blockData = await BlockData.findOne({ 'Block': blockName });
      if (!blockData) {
        return res.status(404).json({ error: 'Block not found' });
      }
      const department = blockData.Department.find(dep => dep.name === departmentName);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
      const categories = Object.keys(blockData.toObject()).filter(key => key !== 'Block' && key !== 'Department' && key !== '_id' && key !== '__v');
      res.json(categories);
    } catch (error) {
      console.error(`Error fetching categories for department ${departmentName} in block ${blockName}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  router.get('/category/:blockName/:departmentName/:categoryName', async (req, res) => {
    const { blockName, departmentName, categoryName } = req.params;
    try {
      const blockData = await BlockData.findOne({ 'Block': blockName });
      if (!blockData) {
        return res.status(404).json({ error: 'Block not found' });
      }
      const department = blockData.Department.find(dep => dep.name === departmentName);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
      const categoryData = blockData[categoryName];
      if (!categoryData) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(categoryData);
    } catch (error) {
      console.error(`Error fetching category data for department ${departmentName} in block ${blockName}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get("/categories/:block/:department", async (req, res) => {
    const { block, department } = req.params;
    try {
      const blockData = await BlockData.findOne({ 'Block': block });
      if (!blockData) {
        return res.status(404).json({ error: 'Block not found' });
      }
      const departmentData = blockData.Department.find(dep => dep.name === department);
      if (!departmentData) {
        return res.status(404).json({ error: 'Department not found' });
      }
      const categories = Object.keys(blockData.toObject()).filter(key => key !== 'Block' && key !== 'Department' && key !== '_id' && key !== '__v');
      res.json(categories);
    } catch (error) {
      console.error(`Error fetching categories for department ${department} in block ${block}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Fetch Category Data API
  router.get("/category/:block/:department/:category", async (req, res) => {
    const { block, department, category } = req.params;
    try {
      const blockData = await BlockData.findOne({ 'Block': block });
      if (!blockData) {
        return res.status(404).json({ error: 'Block not found' });
      }
      const departmentData = blockData.Department.find(dep => dep.name === department);
      if (!departmentData) {
        return res.status(404).json({ error: 'Department not found' });
      }
      const categoryData = blockData[category];
      if (!categoryData) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(categoryData);
    } catch (error) {
      console.error(`Error fetching ${category} data for department ${department} in block ${block}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.put('/api/block/category/:blockName/:departmentName/:categoryName/:id', async (req, res) => {
    const { blockName, departmentName, categoryName, id } = req.params;
    const newData = req.body;
  
    try {
      const blockData = await BlockData.findOne({ 'Block': blockName });
      if (!blockData) {
        return res.status(404).json({ error: 'Block not found' });
      }
  
      const department = blockData.Department.find(dep => dep.name === departmentName);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      // Find the category within the department
      let categoryData = blockData[categoryName];
      if (!categoryData) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Find the document by its ID and update it
      const index = categoryData.findIndex(item => item._id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Document not found' });
      }
  
      // Update the document with the new data
      categoryData[index] = { ...categoryData[index], ...newData };
      await blockData.save();
  
      // Respond with the updated document
      res.json({ message: 'Data updated successfully', updatedData: categoryData[index] });
    } catch (error) {
      console.error(`Error updating data for category ${categoryName} in block ${blockName}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.put('/labs/:id', async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
        const updatedLab = await Lab.findByIdAndUpdate(id, newData, { new: true });
        res.json(updatedLab);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 


  // Delete data endpoint
  router.delete('/api/block/category/L/IT/:category/:id', async (req, res) => {
    const { category, id } = req.params;
    try {
      await Lab.findByIdAndDelete(id);
      res.json({ message: 'Lab data deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
