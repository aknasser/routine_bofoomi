// AVEC CE FICHIER NOUS REMPLISSONS LES ASPIRATIONS

const mongoose = require("mongoose");
const Objectif = require("../models/objectif");
const Routine = require("../models/routine");

let all_objectif;
let all_routine;



mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


// ON CALE TOUS LES OBJECTIFS DANS LA VARIABLE all_objectif ET LES ROUTINES DANS LA VARIABLE all_routine
Objectif.find({})
    .then(lesObjectifs => {
        all_objectif = lesObjectifs;
        console.log(all_objectif[1]);
    })
    .then(() => {
        return Routine.find({})
    .then(lesRoutines => {
            all_routine = lesRoutines;
            console.log(all_routine[1]);
        });
    })
    .then(() => {
        for (let i = 0; i < all_objectif.length; i++) {
            for (let j = 0; j < all_routine.length; j++) {
                if (all_objectif[i].code_goal === all_routine[j].code_goal) {
                    all_objectif[i].routine.push(all_routine[j]);
                    console.log(`${all_objectif[i].title}.Nouvelle routine intégrée :${all_objectif[i].routine}`);
                    all_objectif[i].save();
                }
            }
        }
    })

// ON CALE TOUS LES ROUTINES DANS LA VARIABLE all_routine



