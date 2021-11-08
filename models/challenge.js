const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const challengeSchema = new Schema(
    {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"     
        },

        title : {
            type: String,
            trim: true,
            required: true           
        },

        steps: [{                          
            type: String,
            trim: true
        }],

        category : {
            type : String,
            trim: true,
            required: true
        }
                
    },
        
    {
        timestamps: true
    }
    
);
 



// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Challenge", challengeSchema);      