const mongoose = require("mongoose");

const {Schema} = mongoose;

const corpsSchema = new Schema(
    {
        course: {                           //SOUS-CATEGORIE: PUISSANCE
            type: Number,
            required: true
        },
        puissance: {                       //SOUS-CATEGORIE: PUISSANCE
            type: Number,
            required: true
        },
        gradePuissance: {                       //SOUS-CATEGORIE: PUISSANCE
            type: Number,
            required: true
        },

        technique: {                         //SOUS-CATEGORIE: TECHNIQUE
            type: Number,
            required: true
        },

        techniqueOuPuissance: {             //SOUS-CATEGORIE: TECHNIQUE
            type: Number,
            required: true
        },

        adresse: {                         //SOUS-CATEGORIE: TECHNIQUE
            type: Number,
            required: true
        },

        souplesse: {                       //SOUS-CATEGORIE: SOUPLESSE
            type: Number,
            required: true
        },
        etirement: {                       //SOUS-CATEGORIE: SOUPLESSE
            type: Number,
            required: true
        },
        gradeSouplesse: {                       //SOUS-CATEGORIE: SOUPLESSE
            type: Number,
            required: true
        },
        dos: {                             //SOUS-CATEGORIE: SOUPLESSE
            type: Number,
            required: true
        },
        eau: {                              //SOUS-CATEGORIE: SANTE
            type: Number,
            required: true
        },
        constipation: {                  //SOUS-CATEGORIE: SANTE
            type: Number,
            required: true
        },
        recuperation: {                     //SOUS-CATEGORIE: SANTE
            type: Number,
            required: true
        },
        sportFavori1: {
            type: String,
            required:true
        },
        sportFavori2: {
            type: String,
            required:true
        },
        zoneDeBlessure: {               
            type: String
        },
        loveBody: {
            type: String,
            required: true
        },
        aspirationCorps: {
            type: String,
            required: true
        },
        activiteCorps: [{                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteCorps"
        }],
        totalExpAcquise: {
            type: Number
        },
        puissanceExpAcquise: {
            type: Number
        },
        techniqueExpAcquise: {
            type: Number
        },
        souplesseExpAcquise: {
            type: Number
        },
        santeExpAcquise: {
            type: Number
        }
    }

);


corpsSchema.virtual("scorePuissance")              //Pour optimiser on pourra utiliser une formule qui compte le nombre de paire du schéma ("length").
.get(function() {
    let scoreDepartPuissance = ((this.course + this.puissance + this.gradePuissance) / 3);    // Le score de départ de l'user après création du compte. toFixed(1) permet d'arrondir à 1 décimale
    let scorePuissance = (scoreDepartPuissance + this.puissanceExpAcquise);

    return scorePuissance;
});

corpsSchema.virtual("scoreTechnique")              
.get(function() {
    let scoreDepartTechnique = ((this.technique + this.techniqueOuPuissance + this.adresse) / 3) ;
    let scoreTechnique = (scoreDepartTechnique + this.techniqueExpAcquise);

    return scoreTechnique;
});


corpsSchema.virtual("scoreSouplesse")              
.get(function() {
    let scoreDepartSouplesse = ((this.souplesse + this.etirement + this.gradeSouplesse + this.dos) / 4);  
    let scoreSouplesse = (scoreDepartSouplesse + this.souplesseExpAcquise);
  
    return scoreSouplesse;
});


corpsSchema.virtual("scoreSante")              
.get(function() {
    let scoreDepartSante = ((this.eau + this.constipation + this.recuperation) / 3);
    let scoreSante = (scoreDepartSante + this.santeExpAcquise);

    return scoreSante;
});


corpsSchema.virtual("scoreCorps")             
.get(function() {
    let scoreDepartCorps = (this.scorePuissance + this.scoreTechnique + this.scoreSouplesse + this.scoreSouplesse) / 4 ;
    let scoreCorps = scoreDepartCorps + this.totalExpAcquise;

    return scoreCorps;
});




// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Corps", corpsSchema);  