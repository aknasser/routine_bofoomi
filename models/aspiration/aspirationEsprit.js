const mongoose = require("mongoose");

const {Schema} = mongoose;

const aspirationEspritSchema = new Schema(
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
        multiplicateurHardSkills:{
            type: Number,
            required: true
        },
        multiplicateurSoul:{
            type: Number,
            required: true
        },
        multiplicateurCrafty:{
            type: Number,
            required: true
        }

    }
);


module.exports = mongoose.model("AspirationEsprit", aspirationEspritSchema);  