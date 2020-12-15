const mongoose = require("mongoose");

const {Schema} = mongoose;

const espritSchema = new Schema(
    {
        contenuPedago: {        //CATEGORIE: HARDSKILLS
            type: Number,
            required: true
        },
        event: {                //CATEGORIE: HARDSKILLS
            type: Number,
            required: true
        },
        meditation: {           //CATEGORIE: SOUL
            type: Number,
            required: true
        },
        logPerso: {             //CATEGORIE: SOUL
            type: Number,
            required: true
        },
        leBilan: {              //CATEGORIE: SOUL
            type: Number,
            required: true
        },
        bricolage: {               //CATEGORIE: CRAFTY
            type: Number,
            required: true
        },
        manuel: {               //CATEGORIE: CRAFTY
            type: Number,
            required: true
        },
        caractere: {
            type: String,
            required: true
        },
        discipline: {
            type: String,
            required: true
        },
        aspirationEsprit: {
            type: String,
            required: true
        },
        activiteEsprit: [{                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteEsprit"
        }],
        totalExpAcquise: {
            type: Number
        },
        hardsSkillsExpAcquise: {
            type: Number
        },
        soulExpAcquise: {
            type: Number
        },
        craftyExpAcquise: {
            type: Number
        }
    }

);


espritSchema.virtual("scoreHardSkills")              //Pour optimiser on pourra utiliser une formule qui compte le nombre de paire du schéma ("length").
.get(function() {
    let scoreDepartHardSkills = ((this.contenuPedago + this.event) / 2);
    let scoreHardSkills = (scoreDepartHardSkills + this.hardsSkillsExpAcquise);

    return scoreHardSkills;
});

espritSchema.virtual("scoreSoul")              
.get(function() {
    let scoreDepartSoul = ((this.meditation + this.logPerso + this.leBilan) / 3);
    let scoreSoul = (scoreDepartSoul + this.soulExpAcquise);

    return scoreSoul;
});


espritSchema.virtual("scoreCrafty")              
.get(function() {
    let scoreDepartCrafty = ((this.bricolage + this.manuel) / 2);
    let scoreCrafty = (scoreDepartCrafty + this.craftyExpAcquise);

    return scoreCrafty;
});


espritSchema.virtual("scoreEsprit")             
.get(function() {
    let scoreDepartEsprit = (this.scoreHardSkills + this.scoreSoul + this.scoreCrafty) / 3 ;
    let scoreEsprit = (scoreDepartEsprit + this.totalExpAcquise);

    return scoreEsprit;
});




// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Esprit", espritSchema);  