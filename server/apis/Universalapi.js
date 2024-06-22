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
router.delete('/blocks/deleteAll/:block', async (req, res) => {
  const block = req.params.block;

  try {
    // Delete all documents in BlockData collection where Block matches the specified block
    await BlockData.deleteMany({ Block: block });

    res.status(200).json({ message: `All data in block ${block} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Error deleting data.' });
  }
});


router.post('/addWashroom/:id', async (req, res) => {
  try {
      const washroomData = req.body;
      const blockDataId = req.params.id;

      const result = await BlockData.updateOne(
          { _id: mongoose.Types.ObjectId(blockDataId) },
          { $push: { Washrooms: { $each: washroomData } } }
      );

      if (result.modifiedCount === 0) {
          return res.status(404).send({ message: 'Document not found' });
      }

      res.send({ message: 'Washrooms added successfully' });
  } catch (error) {
      res.status(500).send({ message: 'An error occurred', error });
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
    console.log(blockName)
    console.log(departmentName)
    try {
      const blockData = await BlockData.findOne({ 'Block': blockName });
      if (!blockData) {
        return res.status(404).json({ error: 'Block not found' });
      }
      console.log(blockData)
      const department = blockData.Department.find(dep => dep.name === departmentName);
      console.log(department)
      if (!department) {
        const categories = Object.keys(blockData.toObject()).filter(key => key !== 'Block' && key !== '_id' && key !== '__v');

        res.json(categories);
      }
      else{
      const categories = Object.keys(blockData.toObject()).filter(key => key !== 'Block' && key !== 'Department' && key !== '_id' && key !== '__v');
      console.log(categories)
      res.json(categories);}
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
    console.log(block)
    console.log(department)
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
    console.log(block)
    console.log(department)
    console.log(category)
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
  router.delete('/category/data/:blockName/:departmentName/:categoryName/:id', async (req, res) => {
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
  console.log(`hii`)
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
    console.log(categories)

    // Check if any categories found
    if (!categories || categories.length === 0) {
      // No matching documents, create a new one
      const newDocument = {
        Block: blockName,
        Department: [
          {
            Id: '', // You might want to set a proper Id here
            name: departmentName,
            sections: 0
          }
        ],
        Labs: [],
        classrooms: [],
        SeminarHalls: [],
        Timetables: [],
        Student: [],
        Faculty: [],
        Research: [],
        Committe: [],
        Mentoring: [],
        EventsOrganized: [],
        EventsParticipated: [],
        Clubs: []
      };

      // Insert the new document into the database
      const createdDoc = await BlockData.create(newDocument);

      // Since a new document is created, project the categories similarly to the aggregation
      const result = {
        Labs: createdDoc.Labs,
        classrooms: createdDoc.classrooms,
        SeminarHalls: createdDoc.SeminarHalls,
        Timetables: createdDoc.Timetables,
        Student: createdDoc.Student,
        Faculty: createdDoc.Faculty,
        Research: createdDoc.Research,
        Committe: createdDoc.Committe,
        Mentoring: createdDoc.Mentoring,
        EventsOrganized: createdDoc.EventsOrganized,
        EventsParticipated: createdDoc.EventsParticipated,
        Clubs: createdDoc.Clubs
      };
      console.log(result)

      // Return the newly created document's categories
      return res.json(result);
    }

    // Extract and respond with the categories for the matching department
    const result = categories[0].categories[0];
    console.log(result)
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put('/update/:block/:department', async (req, res) => {
  const { block, department } = req.params;
  const { oldData, newData, selectedCategory } = req.body;

  try {
    // Ensure required data is provided
    if (!oldData || !newData || !selectedCategory) {
      return res.status(400).json({ error: 'Old data, new data, and selected category are required.' });
    }

    // Build the dynamic query to find the document
    const query = {
      Block: block,
      [`${selectedCategory}._id`]: oldData._id,
      [`${selectedCategory}.Department`]: oldData.Department
    };

    // Build the dynamic update operation
    const updateFields = {};
    for (const [key, value] of Object.entries(newData)) {
      updateFields[`${selectedCategory}.$.${key}`] = value;
    }

    const update = { $set: updateFields };

    // Perform the update operation
    const result = await BlockData.findOneAndUpdate(query, update, { new: true });

    if (!result) {
      return res.status(404).json({ error: 'Document not found or no matching data found.' });
    }

    // Respond with the updated document
    res.status(200).json({ message: 'Data updated successfully.', updatedDocument: result });
  } catch (error) {
    res.status(500).json({ error: `An error occurred while updating data: ${error.message}` });
  }
});

// router.delete('/delete/:block/:department/:itemId', async (req, res) => {
//   const { block, department, itemId } = req.params;
//   console.log('Delete request received:', { block, department, itemId });

//   try {
//     const query = { Block: block };
//     query[`${department}._id`] = itemId;
//     console.log('Query:', query);

//     const result = await BlockData.findOneAndUpdate(
//       { Block: block },
//       { $pull: { [department]: { _id: itemId } } },
//       { new: true }
//     );
//     console.log('MongoDB result:', result);

//     if (!result) {
//       return res.status(404).json({ error: 'Document not found or no matching data found.' });
//     }

//     res.status(200).json({ message: 'Data deleted successfully.', updatedDocument: result });
//   } catch (error) {
//     console.error('Error during deletion:', error);
//     res.status(500).json({ error: `An error occurred while deleting data: ${error.message}` });
//   }
// });

router.delete('/delete/:block/:department/:itemId', async (req, res) => {
  const { block, department, itemId } = req.params;

  try {
    // Delete the item from the Labs array
    const result = await BlockData.findOneAndUpdate(
      { Block: block },
      { $pull: { Labs: { _id: itemId } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Document not found or no matching data found.' });
    }

    // Respond with success message and updated document
    res.status(200).json({ message: 'Data deleted successfully.', updatedDocument: result });
  } catch (error) {
    res.status(500).json({ error: `An error occurred while deleting data: ${error.message}` });
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

router.put('/category/data/:blockName/:departmentName/:categoryName/:id', async (req, res) => {
  const { blockName, departmentName, categoryName, id } = req.params;
  const updateData = req.body; // Assuming the updated data is sent in the request body

  try {
    // Find the relevant document to update
    let blockData = await BlockData.findOne({ Block: blockName });

    if (!blockData) {
      return res.status(404).json({ error: 'Block not found' });
    }
    console.log(blockData)

    // Depending on the category name, update the specific category data
    switch (categoryName) {
      case 'Labs':
        // Find and update the lab data
        blockData.Labs.forEach((lab) => {
          if (lab._id.toString() === id) {
            // Update the fields you want to modify
            lab.field1 = updateData.field1;
            lab.field2 = updateData.field2;
            // Update more fields as needed
          }
        });
        break;
      case 'Classrooms':
        // Find and update the classroom data
        blockData.classrooms.forEach((classroom) => {
          if (classroom._id.toString() === id) {
            // Update the fields you want to modify
            classroom.field1 = updateData.field1;
            classroom.field2 = updateData.field2;
            // Update more fields as needed
          }
        });
        break;
      // Add cases for other categories as needed
      default:
        return res.status(404).json({ error: 'Category not found' });
    }

    // Save the updated block data
    await blockData.save();

    // Return updated data or success message
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Failed to update data' });
  }
});

router.delete('/category/data/:blockName/:departmentName/:categoryName/:id', async (req, res) => {
  const { blockName, departmentName, categoryName, id } = req.params;

  try {
    // Find the relevant document to delete from
    let blockData = await BlockData.findOne({ Block: blockName });
    console.log(blockData)

    if (!blockData) {
      return res.status(404).json({ error: 'Block not found' });
    }

    // Depending on the category name, delete the specific category data
    switch (categoryName) {
      case 'Labs':
        // Find and remove the lab data
        blockData.Labs = blockData.Labs.filter(lab => lab._id.toString() !== id);
        break;
      case 'Classrooms':
        // Find and remove the classroom data
        blockData.classrooms = blockData.classrooms.filter(classroom => classroom._id.toString() !== id);
        break;
      // Add cases for other categories as needed
      default:
        return res.status(404).json({ error: 'Category not found' });
    }

    // Save the updated block data after deletion
    await blockData.save();

    // Return success message
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Failed to delete data' });
  }
});



router.get('/department/data/:block/:departmentName', async (req, res) => {
  const { block,departmentName } = req.params;
  console.log(block)
  console.log(departmentName)
  try {
      const flockData = await BlockData.find({
          'Block': block
      });
      console.log(flockData)

      if (!flockData ) {
          return res.status(404).json({ error: 'block not found' });
      }
      // let blockData = null;
      //   for (const block of flockData) {
      //       // Ensure block.Department is an array and find the department within it
      //       if (Array.isArray(block.Labs)) {
      //           blockData = block.Labs.find(dep => dep.Department === departmentName);
      //           if (blockData) break; // Stop searching if found
      //       }
      //   }
      //   console.log(blockData)

      //   if (!blockData) {
      //       return res.status(404).json({ error: 'Department not found' });
      //   }

      // Filter and structure the relevant data
      const departmentData = {
          Department: flockData[0].Department.filter(dept => dept.name === departmentName),
          Labs: flockData[0].Labs.filter(lab => lab.Department === departmentName),
          Classrooms: flockData[0].classrooms.filter(classroom => {
              return flockData[0].Department.some(dept => dept.name === departmentName && dept.Id === classroom.DepartmentId);
          }),
          Faculty: flockData[0].Faculty.filter(faculty => faculty.Department === departmentName),
          Students: flockData[0].Student.filter(student => student.Department === departmentName),
          EventsOrganized: flockData[0].EventsOrganized.filter(event => event.Department === departmentName),
          // Add other relevant sections similarly...
      };
      console.log(departmentData)

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



// router.get('/category/data/:blockName/:departmentName/:category', async (req, res) => {
//     const { blockName, departmentName, category } = req.params;

//     try {
//         // Fetch block data for the specified block name
//         const flockData = await BlockData.find({ 'Block': blockName });

//         if (!flockData || flockData.length === 0) {
//             return res.status(404).json({ error: 'Block not found' });
//         }

//         // Create departmentData with all data filtered by department
//         // const departmentData = {
//         //     Department: flockData[0].Department.filter(dept => dept.name === departmentName),
//         //     Labs: flockData[0].Labs.filter(lab => lab.Department === departmentName),
//         //     Classrooms: flockData[0].Classrooms.filter(classroom => {
//         //         return flockData[0].Department.some(dept => dept.name === departmentName && dept.Id === classroom.DepartmentId);
//         //     }),
//         //     Faculty: flockData[0].Faculty.filter(faculty => faculty.Department === departmentName),
//         //     Students: flockData[0].Student.filter(student => student.Department === departmentName),
//         //     EventsOrganized: flockData[0].EventsOrganized.filter(event => event.Department === departmentName),
//         //     SeminarHalls: flockData[0].SeminarHalls.filter(hall => hall.Department === departmentName),
//         //     // Add other relevant sections similarly...
//         // };
//         const departmentData = {
//           Department: flockData[0].Department.filter(dept => dept.name === departmentName),
//           Labs: flockData[0].Labs.filter(lab => lab.Department === departmentName),
//           Classrooms: flockData[0].classrooms.filter(classroom => {
//               return flockData[0].Department.some(dept => dept.name === departmentName && dept.Id === classroom.DepartmentId);
//           }),
//           Faculty: flockData[0].Faculty.filter(faculty => faculty.Department === departmentName),
//           Students: flockData[0].Student.filter(student => student.Department === departmentName),
//           EventsOrganized: flockData[0].EventsOrganized.filter(event => event.Department === departmentName),
//           SeminarHalls: flockData[0].SeminarHalls.filter(hall => hall.Department === departmentName),
//           // Add other relevant sections similarly...
//       };

//         // Filter departmentData based on the requested category
//         let filteredData = {};
//         switch (category) {
//             case 'Labs':
//                 filteredData = { Labs: departmentData.Labs };
//                 break;
//             case 'Classrooms':
//                 filteredData = { Classrooms: departmentData.Classrooms };
//                 break;
//             case 'Faculty':
//                 filteredData = { Faculty: departmentData.Faculty };
//                 break;
//             case 'Students':
//                 filteredData = { Students: departmentData.Students };
//                 break;
//             case 'EventsOrganized':
//                 filteredData = { EventsOrganized: departmentData.EventsOrganized };
//                 break;
//             // Add cases for other categories as needed
//             default:
//                 // If no category or invalid category, return all departmentData
//                 filteredData = departmentData;
//                 break;
//         }

//         res.json(filteredData);
//     } catch (error) {
//         console.error(`Error fetching department data:`, error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.get('/category/data/:blockName/:departmentName/:category', async (req, res) => {
  const { blockName, departmentName, category } = req.params;

  try {
      // Fetch block data for the specified block name
      const block = await BlockData.findOne({ Block: blockName });

      if (!block) {
          return res.status(404).json({ error: 'Block not found' });
      }

      // Filter data based on departmentName
      const departmentData = {
          Department: block.Department.filter(dept => dept.name === departmentName),
          Labs: block.Labs.filter(lab => lab.Department === departmentName),
          classrooms: block.classrooms.filter(classroom => classroom.Department === departmentName),
          Faculty: block.Faculty.filter(faculty => faculty.Department === departmentName),
          Student: block.Student.filter(student => student.Department === departmentName),
          EventsOrganized: block.EventsOrganized.filter(event => event.Department === departmentName),
          SeminarHalls: block.SeminarHalls.filter(hall => hall.Department === departmentName),
          // Add other relevant sections similarly...
      };

      // Filter departmentData based on the requested category
      let filteredData = {};
      switch (category) {
          case 'Labs':
              filteredData = { Labs: departmentData.Labs };
              break;
          case 'Classrooms':
              filteredData = { classrooms: departmentData.classrooms };
              break;
          case 'Faculty':
              filteredData = { Faculty: departmentData.Faculty };
              break;
          case 'Student':
              filteredData = { Student: departmentData.Student };
              break;
          case 'EventsOrganized':
              filteredData = { EventsOrganized: departmentData.EventsOrganized };
              break;
          case 'SeminarHalls':
              filteredData = { SeminarHalls: departmentData.SeminarHalls };
              break;
          // Add cases for other categories as needed
          default:
              // If no category or invalid category, return all departmentData
              filteredData = departmentData;
              break;
      }

      res.json(filteredData);
  } catch (error) {
      console.error('Error fetching department data:', error);
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
