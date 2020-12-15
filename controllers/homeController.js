
//MODELS POUR LA LISTE DS DANS START-BODY

const sportCo = require("../models/preferenceUser/sportCollectif");
const sportIndiv = require("../models/preferenceUser/sportIndividuel");

//MODELS POUR LA LISTE DS DANS START-MIND
const caractere = require("../models/preferenceUser/caractere");
const artisanat = require("../models/preferenceUser/artisanat");
const sciencePure = require("../models/preferenceUser/sciencePure");
const scienceSociale = require("../models/preferenceUser/scienceSociale");

//MODELS POUR LA LISTE DS DANS START-ART
const musique = require("../models/preferenceUser/musique");
const litterature = require("../models/preferenceUser/litterature");
const artsVisuels = require("../models/preferenceUser/artsvisuels");
const artsScene = require("../models/preferenceUser/artsScene");
const videoPhoto = require("../models/preferenceUser/videophoto");



// LES VARIABLES POUR LES ACTIVITES FAVORITES

let sportCoFavorite;
let sportIndivFavorite;

let caractereFavori;
let artisanatFavori;
let sciencePureFavori;
let scienceSocialeFavori;

let musiqueFavori;
let litteratureFavori;
let artsVisuelsFavori;
let artsSceneFavori;
let videoPhotoFavori;

module.exports = {
    home : (req, res) => {
        res.render("index");
    },
    concept:(req, res) => {
        res.render("concept");
    },
    startQuizz:(req, res) => {
        res.render("start");
    },



// LES ACTIONS DEDIEES AU QUESTIONNAIRE (GET)


    sportList: (req, res, next) => {
        sportCo.findOne()
            .then(sportCollectif => {
                sportCoFavorite = sportCollectif.item;
                console.log(sportCoFavorite);
                console.log(sportCoFavorite.length);
                res.locals.sportCo = sportCoFavorite;
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });  
            
            
        sportIndiv.findOne()
            .then(sportIndividuel => {
                sportIndivFavorite = sportIndividuel.item;
                console.log(sportIndivFavorite);
                console.log(sportIndivFavorite.length);
                res.locals.sportIndiv = sportIndivFavorite;
                next();
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });   
    },


    bodyQuizz:(req, res) => {
        res.render("start-body", {
            id : req.params.id
        });

    },

    disciplineList: (req, res, next) => {
        caractere.findOne()
            .then(caractere => {
                caractereFavori = caractere.item;
                console.log(caractereFavori);
                console.log(caractereFavori.length);
                res.locals.caractere = caractereFavori;
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });  
            
            
        artisanat.findOne()
            .then(artisanat => {
                artisanatFavori = artisanat.item;
                console.log(artisanatFavori);
                console.log(artisanatFavori.length);
                res.locals.artisanat = artisanatFavori;
                
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });   
            sciencePure.findOne()
            .then(sciencePure => {
                sciencePureFavori = sciencePure.item;
                console.log(sciencePureFavori);
                console.log(sciencePureFavori.length);
                res.locals.sciencePure = sciencePureFavori;
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });  
            
            
        scienceSociale.findOne()
            .then(scienceSociale => {
                scienceSocialeFavori = scienceSociale.item;
                console.log(scienceSocialeFavori);
                console.log(scienceSocialeFavori.length);
                res.locals.scienceSociale = scienceSocialeFavori;
                next();
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });   

    },


    mindQuizz:(req, res) => {
        res.render("start-mind", {
            id : req.params.id
        });
    },
    socialQuizz:(req, res) => {
        res.render("start-social", {
            id : req.params.id
        });
    },


// POUR LE MENU DEROULANT (CHOIX ART FAVORI)
    artList: (req, res, next) => {
        musique.findOne()
            .then(musique => {
                musiqueFavori = musique.item;
                console.log(musiqueFavori);
                console.log(musiqueFavori.length);
                res.locals.musique = musiqueFavori;
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });  
            
            
        litterature.findOne()
            .then(litterature => {
                litteratureFavori = litterature.item;
                console.log(litteratureFavori);
                console.log(litteratureFavori.length);
                res.locals.litterature = litteratureFavori;
                
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });   

        artsVisuels.findOne()
            .then(artsVisuels => {
                artsVisuelsFavori = artsVisuels.item;
                console.log(artsVisuelsFavori);
                console.log(artsVisuelsFavori.length);
                res.locals.artsVisuels = artsVisuelsFavori;
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });  
            
            
        artsScene.findOne()
            .then(artsScene => {
                artsSceneFavori = artsScene.item;
                console.log(artsSceneFavori);
                console.log(artsSceneFavori.length);
                res.locals.artsScene = artsSceneFavori;
                
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });   

        videoPhoto.findOne()
            .then(videoPhoto => {
                videoPhotoFavori = videoPhoto.item;
                console.log(videoPhotoFavori);
                console.log(videoPhotoFavori.length);
                res.locals.videoPhoto = videoPhotoFavori;
                next();
            })
            .catch(error => {                      // En cas de pépin...
                console.log(`Erreur lors du fetch de la collection users: ${error.message}`)
                next(error);
            });               

    },


    artsQuizz:(req, res) => {
        res.render("start-arts", {
            id : req.params.id
        });
    },
    practicalQuizz:(req, res) => {
        res.render("start-style", {
            id : req.params.id
        });
    },
    cookingQuizz:(req, res) => {
        res.render("start-cooking", {
            id : req.params.id
        });
    }

    // LES ACTIONS POUR L'USER
};