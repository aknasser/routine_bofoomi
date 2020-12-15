const mongoose = require("mongoose");

const {Schema} = mongoose;

const aspirationStyleSchema = new Schema(
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
        multiplicateurOriginal:{
            type: Number,
            required: true
        },
        multiplicateurElegance:{
            type: Number,
            required: true
        },
        multiplicateurBasic:{
            type: Number,
            required: true
        }

    }
);


module.exports = mongoose.model("AspirationStyle", aspirationStyleSchema);  