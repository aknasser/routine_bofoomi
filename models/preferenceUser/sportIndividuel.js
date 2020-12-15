const mongoose = require("mongoose");

const {Schema} = mongoose;

const sportIndivSchema = new Schema(
    {
        item: [{                           //SOUS-CATEGORIE: PUISSANCE
            type: String
        }]
    }

);



// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("sportIndiv", sportIndivSchema);  