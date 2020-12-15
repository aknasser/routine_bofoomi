const mongoose = require("mongoose");

const {Schema} = mongoose;

const cookingSchema = new Schema(
    {
        healthyFood: {               //CATEGORIE: HEALTHY
            type: Number,
            required: true
        },
        boucher: {                  //CATEGORIE: CLASSIC
            type: Number,
            required: true
        },
        legumes: {                   //CATEGORIE: CLASSIC
            type: Number,
            required: true
        },
        homeCooking: {
            type: Number,
            required: true
        },
        newRecipes: {                //CATEGORIE: DECOUVERTE
            type: Number,
            required: true
        },
        gourmand: {                //CATEGORIE: PLAISIR
            type: Number,
            required: true
        },
        platFetiche: {
            type: String
        },
        aspirationCooking: {
            type: String,
            required: true
        },
        activiteCooking: [{                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteCooking"
        }],
        totalExpAcquise: {
            type: Number
        },
        healthyExpAcquise: {
            type: Number
        },
        classicExpAcquise: {
            type: Number
        },
        decouverteExpAcquise: {
            type: Number
        },
        plaisirExpAcquise: {
            type: Number
        }
    }

);

cookingSchema.virtual("scoreHealthy")              // Ici nous créons un attribut virtuel pour si nécessaire afficher le nom entier de l'user. Cet attribut ne fait pas partie des composant du Schema user mais peut être utilisé à souhait(fonctionne un peu comme les instance methods).
    .get(function() {
        let scoreDepartHealthy = this.healthyFood;
        let scoreHealthy = (scoreDepartHealthy + this.healthyExpAcquise);

        return scoreHealthy;
    });

cookingSchema.virtual("scoreClassic")              // Ici nous créons un attribut virtuel pour si nécessaire afficher le nom entier de l'user. Cet attribut ne fait pas partie des composant du Schema user mais peut être utilisé à souhait(fonctionne un peu comme les instance methods).
    .get(function() {
        let scoreDepartClassic = ((this.boucher + this.legumes) / 2);
        let scoreClassic = (scoreDepartClassic + this.classicExpAcquise);

        return scoreClassic;
    });


cookingSchema.virtual("scoreDecouverte")              // Ici nous créons un attribut virtuel pour si nécessaire afficher le nom entier de l'user. Cet attribut ne fait pas partie des composant du Schema user mais peut être utilisé à souhait(fonctionne un peu comme les instance methods).
    .get(function() {
        let scoreDepartDecouverte = this.newRecipes;
        let scoreDecouverte = (scoreDepartDecouverte + this.decouverteExpAcquise);

        return scoreDecouverte;
    });



cookingSchema.virtual("scorePlaisir")              // Ici nous créons un attribut virtuel pour si nécessaire afficher le nom entier de l'user. Cet attribut ne fait pas partie des composant du Schema user mais peut être utilisé à souhait(fonctionne un peu comme les instance methods).
    .get(function() {
        let scoreDepartPlaisir = this.gourmand;
        let scorePlaisir = (scoreDepartPlaisir + this.plaisirExpAcquise);

        return scorePlaisir;
    });



cookingSchema.virtual("scoreCooking")              // Ici nous créons un attribut virtuel pour si nécessaire afficher le nom entier de l'user. Cet attribut ne fait pas partie des composant du Schema user mais peut être utilisé à souhait(fonctionne un peu comme les instance methods).
    .get(function() {
        let scoreDepartCooking = (this.scoreHealthy + this.scoreClassic + this.scoreDecouverte + this.scorePlaisir) / 4 ;
        let scoreCooking = (scoreDepartCooking + this.totalExpAcquise);

        return scoreCooking;
    });


// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Cooking", cookingSchema);  