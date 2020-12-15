const mongoose = require("mongoose");

const {Schema} = mongoose;

const activitePasseesCorpsSchema = new Schema(
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
        pourcentagePuissance: {
            type: Number,
            required: true
        },
        pourcentageSouplesse: {
            type: Number,
            required: true
        },
        pourcentageTechnique: {
            type: Number,
            required: true
        },
        pourcentageSante: {
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

activitePasseesCorpsSchema.virtual("expTotaleObtenue")              
.get(function() {
    let expTotaleObtenue = this.totalPtsExp * this.noteObtenue;    
    return expTotaleObtenue;
});


activitePasseesCorpsSchema.virtual("expPuissanceObtenue")              
.get(function() {
    let expPuissanceObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentagePuissance;    
    return expPuissanceObtenue;
});

activitePasseesCorpsSchema.virtual("expTechniqueObtenue")              
.get(function() {
    let expTechniqueObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageTechnique;    
    return expTechniqueObtenue;
});


activitePasseesCorpsSchema.virtual("expSouplesseObtenue")              
.get(function() {
    let expSouplesseObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageSouplesse;    
    return expSouplesseObtenue;
});


activitePasseesCorpsSchema.virtual("expSanteObtenue")              
.get(function() {
    let expSanteObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageSante;    
    return expSanteObtenue;
});



activitePasseesCorpsSchema.virtual("grade")           // POUR RECUPERER LA LA LETTRE DE LA NOTE DANS LES ACTIVITES PASSEES
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

module.exports = mongoose.model("ActivitePasseesCorps", activitePasseesCorpsSchema);  