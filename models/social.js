const mongoose = require("mongoose");

const {Schema} = mongoose;

const socialSchema = new Schema(
    {
        frequenceAmi: {             //CATEGORIE: POTES
            type: Number,
            required: true
        },
        connaissances: {            //CATEGORIE: POTES
            type: Number,
            required: true
        },
        sorties: {                  //CATEGORIE: POTES
            type: Number,
            required: true
        },
        escapade: {                 //CATEGORIE: AVENTURE
            type: Number,
            required: true
        },
        adrenaline: {           //CATEGORIE: AVENTURE
            type: Number,
            required: true
        },
        speaker: {               //CATEGORIE: CHARISMA
            type: Number,
            required: true
        },
        elocution: {               //CATEGORIE: CHARISMA
            type: Number,
            required: true
        },
        charismaGuy: {
            type: String
        },
        aspirationSocial: {
            type: String,
            required: true
        },
        activiteSocial: [{                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteSocial"
        }],
        totalExpAcquise: {
            type: Number
        },
        potesExpAcquise: {
            type: Number
        },
        aventureExpAcquise: {
            type: Number
        },
        charismaExpAcquise: {
            type: Number
        }

    }

);


socialSchema.virtual("scorePotes")              //Pour optimiser on pourra utiliser une formule qui compte le nombre de paire du schéma ("length").
.get(function() {
    let scoreDepartPotes = ((this.frequenceAmi + this.connaissances + this.sorties) / 3) ;
    let scorePotes = (scoreDepartPotes + this.potesExpAcquise);

    return scorePotes;
});

socialSchema.virtual("scoreAventure")              
.get(function() {
    let scoreDepartAventure = ((this.escapade + this.adrenaline) / 2);
    let scoreAventure = (scoreDepartAventure + this.aventureExpAcquise);

    return scoreAventure;
});


socialSchema.virtual("scoreCharisma")              
.get(function() {
    let scoreDepartCharisma = ((this.speaker + this.elocution) / 2) ;
    let scoreCharisma = (scoreDepartCharisma + this.charismaExpAcquise);

    return scoreCharisma;
});



socialSchema.virtual("scoreSocial")             
.get(function() {
    let scoreDepartSocial = (this.scorePotes + this.scoreAventure + this.scoreCharisma) / 3 ;
    let scoreSocial = (scoreDepartSocial + this.totalExpAcquise);

    return scoreSocial;
});



// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Social", socialSchema);  