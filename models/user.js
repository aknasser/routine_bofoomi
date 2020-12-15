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
        superpouvoir: {
            type: String
        },
        couleur: {
            type: String
        },
        corps: {                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Corps"
        },
        esprit: {                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Esprit"
        },
        social: {                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Social"
        },
        arts: {                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Arts"
        },
        style: {                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Style"
        },
        cooking: {                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"Cooking"
        },

// LES ACTIVITES ATTRIBUEES ACTUELLEMENT A L'USER ( Pas un array, car l'user ne peut avoir qu'une seule activite en cours par categorie !)
        activitesCorps:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteCorps"
        },
        activitesEsprit:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteEsprit"
        },
        activitesSocial:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteSocial"
        },
        activitesArts:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteArts"
        },
        activitesStyle:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteStyle"
        },
        activitesCooking:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteCooking"
        },

// LES ACTIVITES EFFECTUEES PAR CATEGORIE (UN array car l'user peut/doit avoir plusieurs activites passees par categorie)
        activitesPasseesCorps:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActivitePasseesCorps"                             // POUR AVOIR UN OEIL SUR L'HISTORIQUE DE PROGRESSION.
        }],
        activitesPasseesEsprit:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActivitePasseesEsprit"                          // POUR AVOIR UN OEIL SUR L'HISTORIQUE DE PROGRESSION.
        }],
        activitesPasseesSocial:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActivitePasseesSocial"                          // POUR AVOIR UN OEIL SUR L'HISTORIQUE DE PROGRESSION.
        }],
        activitesPasseesArts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActivitePasseesArts"                          // POUR AVOIR UN OEIL SUR L'HISTORIQUE DE PROGRESSION.
        }],
        activitesPasseesStyle:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActivitePasseesStyle"                          // POUR AVOIR UN OEIL SUR L'HISTORIQUE DE PROGRESSION.
        }],
        activitesPasseesCooking:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActivitePasseesCooking"                          // POUR AVOIR UN OEIL SUR L'HISTORIQUE DE PROGRESSION.
        }]
        // AJOUTER ACTIVITESENCOURS ET ACTIVITES TERMINEES ! Permettra de tracker l'évolution
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