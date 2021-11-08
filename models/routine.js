const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const routineSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim:true
        },
        description: {
            type: String,
            required: true,
            trim:true
        },
        advice: {
            type: String,
            required: true,
            trim:true
        },
        time: {
            type: Number,
            required: true,
            trim:true
        },

// LA CATEGORIE VA NOUS PERMETTRE DE RESSORTIR UNE ROUTINE POUR UNE CATEGORIE ENTIERE CHAQUE JOUR.       
        category: {
            type : String,
            required : true,
            trim : true
        },

// CODE_GOAL PERMET D'IDENTIFIER L'OBJECTIF QUI CORRESPOND A LA ROUTINE FACILEMENT ET DE LE METTRE EN RELATION AVEC LES ROUTINES CORRESPONDANTES
        code_goal : {
            type : String,
            required: true,
            trim : true,
            lowercase : true
        },
        // LE PROPRES A CHAQUE OBJECTIF (3 A 5 PAR CATEGORIE)
        objectif: {                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Objectif"
        },
                
    },
        
    {
        timestamps: true
    }
    
);
 


// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Routine", routineSchema);      