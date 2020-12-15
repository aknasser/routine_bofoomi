const mongoose = require("mongoose");

const {Schema} = mongoose;

const aspirationArtSchema = new Schema(
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
        bonusAction: {
            type: String,
            required: true
        },
        multiplicateurArts:{
            type: Number,
            required: true
        },
        multiplicateurCulture:{
            type: Number,
            required: true
        },
        multiplicateurExpressivite:{
            type: Number,
            required: true
        }

    }
);


module.exports = mongoose.model("AspirationArt", aspirationArtSchema);  