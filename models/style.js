const mongoose = require("mongoose");

const {Schema} = mongoose;

const styleSchema = new Schema(
    {
        vetements: {
            type: Number,
            required: true
        },
        colorful: {                 // COLORFUL
            type: Number,
            required: true
        },
        classy: {                   // CLASSY
            type: Number,
            required: true
        },
        simple: {                   // SIMPLE
            type: Number,
            required: true
        },
        style: {
            type: Number,
            required: true
        },
        accordStyle: {
            type: Number,
            required: true
        },
        styleIdeal: {
            type: String,
            required: true
        },
        vetementDesire: {
            type: String,
            required: true
        },
        aspirationStyle: {
            type: String,
            required: true
        },
        activiteStyle: [{                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteStyle"
        }],
        totalExpAcquise: {
            type: Number
        },
        colorfulExpAcquise: {
            type: Number
        },
        classyExpAcquise: {
            type: Number
        },
        simpleExpAcquise: {
            type: Number
        }
    }

);

styleSchema.virtual("scoreColorful")              //Pour optimiser on pourra utiliser une formule qui compte le nombre de paire du schéma ("length").
.get(function() {
    let scoreDepartColorful = this.colorful;
    let scoreColorful = scoreDepartColorful + this.colorfulExpAcquise;

    return scoreColorful;
});

styleSchema.virtual("scoreClassy")              
.get(function() {
    let scoreDepartClassy = this.classy;
    let scoreClassy = scoreDepartClassy + this.classyExpAcquise;

    return scoreClassy;
});


styleSchema.virtual("scoreSimple")              
.get(function() {
    let scoreDepartSimple = this.simple;
    let scoreSimple = scoreDepartSimple + this.simpleExpAcquise;

    return scoreSimple;
});


styleSchema.virtual("scoreStyle")             
.get(function() {
    let scoreDepartStyle = (this.scoreColorful + this.scoreClassy + this.scoreSimple) / 3 ;
    let scoreStyle = scoreDepartStyle + this.totalExpAcquise;
    
    return scoreStyle;
});


// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Style", styleSchema);  