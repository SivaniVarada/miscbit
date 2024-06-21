const mongoose = require('mongoose');
const UniversalModel = new mongoose.Schema({
    Block:{
        type :String,
        required:true
    },
    Department:[{
        
        Id:String,
        name:String,
        sections:Number
    }],
    Labs:[
        {
            Lab_num : String ,
            name:String,
            Department:String,
            Equipment_status:String,
            Floor:Number
        }
    ],
    classrooms:[
        {
            number:String,
            capacity:Number,
            DepartmentId:String,
            Floor:Number,
            projector_status:String
        }
    ],
    SeminarHalls:[
        {
            Hall_number:Number,
            name :String,
            capacity:Number
        }
    ],
    Timetables:[
        {
            course_id: String,
            section:String,
            FacultyId:String,
            name:String,
            Period:Number
        }
    ],
    Student:[
        {
            StudentId:Number,
            Name:String,
            Gender:String,
            Program:String,
            Department:String,
            
        }
    ],
    Faculty:[
        {
            Facultyid :Number,
            name :String ,
            Designation:String,
            DOJ:String, //date of joining
            Department:String,
            committeId:Number,
            Role:String
        }

    ],
    Research :[{
        Conference :String,
        Journal:String,
        Bookchapter:String,
        Patent:String,
        consultancy:String,
        Project : String,
        Facultyid:Number,
        StudentId:Number
       }

    ],
    Committe:[
        {
            CommitteId : Number,
            name :String,
            FacultyId:Number,
            Role:String,

        }
    ],
    Mentoring:[
        {
            FacultyId:Number,
            StudentId:Number,

        }
    ],
    EventsOrganized:[{
        name:String,
        Department:String,
        FacultyId:String,
        DOS:String , //Date of start
        DOE:String, //Date of End
        Audience:String, //Student or faculty,
        Venue:String


    }],
    EventsParticipated :[{
        Type:String,
        name:String,
        FacultyId:Number,
        MouDocument : String,

    }],
     
    Clubs :[
        {
            name:String,
            Coordinator:String,
            StudentId:Number,
            Role:String,

        }
    ],
    Washrooms:[{
        S_NO:String,
        TYPE:String,
        GENDER:String,
        FLOOR:Number, //Date of start
        COUNT:Number
    }],

})

module.exports= mongoose.model('BlockData',UniversalModel)