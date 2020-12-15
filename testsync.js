// Avec ce test nous checkons la bonne association des models entre eux. 
// En particulier leur connection à l'user model.


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


// Les variables de tests   .load testsync.js

let testUser;
let testCorps;
let testEsprit;
let testSocial;
let testArts;
let testStyle;
let testCooking;

User.remove({})
    .then(()=>{
        return Corps.remove({});               // A chaque chargement du fichier nous vidons les collections aux models
    })
    .then(() => {
        return Esprit.remove({});
    })
    .then(() => {
        return Social.remove({});
    })
    .then(() => {
        return Arts.remove({});
    })
    .then(() => {
        return Style.remove({});
    })
    .then(() => {
        return Cooking.remove({});
    })
    .then(()=> {
        return User.create({                // CREATION DE L'USER TEST
            prenom: "Tercio",
            nom: "Testeur",
            email: "testeurtesteur7@gmail.com",
            age: 25,
            ville: "Try2 City",
            superpouvoir: "Tester les applications à répétition again",
            couleur: "#FFFFF",
        })
    })
    .catch(error => console.log(error.message))

    .then(() => {
        return User.findOne({                   // 1- NOUS TROUVONS L'USER TEST VIA SON EMAIL
        email: "testeurtesteur7@gmail.com"
        });
    })
    .then(user => {             // 2 - NOUS LE CALONS DANS L'OBJET testUser
        testUser = user;
        console.log(testUser);
    })
    .then(() =>{                    // CREATION D'UN OBJET 
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
        });
    })
    .then(vitalite => {                     // INCORPORATION DE L'OBJET DANS LE MODEL USER (via association)
        testCorps = vitalite;
        testUser.corps = testCorps;
    })
    .then(()=> {
        return Esprit.create({
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
        });
    })
    .then(spirit => {
        testEsprit = spirit;
        testUser.esprit = testEsprit;
    })
    .then(() =>{
        return Social.create({
            frequenceAmi: 0,
            connaissances: 0,
            sorties: 0,
            eventPro: 0,
            miseEnRelation: 0,
            elocution: 0,
            charismaGuy: "Norbert de la compta",
            scoreSocial: 0
        });
    })
    .then(soft => {
        testSocial = soft;
        testUser.social = testSocial;
    })
    .then(()=> {
        return Arts.create({
            lecture: 0,
            expo: 0,
            cinema: 0,
            activiteArtistique: 0,
            artPractice: "Peinture",
            artDesire: "None",
            scoreArts: 0
        });
    })
    .then(arty => {
        testArts = arty;
        testUser.arts = testArts;
    })
    .then(() => {
        return Style.create({
            deco: 0,
            newDeco: 0,
            menage: 0,
            vetements: 0,
            style: 0,
            accordStyle: 0,
            styleIdeal: "Normcore",
            vetementDesire: "None",
            scoreStyle: 0
        });
    })
    .then(look => {
        testStyle = look;;
        testUser.style = testStyle;
    })
    .then(() => {
        return Cooking.create({
            healtyFood: 0,
            boucher: 0,
            legumes: 0,
            homeCooking: 0,
            newRecipes: 0,
            accordStyle: 0,
            platFetiche: "None",
            scoreCooking: 0
        });
    })
    .then(cuisine => {
        testCooking = cuisine;
        testUser.cooking = testCooking;
        testUser.save();
    })
    .then(()=> {                                    //UTILISATION DE POPULATE 
        return User.populate(testUser, "corps")      
    })
    .then(()=> {
        return User.populate(testUser, "esprit")      
    })
    .then(()=> {
        return User.populate(testUser, "social")      
    })
    .then(()=> {
        return User.populate(testUser, "arts")      
    })
    .then(()=> {
        return User.populate(testUser, "style")      
    })
    .then(()=> {
        return User.populate(testUser, "cooking")      
    })
    .then(() => console.log(testUser));





    
    
    