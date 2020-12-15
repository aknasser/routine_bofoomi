const mongoose = require("mongoose");

const {Schema} = mongoose;

const activiteCorpsSchema = new Schema(
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

activiteCorpsSchema.virtual("expPuissance")              
.get(function() {
    let expPuissance = this.totalPtsExp * this.pourcentagePuissance;    
    return expPuissance;
});

activiteCorpsSchema.virtual("expTechnique")              
.get(function() {
    let expTechnique = this.totalPtsExp * this.pourcentageTechnique;    
    return expTechnique;
});


activiteCorpsSchema.virtual("expSouplesse")              
.get(function() {
    let expSouplesse = this.totalPtsExp * this.pourcentageSouplesse;    
    return expSouplesse;
});


activiteCorpsSchema.virtual("expSante")              
.get(function() {
    let expSante = this.totalPtsExp * this.pourcentageSante;    
    return expSante;
});

activiteCorpsSchema.virtual("voieActivite")
.get(function() {
    let voieActivite;
    switch (this.sousCategorie) {
        case "puissance":
            voieActivite = "La Voie de l'Olympien";
            break;
        case "technique":
            voieActivite = "La Voie de L'As";
            break;
        case "souplesse":
            voieActivite = "La Voie de La Souplesse";
            break;
        case "sante":
            voieActivite = "La Voie du Maintien";
            break;
    }
    return voieActivite;
});


activiteCorpsSchema.virtual("totalPtsExp")              
.get(function() {
    let totalPtsExp = 100 * this.difficulte;          // Par exemple, si l'activité a une difficulté de 4, l'épreuve vaut  400 pts d'expérience.
    return totalPtsExp;
});






// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("ActiviteCorps", activiteCorpsSchema);  