
const mongoose = require("mongoose");
const Routine = require("../models/routine");
const Objectif = require("../models/objectif")
let lesObjs;
let lesRoutines;



mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


const getObjectifs = async() => {
    const allObjectifs = await Objectif.find({})
    return allObjectifs;
}

getObjectifs()
    .then(ensembleObj => {
        lesObjs = ensembleObj;

    });


const getRoutines = async() => {
        const allRoutines = await Routine.find({})
        return  allRoutines;
    }

getRoutines()
    .then(ensembleRoutines => {
        lesRoutines = ensembleRoutines;
    });

console.log(`Les objectifs : ${lesObjs}`)
console.log(`Les routines : ${lesRoutines}`)
