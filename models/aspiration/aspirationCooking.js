const mongoose = require("mongoose");

const {Schema} = mongoose;

const aspirationCookingSchema = new Schema(
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
        multiplicateurDecouverte:{
            type: Number,
            required: true
        },
        multiplicateurClassic:{
            type: Number,
            required: true
        },
        multiplicateurHealthy:{
            type: Number,
            required: true
        },
        multiplicateurPlaisir:{
            type: Number,
            required: true
        }
    }
);


module.exports = mongoose.model("AspirationCooking", aspirationCookingSchema);  