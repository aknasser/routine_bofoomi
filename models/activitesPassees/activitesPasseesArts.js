const mongoose = require("mongoose");

const {Schema} = mongoose;

const activitePasseesArtsSchema = new Schema(
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
        pourcentagePractice: {
            type: Number,
            required: true
        },
        pourcentageCulture: {
            type: Number,
            required: true
        },
        pourcentageExpressivite: {
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

activitePasseesArtsSchema.virtual("expTotaleObtenue")              
.get(function() {
    let expTotaleObtenue = this.totalPtsExp * this.noteObtenue;    
    return expTotaleObtenue;
});


activitePasseesArtsSchema.virtual("expPracticeObtenue")              
.get(function() {
    let expPracticeObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentagePractice;    
    return expPracticeObtenue;
});

activitePasseesArtsSchema.virtual("expCultureObtenue")              
.get(function() {
    let expCultureObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageCulture;    
    return expCultureObtenue;
});


activitePasseesArtsSchema.virtual("expExpressiviteObtenue")              
.get(function() {
    let expExpressiviteObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageExpressivite;    
    return expExpressiviteObtenue;
});


activitePasseesArtsSchema.virtual("grade")           // POUR RECUPERER LA LA LETTRE DE LA NOTE DANS LES ACTIVITES PASSEES
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

module.exports = mongoose.model("ActivitePasseesArts", activitePasseesArtsSchema);  