const mongoose = require("mongoose");

const {Schema} = mongoose;

const activiteSocialSchema = new Schema(
    {
        titre: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        categorie: {
            type: String,
            required: true
        },
        sousCategorie: {
            type: String,
            required: true
        },
        difficulte: {
            type: Number,
            required: true
        },
        pourcentagePotes: {
            type: Number,
            required: true
        },
        pourcentageAventure: {
            type: Number,
            required: true
        },
        pourcentageCharisma: {
            type: Number,
            required: true
        },
        prerequisF: {
            type: String,
            required: true
        },
        prerequisD: {
            type: String,
            required: true
        },
        prerequisC: {
            type: String,
            required: true
        },
        prerequisB: {
            type: String,
            required: true
        },
        prerequisA: {
            type: String,
            required: true
        },
        prerequisS: {
            type: String,
            required: true
        },
        user: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }]
    }

);



// LES VIRTUALS MODELS
activiteSocialSchema.virtual("expPotes")              
.get(function() {
    expPotes = this.totalPtsExp * pourcentagePotes;    
    return expPotes;
});

activiteSocialSchema.virtual("expAventure")              
.get(function() {
    expAventure = this.totalPtsExp * pourcentageAventure;    
    return expAventure;
});


activiteSocialSchema.virtual("expCharisma")              
.get(function() {
    expCharisma = this.totalPtsExp * pourcentageCharisma;    
    return expCharisma;
});


activiteSocialSchema.virtual("voieActivite")
.get(function() {
    let voieActivite;
    switch (this.sousCategorie) {
        case "potes":
            voieActivite = "La Voie du Socializer";
            break;
        case "aventure":
            voieActivite = "La Voie de l'Aventurier";
            break;
        case "charisma":
            voieActivite = "La Voie de l'Orateur";
            break;
        case "reseau":
            voieActivite = "La Voie du Réseauteur";
            break;
    }
    return voieActivite;
});


activiteSocialSchema.virtual("totalPtsExp")              
.get(function() {
    let totalPtsExp = 100 * this.difficulte;          // Par exemple, si l'activité a une difficulté de 4, l'épreuve vaut  400 pts d'expérience.
    return totalPtsExp;
});







// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("ActiviteSocial", activiteSocialSchema);  