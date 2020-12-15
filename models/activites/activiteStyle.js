const mongoose = require("mongoose");

const {Schema} = mongoose;

const activiteStyleSchema = new Schema(
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
        pourcentageOriginal: {
            type: Number,
            required: true
        },
        pourcentageElegance: {
            type: Number,
            required: true
        },
        pourcentageBasic: {
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
activiteStyleSchema.virtual("expOriginal")              
.get(function() {
    expOriginal = this.totalPtsExp * pourcentageOriginal;    
    return expOriginal;
});

activiteStyleSchema.virtual("expElegance")              
.get(function() {
    expElegance = this.totalPtsExp * pourcentageElegance;    
    return expElegance;
});

activiteStyleSchema.virtual("expBasic")              
.get(function() {
    expBasic = this.totalPtsExp * pourcentageBasic;    
    return expBasic;
});


activiteStyleSchema.virtual("voieActivite")
.get(function() {
    let voieActivite;
    switch (this.sousCategorie) {
        case "original":
            voieActivite = "La Voie de l'Excentrique";
            break;
        case "elegance":
            voieActivite = "La Voie du Stylish";
            break;
        case "basic":
            voieActivite = "La Voie du BG";
            break;
    }
    return voieActivite;
});


activiteStyleSchema.virtual("totalPtsExp")              
.get(function() {
    let totalPtsExp = 100 * this.difficulte;          // Par exemple, si l'activité a une difficulté de 4, l'épreuve vaut  400 pts d'expérience.
    return totalPtsExp;
});








// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("ActiviteStyle", activiteStyleSchema);  