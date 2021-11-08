const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const betterManSchema = new Schema(
    {
        title : {
            type: String,
            required: true           
        },

        content: {                          
            type: String,
            required: true
        },

        picture : {
            type: String,
            required: true
        }
                
    },
        
    {
        timestamps: true
    }
    
);
 
// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("BetterMan", betterManSchema);      