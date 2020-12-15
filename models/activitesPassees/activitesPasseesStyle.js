const mongoose = require("mongoose");

const {Schema} = mongoose;

const activitePasseesStyleSchema = new Schema(
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
        pourcentageOriginal: {
            type: Number,
            required: true
        },
        pourcentageBasic: {
            type: Number,
            required: true
        },
        pourcentageElegance: {
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

activitePasseesStyleSchema.virtual("expTotaleObtenue")              
.get(function() {
    let expTotaleObtenue = this.totalPtsExp * this.noteObtenue;    
    return expTotaleObtenue;
});

activitePasseesStyleSchema.virtual("expOriginalObtenue")              
.get(function() {
    let expOriginalObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageOriginal;    
    return expOriginalObtenue;
});

activitePasseesStyleSchema.virtual("expEleganceObtenue")              
.get(function() {
    let expEleganceObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageElegance;    
    return expEleganceObtenue;
});


activitePasseesStyleSchema.virtual("expBasicObtenue")              
.get(function() {
    let expBasicObtenue = this.totalPtsExp * this.noteObtenue * this.pourcentageBasic;    
    return expBasicObtenue;
});


activitePasseesStyleSchema.virtual("grade")           // POUR RECUPERER LA LA LETTRE DE LA NOTE DANS LES ACTIVITES PASSEES
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

module.exports = mongoose.model("ActivitePasseesStyle", activitePasseesStyleSchema);  