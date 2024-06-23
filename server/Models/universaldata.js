const mongoose = require('mongoose');
const UniversalModel = new mongoose.Schema({
    Block:{
        type :String,
        required:true
    },
    Department:[{
        
        ID:String,
        NAME:String,
        SECTIONS:Number
    }],
    Labs:[
        {
            LAB_NUMBER : String ,
            NAME:String,
            DEPARTMENT: { type: String, required: true },
            EQUIPMENT_STATUS:String,
            FlOOR:Number
        }
    ],
    Classrooms:[
        {
            NUMBER:String,
            CAPACITY:Number,
            DEPARTMENT: { type: String, required: true },
            FLOOR:Number,
            PROJECTOR_STATUS:String
        }
    ],
    SeminarHalls:[
        {
            HALL_NUMBER:Number,
            NAME :String,
            CAPACITY:Number,
            DEPARTMENT: { type: String, required: true },
        }
    ],
    Timetables:[
        {
            COURSE_ID: String,
            SECTION:String,
            FACULTY_ID:String,
            NAME:String,
            PERIOD:Number
        }
    ],
    Student:[
        {
            STUDENTID:Number,
            NAME:String,
            GENDER:String,
            PROGRAM:String,
            DEPARTMENT:String,
            
        }
    ],
    Faculty:[
        {
            FACULTYID :Number,
            NAME :String ,
            DESIGNATION:String,
            DOJ:String, //date of joining
            DEPARTMENT:String,
            COMMITTEID:Number,
            ROLE:String
        }

    ],
    Research :[{
        CONFERENCE :String,
        JOURNAL:String,
        BOOKCHAPTER:String,
        PATENT:String,
        CONSULTANCY:String,
        PROJECT : String,
        FACULTYID:Number,
        STUDENTID:Number
       }

    ],
    Committe:[
        {
            COMMITTEID : Number,
            NAME :String,
            FACULTYID:Number,
            ROLE:String,

        }
    ],
    Mentoring:[
        {
            FACULTYID:Number,
            STUDENTID:Number,

        }
    ],
    EventsOrganized:[{
        NAME:String,
        DEPARTMENT:String,
        FACULTYID:String,
        DOS:String , //Date of start
        DOE:String, //Date of End
        AUDIENCE:String, //Student or faculty,
        Venue:String


    }],
    EventsParticipated :[{
        TYPE:String,
        NAME:String,
        FACULTYID:Number,
        MOUDOCUMENT : String,

    }],
     
    Clubs :[
        {
            NAME:String,
            COORDINATOR:String,
            STUDENTID:Number,
            ROLE:String,

        }
    ],
    Washrooms:[{
        S_NO:String,
        TYPE:String,
        GENDER:String,
        FLOOR:Number, //Date of start
        COUNT:Number,
        DEPARTMENT:String
    }],

})

module.exports= mongoose.model('BlockData',UniversalModel)