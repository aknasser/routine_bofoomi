const mongoose = require("mongoose");

const {Schema} = mongoose;

const activitePasseesCookingSchema = new Schema(
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
        pourcentageClassic: {
            type: Number,
            required: true
        },
        pourcentageDecouverte: {
            type: Number,
            required: true
        },
        pourcentageHealthy: {
            type: Number,
            required: true
        },
        pourcentagePlaisir: {
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

activitePasseesCookingSchema.virtual("expTotaleObtenue")              
.get(function() {
    let expTotaleObtenue = this.totalPtsExp * this.noteObtenue;    
    return expTotaleObtenue;
});


activitePasseesCookingSchema.virtual("expClassicObtenue")              
.get(function() {
    let expClassicObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageClassic;    
    return expClassicObtenue;
});

activitePasseesCookingSchema.virtual("expHealthyObtenue")              
.get(function() {
    let expHealthyObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageHealthy;    
    return expHealthyObtenue;
});


activitePasseesCookingSchema.virtual("expDecouverteObtenue")              
.get(function() {
    let expDecouverteObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageDecouverte;    
    return expDecouverteObtenue;
});


activitePasseesCookingSchema.virtual("expPlaisirObtenue")              
.get(function() {
    let expPlaisirObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentagePlaisir;    
    return expPlaisirObtenue;
});

activitePasseesCookingSchema.virtual("grade")           // POUR RECUPERER LA LA LETTRE DE LA NOTE DANS LES ACTIVITES PASSEES
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

module.exports = mongoose.model("ActivitePasseesCooking", activitePasseesCookingSchema);  