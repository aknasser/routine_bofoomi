const mongoose = require("mongoose");

const {Schema} = mongoose;

const activitePasseesEspritSchema = new Schema(
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
        pourcentageHardSkills: {
            type: Number,
            required: true
        },
        pourcentageCrafty: {
            type: Number,
            required: true
        },
        pourcentageSoul: {
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

activitePasseesEspritSchema.virtual("expTotaleObtenue")              
.get(function() {
    let expTotaleObtenue = this.totalPtsExp * this.noteObtenue;    
    return expTotaleObtenue;
});


activitePasseesEspritSchema.virtual("expHardSkillsObtenue")              
.get(function() {
    let expHardSkillsObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageHardSkills;    
    return expHardSkillsObtenue;
});

activitePasseesEspritSchema.virtual("expSoulObtenue")              
.get(function() {
    let expSoulObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageSoul;    
    return expSoulObtenue;
});


activitePasseesEspritSchema.virtual("expCraftyObtenue")              
.get(function() {
    let expCraftyObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageCrafty;    
    return expCraftyObtenue;
});



activitePasseesEspritSchema.virtual("grade")           // POUR RECUPERER LA LA LETTRE DE LA NOTE DANS LES ACTIVITES PASSEES
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

module.exports = mongoose.model("ActivitePasseesEsprit", activitePasseesEspritSchema);  