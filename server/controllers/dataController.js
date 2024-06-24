const Data = require('../Models/universaldata');
const csv = require('csvtojson');

const importData = async (req, res) => {
    try {
        const filePath = req.file.path;
        const jsonArray = await csv().fromFile(filePath);

        // Extract data based on the type of document being uploaded
        const dataType = req.params.dataType;
        const blockname = req.params.block;
        console.log(dataType);
        console.log(blockname)

        let dataToInsert;
        switch (dataType) {
            case 'Classrooms':
                dataToInsert = jsonArray.map(item => ({
                    Block: blockname,
                    Classrooms: item.NUMBER ? [{ // Example condition to check if number exists
                        NUMBER: item.NUMBER,
                        CAPACITY: item.CAPACITY || '',
                        DEPARTMENT: item.DEPARTMENT || '',
                        FLOOR: item.FLOOR || '',
                        PROJECTOR_STATUS: item.PROJECTOR_STATUS || ''
                    }] : []
                }));
                break;
            case 'Labs':
                dataToInsert = jsonArray.map(item => ({
                    Block: blockname,
                    Labs: item.LAB_NUMBER ? [{
                        LAB_NUMBER: item.LAB_NUMBER,
                        NAME: item.NAME || '',
                        DEPARTMENT: item.DEPARTMENT || '',
                        EQUIPMENT_STATUS: item.EQUIPMENT_STATUS || '',
                        FLOOR: item.FlOOR || ''
                    }] : []
                }));
                break;
            case 'SeminarHalls':
                dataToInsert = jsonArray.map(item => ({
                    Block: blockname,
                    SeminarHalls: item.HALL_NUMBER ? [{
                        HALL_NUMBER: item.HALL_NUMBER,
                        NAME: item.NAME || '',
                        CAPACITY: item.CAPACITY || '',
                        DEPARTMENT: item.DEPARTMENT || ''
                    }] : []
                }));
                break;
            case 'students':
                dataToInsert = jsonArray.map(item => ({
                    StudentId: item.StudentId,
                    Name: item.Name || '',
                    Gender: item.Gender || '',
                    Program: item.Program || '',
                    Department: item.Department || ''
                }));
                break;
            case 'faculties':
                dataToInsert = jsonArray.map(item => ({
                    Facultyid: item.Facultyid,
                    name: item.name || '',
                    Designation: item.Designation || '',
                    DOJ: item.DOJ || '',
                    Department: item.Department || '',
                    committeId: item.committeId || '',
                    Role: item.Role || ''
                }));
                break;
            case 'research':
                dataToInsert = jsonArray.map(item => ({
                    Conference: item.Conference || '',
                    Journal: item.Journal || '',
                    Bookchapter: item.Bookchapter || '',
                    Patent: item.Patent || '',
                    consultancy: item.consultancy || '',
                    Project: item.Project || '',
                    Facultyid: item.Facultyid || '',
                    StudentId: item.StudentId || ''
                }));
                break;
            case 'committees':
                dataToInsert = jsonArray.map(item => ({
                    CommitteId: item.CommitteId,
                    name: item.name || '',
                    FacultyId: item.FacultyId || '',
                    Role: item.Role || ''
                }));
                break;
            case 'mentoring':
                dataToInsert = jsonArray.map(item => ({
                    FacultyId: item.FacultyId || '',
                    StudentId: item.StudentId || ''
                }));
                break;
            case 'eventsOrganized':
                dataToInsert = jsonArray.map(item => ({
                    name: item.name || '',
                    Department: item.Department || '',
                    FacultyId: item.FacultyId || '',
                    DOS: item.DOS || '',
                    DOE: item.DOE || '',
                    Audience: item.Audience || '',
                    Venue: item.Venue || ''
                }));
                break;
            case 'eventsParticipated':
                dataToInsert = jsonArray.map(item => ({
                    Type: item.Type || '',
                    name: item.name || '',
                    FacultyId: item.FacultyId || '',
                    MouDocument: item.MouDocument || ''
                }));
                break;
            case 'clubs':
                dataToInsert = jsonArray.map(item => ({
                    name: item.name || '',
                    Coordinator: item.Coordinator || '',
                    StudentId: item.StudentId || '',
                    Role: item.Role || ''
                }));
                break;
            case 'Washrooms':
                dataToInsert = jsonArray.map(item => ({
                    
                    S_NO: item.S_NO || '',
                    TYPE: item.TYPE || '',
                    GENDER: item.GENDER || '',
                    FLOOR: item.FLOOR || '',
                    COUNT: item.COUNT || '',
                    DEPARTMENT: item.DEPARTMENT || '',
                    }));
                break;

            default:
                throw new Error("Invalid data type");
        }

        console.log(dataToInsert);
        const existingDocument = await Data.findOne({ Block: blockname });

        if (existingDocument) {
            // Update existing document
            switch (dataType) {
                case 'Classrooms':
                    existingDocument.Classrooms.push(...dataToInsert.map(entry => entry.Classrooms).flat());
                    break;
                case 'Labs':
                    existingDocument.Labs.push(...dataToInsert.map(entry => entry.Labs).flat());
                    break;
                case 'SeminarHalls':
                    existingDocument.SeminarHalls.push(...dataToInsert.map(entry => entry.SeminarHalls).flat());
                    break;
                case 'students':
                    existingDocument.Student.push(...dataToInsert);
                    break;
                case 'faculties':
                    existingDocument.Faculty.push(...dataToInsert);
                    break;
                case 'research':
                    existingDocument.Research.push(...dataToInsert);
                    break;
                case 'committees':
                    existingDocument.Committe.push(...dataToInsert);
                    break;
                case 'mentoring':
                    existingDocument.Mentoring.push(...dataToInsert);
                    break;
                case 'eventsOrganized':
                    existingDocument.EventsOrganized.push(...dataToInsert);
                    break;
                case 'eventsParticipated':
                    existingDocument.EventsParticipated.push(...dataToInsert);
                    break;
                case 'clubs':
                    existingDocument.Clubs.push(...dataToInsert);
                    break;
                case 'Washrooms':
                    existingDocument.Washrooms.push(...dataToInsert.map(entry => entry.Washrooms).flat());
                    break;
                default:
                    throw new Error("Invalid data type");
            }

            await existingDocument.save();
            console.log(existingDocument)
            res.status(200).send({ success: true, msg: `${dataType} data updated successfully` });
        } else {
            // Insert new document
            const allData = {
                Block: blockname,
                classrooms: [],
                Labs: [],
                SeminarHalls: [],
                Student: [],
                Faculty: [],
                Research: [],
                Committe: [],
                Mentoring: [],
                EventsOrganized: [],
                EventsParticipated: [],
                Clubs: []
            };

            dataToInsert.forEach(entry => {
                if (entry.Classrooms) allData.Classrooms.push(...entry.Classrooms);
                if (entry.Labs) allData.Labs.push(...entry.Labs);
                if (entry.SeminarHalls) allData.SeminarHalls.push(...entry.SeminarHalls);
                // Add logic for other data types here
                if (entry.Student) allData.Student.push(...entry.Student);
                if (entry.Faculty) allData.Faculty.push(...entry.Faculty);
                if (entry.Research) allData.Research.push(...entry.Research);
                if (entry.Committe) allData.Committe.push(...entry.Committe);
                if (entry.Mentoring) allData.Mentoring.push(...entry.Mentoring);
                if (entry.EventsOrganized) allData.EventsOrganized.push(...entry.EventsOrganized);
                if (entry.EventsParticipated) allData.EventsParticipated.push(...entry.EventsParticipated);
                if (entry.Clubs) allData.Clubs.push(...entry.Clubs);
            });

            await Data.create(allData);
            res.status(200).send({ success: true, msg: `${dataType} data imported successfully` });
        }
    } catch (error) {
        console.error('Error importing data:', error.message);
        res.status(400).send({ success: false, msg: error.message });
    }
};

module.exports = {
    importData
};
