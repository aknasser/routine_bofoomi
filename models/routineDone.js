const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const routineDoneSchema = new Schema(
    {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"           
        },

        routine: {                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Routine"
        },

        noteObtenue : {
            type : Number,
            required: true
        }
                
    },
        
    {
        timestamps: true
    }
    
);
 
// VIRTUAL MODELS - permet de transformer les notes obtenues(integrer) en note lettré (F, D, C, B, A, S)


routineDoneSchema.virtual("gradeLetter")
.get(function () {
    let grade;
    switch (this.noteObtenue) {
        case 0:
            grade = "F";
            break;
        case 0.25:
            grade = "D";
            break;
        case 0.50:
            grade = "C";
            break;
        case 0.75:
            grade = "B";
            break;
        case 1:
            grade = "A";
            break;
        case 1.25:
            grade = "S";
            break;
    }
    return grade;
});

// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("RoutineDone", routineDoneSchema);      