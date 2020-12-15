const mongoose = require("mongoose");

const {Schema} = mongoose;

const artsVisuelsSchema = new Schema(
    {
        item: [{                           
            type: String
        }]
    }

);





// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("artsVisuels", artsVisuelsSchema);  