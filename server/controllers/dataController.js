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

        let dataToInsert;
        switch (dataType) {
            case 'classrooms':
                dataToInsert = jsonArray.map(item => ({
                    Block: blockname,
                    classrooms: item.number ? [{ // Example condition to check if number exists
                        number: item.number,
                        capacity: item.capacity || '',
                        Department: item.Department || '',
                        Floor: item.Floor || '',
                        projector_status: item.projector_status || ''
                    }] : []
                }));
                break;
            case 'labs':
                dataToInsert = jsonArray.map(item => ({
                    Block: blockname,
                    Labs: item.Lab_num ? [{
                        Lab_num: item.Lab_num,
                        name: item.name || '',
                        Department: item.Department || '',
                        Equipment_status: item.Equipment_status || '',
                        Floor: item.Floor || ''
                    }] : []
                }));
                break;
            case 'seminarHalls':
                dataToInsert = jsonArray.map(item => ({
                    Block: blockname,
                    SeminarHalls: item.Hall_number ? [{
                        Hall_number: item.Hall_number,
                        name: item.name || '',
                        capacity: item.capacity || '',
                        Department: item.Department || ''
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
            default:
                throw new Error("Invalid data type");
        }

        console.log(dataToInsert);
        const existingDocument = await Data.findOne({ Block: blockname });

        if (existingDocument) {
            // Update existing document
            switch (dataType) {
                case 'classrooms':
                    existingDocument.classrooms.push(...dataToInsert.map(entry => entry.classrooms).flat());
                    break;
                case 'labs':
                    existingDocument.Labs.push(...dataToInsert.map(entry => entry.Labs).flat());
                    break;
                case 'seminarHalls':
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
                if (entry.classrooms) allData.classrooms.push(...entry.classrooms);
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
