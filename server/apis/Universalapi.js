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
        const classroomsData = await BlockData.find({}, 'classrooms');
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

// router.get('/data/:blockName/:departmentName', async (req, res) => {
//     try {
//         const { blockName, departmentName } = req.params;
//         const blockData = await BlockData.findOne({ 'Block': blockName });

//         // Filter out block and department data
//         const { Block, Department, ...categoryData } = blockData.toObject();

//         // Find the department within the block
//         const department = Department.find(dep => dep.name === departmentName);
//         if (!department) {
//             return res.status(404).json('Department not found in the block');
//         }

//         res.json(categoryData);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json('Internal server error');
//     }
// });

// API to fetch data based on block name and department name
router.get('/data/:blockName/:departmentName', async (req, res) => {
  try {
      const { blockName, departmentName } = req.params;
      
      // Find all documents with the specified block name
      const blockData = await BlockData.find({ 'Block': blockName });

      // Check if any documents with the block name were found
      if (!blockData || blockData.length === 0) {
          return res.status(404).json('Block not found');
      }

      // Search for the department within each document
      const categoryData = [];
      blockData.forEach(doc => {
          const department = doc.Department.find(dep => dep.name === departmentName);
          if (department) {
              // If department found, filter out block and department data and add to categoryData
              const { Block, Department, ...category } = doc.toObject();
              categoryData.push(category);
          }
      });

      // If no departments were found in any of the documents
      if (categoryData.length === 0) {
          return res.status(404).json('Department not found in the block');
      }

      res.json(categoryData);
  } catch (err) {
      console.error(err);
      res.status(500).json('Internal server error');
  }
});




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
  


  router.put('/category/:blockName/:departmentName/:categoryName/:id', async (req, res) => {

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

// Filter Backend

router.get('/blocks', async (req, res) => {
  try {
    const blocksData = await BlockData.find({}, 'Block');
    const uniqueBlocks = [];

    blocksData.forEach(block => {
      if (!uniqueBlocks.some(item => item.Block === block.Block)) {
        uniqueBlocks.push(block);
      }
    });

    res.json(uniqueBlocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Get categories by block name and department name
router.get('/categories/:blockName/:departmentName', async (req, res) => {
  try {
    // Aggregation pipeline to match block and department names
    const categories = await BlockData.aggregate([
      // Match documents with the given block name
      {
        $match: { Block: req.params.blockName }
      },
      // Unwind the Department array
      { $unwind: "$Department" },
      // Match documents with the given department name
      {
        $match: { "Department.name": req.params.departmentName }
      },
      // Group by Block and Department and push categories into an array
      {
        $group: {
          _id: { Block: "$Block", Department: "$Department.name" },
          categories: {
            $push: {
              Labs: "$Labs",
              classrooms: "$classrooms",
              SeminarHalls: "$SeminarHalls",
              Timetables: "$Timetables",
              Student: "$Student",
              Faculty: "$Faculty",
              Research: "$Research",
              Committe: "$Committe",
              Mentoring: "$Mentoring",
              EventsOrganized: "$EventsOrganized",
              EventsParticipated: "$EventsParticipated",
              Clubs: "$Clubs"
            }
          }
        }
      },
      // Project only the categories for the matching Block and Department
      {
        $project: {
          _id: 0,
          categories: {
            $filter: {
              input: "$categories",
              as: "cat",
              cond: { $eq: ["$$cat.Department", req.params.departmentName] }
            }
          }
        }
      }
    ]);

    // Check if any categories found
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Extract the categories for the matching department
    const result = categories[0].categories[0];

    // Respond with the result
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Get block data by block name
router.get('/blocks/:blockName', async (req, res) => {
  try {
    const block = await BlockData.findOne({ Block: req.params.blockName });
    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }
    res.json(block);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/blocks', async (req, res) => {
  try {
    const blocks = await BlockData.find({}, 'Block');
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get('/data/:blockName', async (req, res) => {
  try {
    const { blockName } = req.params;
    // Find all documents with the specified block name
    const blockData = await BlockData.find({ 'Block': blockName });
    if (!blockData || blockData.length === 0) {
      return res.status(404).json({ error: 'Block not found' });
    }
    res.json(blockData);
  } catch (err) {
    console.error(`Error fetching data for block ${blockName}:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/departments/:blockName', (req, res) => {
  const blockName = req.params.blockName;
  BlockData.aggregate([
      { $match: { Block: blockName } },
      { $unwind: '$Department' },
      { $group: { _id: null, departments: { $addToSet: '$Department.name' } } }
  ]).then(result => {
      const departmentNames = result.length > 0 ? result[0].departments : [];
      res.json(departmentNames);
  }).catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  });
});


router.get('/fetchcategories/:blockName/:departmentName', (req, res) => {
  const blockName = req.params.blockName;
  const departmentName = req.params.departmentName;

  BlockData.aggregate([
      { $match: { 'Block': blockName } },
      { $unwind: '$Department' },
      { $match: { 'Department.name': departmentName } },
      {
          $project: {
              documentNames: {
                  $objectToArray: {
                      Labs: "$Labs",
                      Classrooms: "$classrooms",
                      SeminarHalls: "$SeminarHalls",
                      Timetables: "$Timetables",
                      Student: "$Student",
                      Faculty: "$Faculty",
                      Research: "$Research",
                      Committe: "$Committe",
                      Mentoring: "$Mentoring",
                      EventsOrganized: "$EventsOrganized",
                      EventsParticipated: "$EventsParticipated",
                      Clubs: "$Clubs"
                  }
              }
          }
      }
  ])
  .then(result => {
      const exists = result.length > 0;
      const documentNames = exists ? result[0].documentNames.map(doc => doc.k) : [];
      res.json({  documentNames });
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  });
});





router.get('/department/data/:departmentName', async (req, res) => {
  const { departmentName } = req.params;
  try {
      const blockData = await BlockData.find({
          'Department.name': departmentName
      });

      if (!blockData || blockData.length === 0) {
          return res.status(404).json({ error: 'Department not found' });
      }

      // Filter and structure the relevant data
      const departmentData = {
          Department: blockData[0].Department.filter(dept => dept.name === departmentName),
          Labs: blockData[0].Labs.filter(lab => lab.Department === departmentName),
          Classrooms: blockData[0].classrooms.filter(classroom => {
              return blockData[0].Department.some(dept => dept.name === departmentName && dept.Id === classroom.DepartmentId);
          }),
          Faculty: blockData[0].Faculty.filter(faculty => faculty.Department === departmentName),
          Students: blockData[0].Student.filter(student => student.Department === departmentName),
          EventsOrganized: blockData[0].EventsOrganized.filter(event => event.Department === departmentName),
          // Add other relevant sections similarly...
      };

      res.json(departmentData);
  } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/department/datas/:departmentName', async (req, res) => {
  const { departmentName } = req.params;
  try {
      const blockData = await BlockData.findOne({
          'Department.name': departmentName
      }).select('-Block');

      if (!blockData) {
          return res.status(404).json({ error: 'Department not found' });
      }

      // Return all data related to the block except the block name
      res.json(blockData);
  } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



// Define the route to fetch category data
router.get('/category/data/:blockName/:departmentName/:categoryName', async (req, res) => {
  const { blockName, departmentName, categoryName } = req.params;
  try {
    // Query the database to find all block data entries with the given block name
    const blockDataEntries = await BlockData.find({ Block: blockName });

    // Check if there are any block data entries with the given block name
    if (!blockDataEntries || blockDataEntries.length === 0) {
      return res.status(404).json({ error: 'Block not found' });
    }

    let department;
    let found = false;

    // Iterate through each block data entry to find the department
    for (let i = 0; i < blockDataEntries.length; i++) {
      const blockData = blockDataEntries[i];

      // Check if the department exists in the current block data entry
      department = blockData.Department.find(dep => dep.name === departmentName);
      if (department) {
        found = true;
        break;
      }
    }

    // If department not found in any block data entry
    if (!found) {
      return res.status(404).json({ error: 'Department not found in any block entry' });
    }

    // Filter the block data to include only the specified category
    let categoryData;
    switch (categoryName) {
      case 'Labs':
        categoryData = blockDataEntries.map(entry => entry.Labs);
        break;
      case 'Classrooms':
        categoryData = blockDataEntries.map(entry => entry.classrooms);
        break;
      case 'SeminarHalls':
        categoryData = blockDataEntries.map(entry => entry.SeminarHalls);
        break;
      case 'Timetables':
        categoryData = blockDataEntries.map(entry => entry.Timetables);
        break;
      case 'Student':
        categoryData = blockDataEntries.map(entry => entry.Student);
        break;
      case 'Faculty':
        categoryData = blockDataEntries.map(entry => entry.Faculty);
        break;
      case 'Research':
        categoryData = blockDataEntries.map(entry => entry.Research);
        break;
      case 'Committe':
        categoryData = blockDataEntries.map(entry => entry.Committe);
        break;
      case 'Mentoring':
        categoryData = blockDataEntries.map(entry => entry.Mentoring);
        break;
      case 'EventsOrganized':
        categoryData = blockDataEntries.map(entry => entry.EventsOrganized);
        break;
      case 'EventsParticipated':
        categoryData = blockDataEntries.map(entry => entry.EventsParticipated);
        break;
      case 'Clubs':
        categoryData = blockDataEntries.map(entry => entry.Clubs);
        break;
      default:
        categoryData = [];
        
    }

    // Return the category data
    res.json(categoryData);
  } catch (error) {
    console.error('Error fetching category data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/blocks/categories/:blockName', async (req, res) => {
  try {
    const blockName = req.params.blockName;
    const blockData = await BlockData.find({ Block: blockName });

    // Extract unique categories from block data
    const categories = [
      ...new Set(
        blockData.flatMap((data) => [
          ...data.Labs.map((lab) => 'Lab'),
          ...data.classrooms.map((classroom) => 'Classroom'),
          
          // Add other category types as needed
        ])
      ),
    ];

    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.get('/blocks/category/data/:blockName/:categoryName', async (req, res) => {
  try {
    const { blockName, categoryName } = req.params;
    
    // Fetch data based on block name and category name
    const data = await BlockData.find({ Block: blockName, [categoryName]: { $exists: true } });

    res.json({ data });
  } catch (error) {
    console.error('Error fetching category data:', error);
    res.status(500).json({ error: 'Failed to fetch category data' });
  }
});



router.get('/departments', async (req, res) => {
  try {
      // Query the MongoDB collection using the Mongoose model
      const documents = await BlockData.find({}, 'Department.name');

      // Extract department names from the retrieved documents
      const departmentNames = documents.reduce((names, doc) => {
          doc.Department.forEach(department => {
              if (!names.includes(department.name)) {
                  names.push(department.name);
              }
          });
          return names;
      }, []);

      // Send the list of department names as the response array
      res.send(departmentNames);
  } catch (error) {
      console.error('Error retrieving departments:', error);
      res.status(500).send('Internal server error');
  }
});


module.exports = router;
