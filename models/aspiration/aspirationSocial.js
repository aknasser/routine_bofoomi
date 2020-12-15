const mongoose = require("mongoose");

const {Schema} = mongoose;

const aspirationSocialSchema = new Schema(
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
        multiplicateurCharisma:{
            type: Number,
            required: true
        },
        multiplicateurPotes:{
            type: Number,
            required: true
        },
        multiplicateurAventure:{
            type: Number,
            required: true
        }

    }
);


module.exports = mongoose.model("AspirationSocial", aspirationSocialSchema);  