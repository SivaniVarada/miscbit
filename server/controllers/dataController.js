const Data = require('../Models/universaldata');
const csv = require('csvtojson');

const importData = async (req, res) => {
    try {
        const filePath = req.file.path;
        const jsonArray = await csv().fromFile(filePath);

        // Extract data based on the type of document being uploaded
        const dataType = req.params.dataType;

        let dataToInsert;
        switch (dataType) {
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

        await Data.insertMany(dataToInsert);
        res.status(200).send({ success: true, msg: `${dataType} data imported successfully` });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    importData
};
