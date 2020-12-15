const mongoose = require("mongoose");

const {Schema} = mongoose;

const activiteEspritSchema = new Schema(
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
        pourcentageHardSkills: {
            type: Number,
            required: true
        },
        pourcentageSoul: {
            type: Number,
            required: true
        },
        pourcentageCrafty: {
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
activiteEspritSchema.virtual("expHardSkills")              
.get(function() {
    expHardSkills = this.totalPtsExp * pourcentageHardSkills;    
    return expHardSkills;
});

activiteEspritSchema.virtual("expSoul")              
.get(function() {
    expSoul = this.totalPtsExp * pourcentageSoul;    
    return expSoul;
});


activiteEspritSchema.virtual("expCrafty")              
.get(function() {
    expCrafty = this.totalPtsExp * pourcentageCrafty;    
    return expCrafty;
});

activiteEspritSchema.virtual("voieActivite")
.get(function() {
    let voieActivite;
    switch (this.sousCategorie) {
        case "hardSkills":
            voieActivite = "La Voie de L'Erudit";
            break;
        case "soul":
            voieActivite = "La Voie de L'Expert";
            break;
        case "crafty":
            voieActivite = "La Voie du Rusé";
            break;
    }
    return voieActivite;
});


activiteEspritSchema.virtual("totalPtsExp")              
.get(function() {
    let totalPtsExp = 100 * this.difficulte;          // Par exemple, si l'activité a une difficulté de 4, l'épreuve vaut  400 pts d'expérience.
    return totalPtsExp;
});






// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("ActiviteEsprit", activiteEspritSchema);  