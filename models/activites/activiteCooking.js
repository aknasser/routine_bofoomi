const mongoose = require("mongoose");

const {Schema} = mongoose;

const activiteCookingSchema = new Schema(
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
        pourcentageClassic: {
            type: Number,
            required: true
        },
        pourcentageHealthy: {
            type: Number,
            required: true
        },
        pourcentageDecouverte: {
            type: Number,
            required: true
        },
        pourcentagePlaisir: {
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
activiteCookingSchema.virtual("expClassic")              
.get(function() {
    expClassic = this.totalPtsExp * pourcentageClassic;    
    return expClassic;
});

activiteCookingSchema.virtual("expHealthy")              
.get(function() {
    expHealthy = this.totalPtsExp * pourcentageHealthy;    
    return expHealthy;
});

activiteCookingSchema.virtual("expDecouverte")              
.get(function() {
    expDecouverte = this.totalPtsExp * pourcentageDecouverte;    
    return expDecouverte;
});

activiteCookingSchema.virtual("expPlaisir")              
.get(function() {
    expPlaisir = this.totalPtsExp * pourcentagePlaisir;    
    return expPlaisir;
});


activiteCookingSchema.virtual("voieActivite")
.get(function() {
    let voieActivite;
    switch (this.sousCategorie) {
        case "healthy":
            voieActivite = "La Voie Verte";
            break;
        case "classic":
            voieActivite = "La Voie du Terroir";
            break;
        case "decouverte":
            voieActivite = "La Voie de L'Explorateur";
            break;
        case "plaisir":
            voieActivite = "La Voie de l'Hédoniste";
            break;
    }
    return voieActivite;
});


activiteCookingSchema.virtual("totalPtsExp")              
.get(function() {
    let totalPtsExp = 100 * this.difficulte;          // Par exemple, si l'activité a une difficulté de 4, l'épreuve vaut  400 pts d'expérience.
    return totalPtsExp;
});




// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("ActiviteCooking", activiteCookingSchema);  