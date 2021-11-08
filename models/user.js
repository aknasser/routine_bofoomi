const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB


const passportLocalMongoose = require("passport-local-mongoose");   //Pour utiliser librement userSchema.plugin (juste en dessous)



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const userSchema = new Schema(
    {
        prenom: {
            type: String,
            required: true,
            trim:true
        },
        nom: {
            type: String,
            required: true,
            trim:true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        age: {
            type: Number,
            required: true,
            min: 10,
            max: [120, "Plus de 120 ans ?!? Serais-tu immortel ?"]
        },
        ville: {
            type: String,
            required: true
        },

// LES  OBJECTIFS SMART CHOISI PAR L'USER (2 PAR CATEGORIE), On stocke les ID des objectifs pour les retrouver par la suite en utilisant findbyId
        objectifs: [{                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Objectif"
        }],
        routinesEnCours : [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Routine"
        }],
        routinesDone: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"RoutineDone" 
        }],
        challenges : [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Challenge"
        }]
    },
    {
        timestamps: true
    }
    
);
 


// Avec ce plugin, nous indiquons que nous utilisons passportLocalMongoose pour hasher et stocker les data (et du coup plus besoin de password dans le model Schema)
userSchema.plugin(passportLocalMongoose, {                    
    usernameField: "email"                          // ==> Nous lui disons: "l'email est le parametre de validation au lieu d'username(la valeur par défaut de passport-local-mongoose")
});



// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("User", userSchema);      