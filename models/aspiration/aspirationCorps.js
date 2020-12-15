const mongoose = require("mongoose");

const {Schema} = mongoose;

const aspirationCorpsSchema = new Schema(
    {
        titre: {
            type: String,
            required: true            
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        bonusNom: {
            type: String,
            required: true
        },      
        multiplicateurPuissance:{
            type: Number,
            required: true
        },
        multiplicateurTechnique:{
            type: Number,
            required: true
        },
        multiplicateurSouplesse:{
            type: Number,
            required: true
        },
        multiplicateurSante:{
            type: Number,
            required: true
        }

    }
);


module.exports = mongoose.model("AspirationCorps", aspirationCorpsSchema);  