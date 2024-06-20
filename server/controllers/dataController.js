const Data = require('../Models/universaldata');
const csv = require('csvtojson');

const importData = async (req, res) => {
    try {
        const filePath = req.file.path;
        const jsonArray = await csv().fromFile(filePath);

        // Extract data based on the type of document being uploaded
        const dataType = req.params.dataType;
        const blockname=req.params.block;
        console.log(dataType)

        let dataToInsert;
        switch (dataType) {
            case 'classrooms':
                dataToInsert = jsonArray.map(item => ({
                    Block: blockname,
                    Classrooms:[{
                    number:item.number,
                    capacity:item.capacity,
                    DepartmentId:item.DepartmentId,
                    Floor:item.Floor,
                    projector_status:item.projector_status
                }]
                    // Map your classroom data here
                }));
                break;
            case 'labs':
                dataToInsert = jsonArray.map(item => ({
                    Block: blockname,
                    Labs: [{
                        Lab_num: item.Lab_num,
                        name: item.name,
                        Department: item.Department, // This should now be a string
                        Equipment_status: item.Equipment_status,
                        Floor: item.Floor
                    }]
                    // Map your labs data here
                }));
                break;
            case 'seminarHalls':
                
                dataToInsert = jsonArray.map(item => ({
                    Block: blockname,
                    SeminarHalls: [{
                    Hall_number:item.Hall_number,
                    name :item.name,
                    capacity:item.capacity
                }]
                    // Map your seminar halls data here
                }));
                break;
            // case 'washrooms':
            //     dataToInsert = jsonArray.map(item => ({
            //         // Map your washrooms data here
            //     }));
            //     break;
            case 'students':
                dataToInsert = jsonArray.map(item => ({
                    StudentId: item.StudentId,
                    Name: item.Name,
                    Gender: item.Gender,
                    Program: item.Program,
                    Department: item.Department
                }));
                break;
            case 'faculties':
                dataToInsert = jsonArray.map(item => ({
                    Facultyid: item.Facultyid,
                    name: item.name,
                    Designation: item.Designation,
                    DOJ: item.DOJ,
                    Department: item.Department,
                    committeId: item.committeId,
                    Role: item.Role
                }));
                break;
            case 'research':
                dataToInsert = jsonArray.map(item => ({
                    Conference: item.Conference,
                    Journal: item.Journal,
                    Bookchapter: item.Bookchapter,
                    Patent: item.Patent,
                    consultancy: item.consultancy,
                    Project: item.Project,
                    Facultyid: item.Facultyid,
                    StudentId: item.StudentId
                }));
                break;
            case 'committees':
                dataToInsert = jsonArray.map(item => ({
                    CommitteId: item.CommitteId,
                    name: item.name,
                    FacultyId: item.FacultyId,
                    Role: item.Role
                }));
                break;
            case 'mentoring':
                dataToInsert = jsonArray.map(item => ({
                    FacultyId: item.FacultyId,
                    StudentId: item.StudentId
                }));
                break;
            case 'eventsOrganized':
                dataToInsert = jsonArray.map(item => ({
                    name: item.name,
                    Department: item.Department,
                    FacultyId: item.FacultyId,
                    DOS: item.DOS,
                    DOE: item.DOE,
                    Audience: item.Audience,
                    Venue: item.Venue
                }));
                break;
            case 'eventsParticipated':
                dataToInsert = jsonArray.map(item => ({
                    Type: item.Type,
                    name: item.name,
                    FacultyId: item.FacultyId,
                    MouDocument: item.MouDocument
                }));
                break;
            case 'clubs':
                dataToInsert = jsonArray.map(item => ({
                    name: item.name,
                    Coordinator: item.Coordinator,
                    StudentId: item.StudentId,
                    Role: item.Role
                }));
                break;
            // Add cases for other document types...
            default:
                throw new Error("Invalid data type");
        }
        console.log(dataToInsert)
        const existingDocument = await Data.findOne({ Block: blockname });

        if (existingDocument) {
            // Update existing document
            switch (dataType) {
                case 'classrooms':
                    existingDocument.Classrooms.push(...dataToInsert[0].Classrooms);
                    break;
                case 'labs':
                    existingDocument.Labs.push(...dataToInsert[0].Labs);
                    break;
                case 'seminarHalls':
                    existingDocument.SeminarHalls.push(...dataToInsert[0].SeminarHalls);
                    break;
                case 'students':
                    existingDocument.Student.push(...dataToInsert[0].Student);
                    break;
                case 'Faculty':
                    existingDocument.Faculty.push(...dataToInsert[0].Faculty);
                    break;
                case 'Research':
                    existingDocument.Research.push(...dataToInsert[0].Research);
                    break;
                case 'Committe':
                    existingDocument.Committe.push(...dataToInsert[0].Committe);
                    break;
                case 'Mentoring':
                    existingDocument.Mentoring.push(...dataToInsert[0].Mentoring);
                    break;
                case 'EventsOrganized':
                    existingDocument.EventsOrganized.push(...dataToInsert[0].EventsOrganized);
                    break;
                case 'EventsParticipated':
                    existingDocument.EventsParticipated.push(...dataToInsert[0].EventsParticipated);
                    break;
                case 'Clubs':
                    existingDocument.Clubs.push(...dataToInsert[0].Clubs);
                    break;
                default:
                    throw new Error("Invalid data type");
            }

            await existingDocument.save();
            res.status(200).send({ success: true, msg: `${dataType} data updated successfully` });
        } else {
            // Insert new document
            await Data.insertMany(dataToInsert[0]);
            res.status(200).send({ success: true, msg: `${dataType} data imported successfully` });
        }

        // await Data.insertMany(dataToInsert[0]);
        // res.status(200).send({ success: true, msg: `${dataType} data imported successfully` });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    importData
};
