const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const objectifSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim:true
        },
        category: {
            type: String,
            required: true,
            trim:true,
            lowercase : true
        },


// CODE_GOAL PERMET D'IDENTIFIER L'OBJECTIF FACILEMENT ET DE LE METTRE EN RELATION AVEC LES ROUTINES CORRESPONDANTES
        code_goal : {
            type : String,
            required: true,
            trim : true,
            lowercase : true
        },

// LES  ROUTINES PROPRES A CHAQUE OBJECTIF (3 A 5 PAR CATEGORIE)
        routine: [{                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Routine"
        }],
                
    },
    {
        timestamps: true
    }
    
);
 


// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Objectif", objectifSchema);      