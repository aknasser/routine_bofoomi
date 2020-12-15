// AVEC CE FICHIER NOUS REMPLISSONS LES SPORTS, DISCIPLINES ET ARTS FAVORIS DE L'USER


const mongoose = require("mongoose");


// POUR LA VUE START-BODY
const sportCo = require("./sportCollectif")
const sportIndiv = require("./sportIndividuel"); 

// POUR LA VUE START-ART
const musique = require("./musique");
const litterature = require("./litterature");
const artsvisuels = require("./artsvisuels");
const artsScene = require("./artsScene");
const videophoto = require("./videophoto");

// POUR LA VUE START-MIND
const caractere = require("./caractere");
const artisanat = require("./artisanat");
const sciencePure = require("./sciencePure");
const scienceSociale = require("./scienceSociale");



mongoose.connect(
    "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES

//SPORT CO


sportCo.remove({})
    .then(() => {
       return sportCo.create({
            item:["Aviron", "Baseball", "Basketball", "Beach Soccer", "Beach volley", "Cheerleading", "Cricket", "Curling", "Football", "Football américain", "Futsal", "Handball", "Hockey sur gazon", "Hockey sur glace", "Pelote basque", "Rugby", "Tennis", "Ultimate frisbee", "Voile", "Volley ball", "Water polo"
                ]
        })
    });



    
//SPORT INDIV

sportIndiv.remove({})
    .then(() => {
        return sportIndiv.create({
            item:["Alpinisme", "Apnée", "Athlétisme", "Aviron", "Badminton", "Biathlon", "BMX", "Boxe anglaise", "Boxe chinoise","Boxe française", "Boxe thaï", "Canoë kayak", "Capoeira", "Course à pied", "Crossfit", "Cyclisme sur piste", "Cyclisme sur Route", "VTT", "Escalade", "Fitness", "Full contact", "Gymnastique", "Jiu-jitsu brésilien", 
            "Karaté", "Kick boxing", "Krav maga", "MMA", "Musculation/Aérobic", "Nage en eau libre",
            "Natation", "Parkour", "Patinage artistique", "Pole dance", "Randonnée", "Roller", "Sambo", "Squash", "Taekwondo", "Tennis", "Tennis de table", "Trail running", "Triathlon", "Yoga"
                ]
        })
    });
 
//MUSIQUE

musique.remove({})
    .then(() => {
       return musique.create({
        item:["Basse", "Batterie", "Chant", "Clarinette", "Contrebasse", "Flûte", "Guitare", "Piano", "Saxophone", "Trompette", "Violon"]
        })
    });

//LITTERATURE

litterature.remove({})
    .then(() => {
       return litterature.create({
        item:["Nouvelle", "Roman", "Poésie", "Pièce de théâtre"]
        })
    });



//ARTS VISUELS

artsvisuels.remove({})
    .then(() => {
       return artsvisuels.create({
            item:["Peinture", "Dessin", "Sculpture", "BD", "Web Design"]
        })
    });




//ARTS SCENIQUE

artsScene.remove({})
    .then(() => {
       return artsScene.create({
            item:["Cirque", "Danse", "Théâtre"]
        })
    });


//VIDEO PHOTO
    
videophoto.remove({})
    .then(() => {
       return videophoto.create({
            item:["Montage Vidéo", "Photo"]
        })
    });    



//CARACTERE
    
caractere.remove({})
    .then(() => {
       return caractere.create({
            item:["Inspirant(e)", "Posé(e)/Cool", "Créatif", "Organisé(e)","Flexible","Résilient(e)","Déterminé(e)","Chaleureux/Amical"]
        })
    });    


//ARTISANAT
    
artisanat.remove({})
.then(() => {
   return artisanat.create({
        item:["boucher-charcutier", "boulanger-pâtissier", "chocolatier-confiseur", "coiffeur", "cordonnier", "designer de mode",
         "ébéniste", "éléctricien", "esthéticienne", "fleuriste", "fromager", "graveur",
         "horloger", "maçon", "menuisier", "plombier", "poissonnier", "sculpteur"]
    })
});






//SCIENCES PURES
    
sciencePure.remove({})
    .then(() => {
       return sciencePure.create({
            item:["Astronomie", "Biologie", "Botanique", "Chimie", "Climatologie",  "Géologie", "Informatique", "Ingénierie", "Mathématiques", "Médecine", "Optique", "Physique", "Sismologie"]
        })
    });    



// SCIENCES SOCIALES
    
scienceSociale.remove({})
.then(() => {
   return scienceSociale.create({
        item:["Administration", "Anthropologie", "Commerce/Vente", "Comptabilité", "Droit", "Economie", "Education", "Finance", "Histoire", "Géographie", "Marketing", "Management", "Philosophie", "Psychologie", "Sociologie", "Sciences Politiques"]
    })
});    


