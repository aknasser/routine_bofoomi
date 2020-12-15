const mongoose = require("mongoose");

const {Schema} = mongoose;

const activitePasseesSocialSchema = new Schema(
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
        pourcentagePotes: {
            type: Number,
            required: true
        },
        pourcentageCharisma: {
            type: Number,
            required: true
        },
        pourcentageAventure: {
            type: Number,
            required: true
        },
        totalPtsExp: {
            type: Number,
            required: true
        },
        noteObtenue: {
            type: Number,
            required: true
        },
        user:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"                             // CONNAITRE LES USERS CONNECTEES A CETTE ACTIVITE
        }],
    }

);



// LES VIRTUALS MODELS

activitePasseesSocialSchema.virtual("expTotaleObtenue")              
.get(function() {
    let expTotaleObtenue = this.totalPtsExp * this.noteObtenue;    
    return expTotaleObtenue;
});


activitePasseesSocialSchema.virtual("expPotesObtenue")              
.get(function() {
    let expPotesObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentagePotes;    
    return expPotesObtenue;
});

activitePasseesSocialSchema.virtual("expAventureObtenue")              
.get(function() {
    let expAventureObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageAventure;    
    return expAventureObtenue;
});


activitePasseesSocialSchema.virtual("expCharismaObtenue")              
.get(function() {
    let expCharismaObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageCharisma;    
    return expCharismaObtenue;
});


activitePasseesSocialSchema.virtual("grade")           // POUR RECUPERER LA LA LETTRE DE LA NOTE DANS LES ACTIVITES PASSEES
.get(function() {
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

module.exports = mongoose.model("ActivitePasseesSocial", activitePasseesSocialSchema);  