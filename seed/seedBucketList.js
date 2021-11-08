// AVEC CE FICHIER NOUS REMPLISSONS LES ROUTINES
// ALIMENTER LES OBJECTIFS AVEC seedobjectifs.js avant d'utiliser ce seed.
// A terme penser à les fusionner ensemble

const mongoose = require("mongoose");
const bucketList = require("../models/bucketList");
const BucketList = require("../models/bucketList");


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES



//L'ALIMENTATION DE LA COLLECTION "bucketLists" commence ici.


const alimentation = async() => {
    const clean = await BucketList.deleteMany({}) 
    
    // QUELQUES BETTER MAN HISTOIRE DE CHARGER LA BDD (le restera sera rempli via l'espace admin, faut pas déconner)
        const cocktail = await BucketList.create({                                             
            title:"Apprendre à Faire 3 Cocktails",
            steps: ["Choper un shaker", "Récupérer les liqueurs", "Trouver des vidéos pertinentes", "Réussir le Mojito", "Réussir la Caipi", "Réussir la Margarita"],
            category: "cooking"
        }); 

        const react = await BucketList.create({                                             
            title:"Maîtriser les bases de React",
            steps: ["Refaire une passe sur le JS", "Refaire une passe sur le HTML/CSS","Acquérir le bouquin 'Start with React'", "Potasser le Bouquin", "Incorporer React à Bofoomi"],
            category: "esprit"
        });
        
        const veggie = await BucketList.create({                                             
            title:"Adopter une alimentation veggie",
            steps: ["Trouver un bon marché", "Choper un bon bouquin / site de recettes veggie", "faire un jour veggie / semaine pendant 1 mois", "tester 5 nouvelles recettes 100% veggie"],
            category: "cooking"
        }); 


        const natation = await BucketList.create({                                             
            title:"Maîtriser les bases du crawl",
            steps: ["Trouver une piscine à moins de 5Km du domicile", "Vaincre sa peur de l'eau en se laissant couler", "prendre des leçons de natation", "réussir à faire 10 longueur en moins d'une heure", "nager en eau libre"],
            category: "corps"
        }); 

        const strumming = await BucketList.create({                                             
            title:"Connaître les principaux rythms patterns(guitare)",
            steps: ["apprendre les bases de la rythmique (4/4 tempo, 6/8, 3/4, etc)","trouver une bibliothèque de rythmique","maîtriser les 5 patterns les plus connus","apprendre des patterns originaux (hors 4/4 tempo)", "les utiliser pour interpréter un morceau de son choix"],
            category: "arts"
        }); 
    

                       
};

alimentation()                  // ON APPELLE LA FONCTION ASYNCHRONE POUR ALIMENTER LA BDD

