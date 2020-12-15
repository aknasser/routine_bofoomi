const mongoose = require("mongoose");

const {Schema} = mongoose;

const activiteArtsSchema = new Schema(
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
activiteArtsSchema.virtual("expPractice")              
.get(function() {
    expPractice = this.totalPtsExp * pourcentagePractice;    
    return expPractice;
});

activiteArtsSchema.virtual("expCulture")              
.get(function() {
    expCulture = this.totalPtsExp * pourcentageCulture;    
    return expCulture;
});

activiteArtsSchema.virtual("expExpressivite")              
.get(function() {
    expExpressivite = this.totalPtsExp * pourcentageExpressivite;    
    return expExpressivite;
});


activiteArtsSchema.virtual("voieActivite")
.get(function() {
    let voieActivite;
    switch (this.sousCategorie) {
        case "practice":
            voieActivite = "La Voie du Virtuose";
            break;
        case "culture":
            voieActivite = "La Voie du Connaisseur";
            break;
        case "expressivite":
            voieActivite = "La Voie du Performer";
            break;
    }
    return voieActivite;
});


activiteArtsSchema.virtual("totalPtsExp")              
.get(function() {
    let totalPtsExp = 100 * this.difficulte;          // Par exemple, si l'activité a une difficulté de 4, l'épreuve vaut  400 pts d'expérience.
    return totalPtsExp;
});






// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("ActiviteArts", activiteArtsSchema);  