const mongoose = require("mongoose");
const User = require("./models/user");     // ON Le CONNECTE AU MODEL 
const Corps = require("./models/corps");
const Esprit = require("./models/esprit");
const Social = require("./models/social");
const Arts = require("./models/arts");
const Style = require("./models/style");
const Cooking = require("./models/cooking"); 


mongoose.connect(
    "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


// Les variables de tests

testUser;
testCorps;
testEsprit;
testSocial;
testArts;
testStyle;
testCooking;

User.create({
    prenom: "Primo",
    nom: "Testeur",
    email: "primotesteur@gmail.com",
    age: 25,
    ville: "Try City",
    superpouvoir: "Tester les applications à répétition",
    couleur: "#FFFFF",
})
.then(user => console.log(user))
.catch(error => console.log(error.message))

User.findOne({
    email: "primotesteur@gmail.com"
})
    .then(user =>{
        testUser = user
    })
    .then(()=>{
        return Corps.create({
            course: 0,
            puissance: 0,
            etirement: 0,
            dos: 0,
            eau: 0,
            constipation: 0,
            recuperation: 0,
            checkup: 0,
            sportFavori: "Foot",
            sportProgression: "Handball",
            zoneDeBlessure: "Genou",
            loveBody: 0,
            scoreCorps: 0 
        })
    })
    .then(corps => {
        testCorps = corps;
        console.log(corps);
    })
    .then(()=> {
        testUser.corps.push(testCorps);
        testUser.save();
    })
    .then(()=>{
        return User.populate(testUser, "corps");
    })
    .then(user => {
        console.log(user);
    });

Esprit.create({
    contenuPedago: 0,
    event: 0,
    meditation: 0,
    logPerso: 0,
    balade: 0,
    leBilan: 0,
    caractere: "Faible",
    hardSkills: "None",
    mantra: "La loose toujours",
    scoreEsprit: 0
})
.then(esprit => console.log(esprit))
.catch(error => console.log(error.message));


Social.create({
    frequenceAmi: 0,
    connaissances: 0,
    sorties: 0,
    eventPro: 0,
    miseEnRelation: 0,
    elocution: 0,
    charismaGuy: "Norbert de la compta",
    scoreSocial: 0
})
.then(social => console.log(social))
.catch(error => console.log(error.message));


Arts.create({
    lecture: 0,
    expo: 0,
    cinema: 0,
    activiteArtistique: 0,
    artPractice: "Peinture",
    artDesire: "None",
    scoreArts: 0
})
.then(arts => console.log(arts))
.catch(error => console.log(error.message));


Style.create({
    deco: 0,
    newDeco: 0,
    menage: 0,
    vetements: 0,
    style: 0,
    accordStyle: 0,
    styleIdeal: "Normcore",
    vetementDesire: "None",
    scoreStyle: 0
})
.then(style => console.log(style))
.catch(error => console.log(error.message));


Cooking.create({
    healtyFood: 0,
    boucher: 0,
    legumes: 0,
    homeCooking: 0,
    newRecipes: 0,
    accordStyle: 0,
    platFetiche: "None",
    scoreCooking: 0
})
.then(cooking => console.log(cooking))
.catch(error => console.log(error.message));