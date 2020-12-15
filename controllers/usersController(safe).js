const User = require("../models/user");
const mongoose = require("mongoose");

// LES MODELS NECESSAIRES POUR OBTENIR UN PROFIL COMPLET

const Corps = require("../models/corps")
const Esprit = require("../models/esprit");
const Social = require ("../models/social");
const Arts = require ("../models/arts");
const Style = require ("../models/style");
const Cooking = require ("../models/cooking");


// LES MODELS ASPIRATIONS NECESSAIRES

const AspirationCorps = require("../models/aspiration/aspirationCorps");
const AspirationEsprit = require("../models/aspiration/aspirationEsprit");
const AspirationSocial = require("../models/aspiration/aspirationSocial");
const AspirationArts = require("../models/aspiration/aspirationArt");
const AspirationStyle = require("../models/aspiration/aspirationStyle");
const AspirationCooking = require("../models/aspiration/aspirationCooking");



// LES MODELS ACTIVITES EN COURS NECESSAIRES (pour ajouter les premières activités pour chaque catégorie)

const ActiviteCorps = require("../models/activites/activiteCorps");
const ActiviteEsprit = require("../models/activites/activiteEsprit");
const ActiviteSocial = require("../models/activites/activiteSocial");
const ActiviteArts = require("../models/activites/activiteArts");
const ActiviteStyle = require("../models/activites/activiteStyle");
const ActiviteCooking = require("../models/activites/activiteCooking");

// LES MODELS ACTIVITES NECESSAIRES (pour ajouter les premières activités pour chaque catégorie)

const ActivitesPasseesCorps = require("../models/activitesPassees/activitesPasseesCorps");
const ActivitesPasseesEsprit = require("../models/activitesPassees/activitesPasseesEsprit");
const ActivitesPasseesSocial = require("../models/activitesPassees/activitesPasseesSocial");
const ActivitesPasseesArts = require("../models/activitesPassees/activitesPasseesArts");
const ActivitesPasseesStyle = require("../models/activitesPassees/activitesPasseesStyle");
const ActivitesPasseesCooking = require("../models/activitesPassees/activitesPasseesCooking");


// LES AUTRES VARIABLES UTILES EN GLOBAL SCOPE

let categoriesPrincipales = ["Corps", "Esprit", "Social", "Arts", "Style", "Cooking"];




const passport = require("passport");
const user = require("../models/user");


// CES VARIABLES SONT UTILISES POUR CALER LES DATAS POSTES DANS UN OBJET PUIS L'INTEGRER DANS L'USER DANS LA FB

let newUser;
let newUserCorps;                               
let newUserEsprit;
let newUserSocial;
let newUserArts;
let newUserStyle;
let newUserCooking;

// LES VARIABLES UTILISES POUR LES CALER ET EXPLOITER LES DATAS DES PREMIERES ACTIVITES DE L'USER

let firstactiviteCorps;
let firstactiviteEsprit;
let firstactiviteSocial;
let firstactiviteArts;
let firstactiviteStyle;
let firstactiviteCooking;






const userParams = (body) => {
    return {
        prenom: body.prenom,
        nom: body.nom,
        email: body.email,
        password: body.password,
        age: body.age,
        ville: body.ville,
        superpouvoir: body.superpouvoir,
        couleur: body.couleur
    };
};



module.exports = {

//CREATE (C du CRUD)


    create: (req, res, next) => {
        newUser = new User(userParams(req.body));       // LE MODEL "USER" NOUS SERT DE CONSTRUCTOR.
        User.register(newUser, req.body.password, (error, user) => {
            if(user) {
                res.locals.redirect = `/start-body/${user._id}`;    // Pour passer la variable _id dans la barre URL elle nous servira à identifier l'user tout le long du formulaire
                next();
            } else {
                res.locals.redirect = "/";
                console.log(error.message);
                next();
            }
        });
    },


// LE CORPS


    createBody: (req, res, next) => {
        const userId = req.body.id;             // LE BON ID EST DETECTE :D
        User.findById(userId)
        .then(user => {
            newUser = user;
        })
        .then(()=> {
            return Corps.create({
                course: req.body.course,
                puissance: req.body.puissance,
                gradePuissance: req.body.gradePuissance,
                technique: req.body.technique,
                techniqueOuPuissance: req.body.techniqueOuPuissance,
                adresse: req.body.adresse,
                souplesse: req.body.souplesse,
                etirement: req.body.etirement,
                gradeSouplesse: req.body.etirement,
                dos: req.body.dos,
                eau: req.body.eau,
                constipation: req.body.constipation,
                recuperation: req.body.recuperation,
                sportFavori1: req.body.sportFavori1,
                sportFavori2: req.body.sportFavori2,
                zoneDeBlessure: req.body.zoneDeBlessure,
                loveBody: req.body.loveBody,
                aspirationCorps: req.body.aspirationCorps,
                totalExpAcquise: 0,                                             // Au début nous considérons qu'expérience acquise est égale à 0, ceci permet d'éviter undefined sur la page hero lors de la première connexion
                puissanceExpAcquise: 0,
                techniqueExpAcquise: 0,
                souplesseExpAcquise:0,
                santeExpAcquise:0
            });                                                 // Dans la partie READ par la suite ne pas oublier de caler une partie pour calculer le scoremoyen
        })
        .then(vitalite => {
            newUserCorps = vitalite;
            newUser.corps = newUserCorps;
            console.log(newUser);
            console.log(newUser.corps);
            console.log(newUser.corps.scoreCorps)
            newUser.save();                                 // POUR SAUVEGARDER LES NOUVELLES DATAS DANS L'USER. 
            res.locals.redirect = `/start-mind/${userId}`;   // Pour rediriger vers la page suivante 
            next();  
        });
    },


// L'ESPRIT
    createMind: (req, res, next) => {
        const userId = req.body.id;             // LE BON ID EST DETECTE :D
        User.findById(userId)
        .then(user => {
            newUser = user;
        })
        .then(()=> {
            return Esprit.create({
                contenuPedago: req.body.contenuPedago,
                event: req.body.event,
                meditation: req.body.meditation,
                logPerso: req.body.logPerso,
                leBilan: req.body.leBilan,
                bricolage: req.body.bricolage,
                manuel: req.body.manuel,
                caractere: req.body.caractere,
                discipline: req.body.discipline,
                aspirationEsprit: req.body.aspirationEsprit,
                totalExpAcquise: 0,                                             // Au début nous considérons qu'expérience acquise est égale à 0, ceci permet d'éviter undefined sur la page hero lors de la première connexion
                hardsSkillsExpAcquise: 0,
                soulExpAcquise: 0,
                craftyExpAcquise: 0
            });                                                 // Dans la partie READ par la suite ne pas oublier de caler une partie pour calculer le scoremoyen
        })
        .then(mind => {
            newUserEsprit = mind;
            newUser.esprit = newUserEsprit;
            console.log(newUser);
            console.log(newUser.Esprit);
            newUser.save();                                 // POUR SAUVEGARDER LES NOUVELLES DATAS DANS L'USER. LE FAIRE TOUJOURS AVANT POPULATE
            res.locals.redirect = `/start-social/${userId}`;   // Pour rediriger vers la page suivante
            next();    
        });
    },
    
// SOCIAL
    createSocial: (req, res, next) => {
        const userId = req.body.id;             // LE BON ID EST DETECTE :D
        User.findById(userId)
        .then(user => {
            newUser = user;
        })
        .then(()=> {
            return Social.create({
                frequenceAmi: req.body.frequenceAmi,
                connaissances: req.body.connaissances,
                sorties: req.body.sorties,
                escapade: req.body.escapade,
                adrenaline: req.body.adrenaline,
                speaker: req.body.speaker,
                elocution: req.body.elocution,
                charismaGuy: req.body.charismaGuy,
                aspirationSocial: req.body.aspirationSocial,
                totalExpAcquise: 0,                                             // Au début nous considérons qu'expérience acquise est égale à 0, ceci permet d'éviter undefined sur la page hero lors de la première connexion
                potesExpAcquise: 0,
                aventureExpAcquise: 0,
                charismaExpAcquise: 0
            });                                                 // Dans la partie READ par la suite ne pas oublier de caler une partie pour calculer le scoremoyen
        })
        .then(softSkills => {
            newUserSocial = softSkills;
            newUser.social = newUserSocial;
            console.log(newUser);
            console.log(newUser.social);
            newUser.save();                                 // POUR SAUVEGARDER LES NOUVELLES DATAS DANS L'USER. LE FAIRE TOUJOURS AVANT POPULATE
            res.locals.redirect = `/start-arts/${userId}`;   // Pour rediriger vers la page suivante
            next();    
        });

    },

// ARTS
    createArts: (req, res, next) => {
        const userId = req.body.id;             // LE BON ID EST DETECTE :D
        User.findById(userId)
        .then(user => {
            newUser = user;
        })
        .then(()=> {
            return Arts.create({
                lecture: req.body.lecture,
                expo: req.body.expo,
                cinema: req.body.cinema,
                activiteArtistique: req.body.activiteArtistique,
                plaisirArts: req.body.plaisirArts,
                moment: req.body.moment,
                showman: req.body.showman,
                artFavori1: req.body.artFavori1,
                artFavori2: req.body.artFavori2,
                aspirationArts: req.body.aspirationArts,
                totalExpAcquise: 0,                                             // Au début nous considérons qu'expérience acquise est égale à 0, ceci permet d'éviter undefined sur la page hero lors de la première connexion
                practiceExpAcquise: 0,
                cultureExpAcquise: 0,
                expressiviteExpAcquise: 0
            });                                                 // Dans la partie READ par la suite ne pas oublier de caler une partie pour calculer le scoremoyen
        })
        .then(arts => {
            newUserArts = arts;
            newUser.arts = newUserArts;
            console.log(newUser);
            console.log(newUser.arts);
            newUser.save();                                 // POUR SAUVEGARDER LES NOUVELLES DATAS DANS L'USER. LE FAIRE TOUJOURS AVANT POPULATE
            res.locals.redirect = `/start-style/${userId}`;   // Pour rediriger vers la page suivante
            next();    
        });
    },

// STYLE
    createStyle: (req, res, next) => {
        const userId = req.body.id;             // LE BON ID EST DETECTE :D
        User.findById(userId)
        .then(user => {
            newUser = user;
        })
        .then(()=> {
            return Style.create({
                vetements: req.body.vetements,
                colorful: req.body.colorful,
                classy: req.body.classy,
                simple: req.body.simple,
                style: req.body.style,
                accordStyle: req.body.accordStyle,
                styleIdeal: req.body.styleIdeal,
                vetementDesire: req.body.vetementDesire,
                aspirationStyle: req.body.aspirationStyle,
                totalExpAcquise: 0,                                             // Au début nous considérons qu'expérience acquise est égale à 0, ceci permet d'éviter undefined sur la page hero lors de la première connexion
                colorfulExpAcquise: 0,
                classyExpAcquise: 0,
                simpleExpAcquise: 0
            });                                                 // Dans la partie READ par la suite ne pas oublier de caler une partie pour calculer le scoremoyen
        })
        .then(elegance => {
            newUserStyle = elegance;
            newUser.style = newUserStyle;
            console.log(newUser);
            console.log(newUser.style);
            newUser.save();                                 // POUR SAUVEGARDER LES NOUVELLES DATAS DANS L'USER. LE FAIRE TOUJOURS AVANT POPULATE
            res.locals.redirect = `/start-cooking/${userId}`;   // Pour rediriger vers la page suivante
            next();    
        });
    },

// COOKING
    createCooking: (req, res, next) => {
        const userId = req.body.id;             // LE BON ID EST DETECTE :D
        User.findById(userId)
        .then(user => {
            newUser = user;
        })
        .then(()=> {
            return Cooking.create({
                healthyFood: req.body.healthyFood,
                boucher: req.body.boucher,
                legumes: req.body.legumes,
                homeCooking: req.body.homeCooking,
                newRecipes: req.body.newRecipes,
                gourmand: req.body.gourmand,
                platFetiche: req.body.platFetiche,
                aspirationCooking: req.body.aspirationCooking,
                totalExpAcquise: 0,                                             // Au début nous considérons qu'expérience acquise est égale à 0, ceci permet d'éviter undefined sur la page hero lors de la première connexion
                healthyExpAcquise: 0,
                classicExpAcquise: 0,
                decouverteExpAcquise: 0,
                plaisirExpAcquise: 0
            });                                                 // Dans la partie READ par la suite ne pas oublier de caler une partie pour calculer le scoremoyen
        })
        .then(bouffe => {
            newUserCooking = bouffe;
            newUser.cooking = newUserCooking;
            console.log(newUser);
            console.log(`gourmandise: ${newUser.cooking.gourmand}`);

                        
        })
    // 1ERE ACTIVITE CORPS
        .then(() => {
            return ActiviteCorps.count()
        })
        .then(nmbrEntrees => {
            let random = Math.floor(Math.random() * nmbrEntrees);
            return ActiviteCorps.findOne().skip(random);
        })
        .then (activiteCorps => {
            firstactiviteCorps = activiteCorps;
            console.log(`1ère activité Corps:${firstactiviteCorps}`);
            newUser.activitesCorps = firstactiviteCorps;                                    
        })                                                                // UPDATE: Push non nécessaire désormais. activiteCorps n'est PLUS un ARRAY !!!!
    // 1ERE ACTIVITE ESPRIT
        .then(() => {
            return ActiviteEsprit.count()
        })
        .then(nmbrEntrees => {
            let random = Math.floor(Math.random() * nmbrEntrees);
            return ActiviteEsprit.findOne().skip(random);
        })
        .then (activiteEsprit => {
            firstactiviteEsprit = activiteEsprit;
            console.log(`1ère activité Esprit:${firstactiviteEsprit}`);
            newUser.activitesEsprit = firstactiviteEsprit;                                    
        })
    // 1ERE ACTIVITE SOCIAL
        .then(() => {
            return ActiviteSocial.count()
        })
        .then(nmbrEntrees => {
            let random = Math.floor(Math.random() * nmbrEntrees);
            return ActiviteSocial.findOne().skip(random);
        })
        .then (activiteSocial => {
            firstactiviteSocial = activiteSocial;
            console.log(`1ère activité Social:${firstactiviteSocial}`);
            newUser.activitesSocial = firstactiviteSocial;                                   
        })
    // 1ERE ACTIVITE ARTS
        .then(() => {
            return ActiviteArts.count()
        })
        .then(nmbrEntrees => {
            let random = Math.floor(Math.random() * nmbrEntrees);
            return ActiviteArts.findOne().skip(random);
        })
        .then (activiteArts => {
            firstactiviteArts = activiteArts;
            console.log(`1ère activité Arts:${firstactiviteArts}`);
            newUser.activitesArts = firstactiviteArts;                                   
        })
    // 1ERE ACTIVITE STYLE
        .then(() => {
            return ActiviteStyle.count()
        })
        .then(nmbrEntrees => {
            let random = Math.floor(Math.random() * nmbrEntrees);
            return ActiviteStyle.findOne().skip(random);
        })
        .then (activiteStyle => {
            firstactiviteStyle = activiteStyle;
            console.log(`1ère activité Style:${firstactiviteStyle}`);
            newUser.activitesStyle = firstactiviteStyle;                                    
        })
            // 1ERE ACTIVITE COOKING
        .then(() => {
            return ActiviteCooking.count()
        })
        .then(nmbrEntrees => {
            let random = Math.floor(Math.random() * nmbrEntrees);
            return ActiviteCooking.findOne().skip(random);
        })
        .then (activiteCooking => {
            firstactiviteCooking = activiteCooking;
            console.log(`1ère activité Cooking:${firstactiviteCooking}`);
            newUser.activitesCooking = firstactiviteCooking;                                    
            newUser.save();                                                                         // POUR SAUVEGARDER LES NOUVELLES DATAS DANS L'USER. LE FAIRE TOUJOURS AVANT POPULATE
            res.locals.redirect = `/users/results/${userId}`;                                   // Pour rediriger vers la page suivante
            next();
        })
    },



    redirectView : (req, res, next) => {                 // La CB function middleware pour créer la vue pour rediriger vers un chemin d'accès
        let redirectPath = res.locals.redirect;          // Dans les différentes parties du CRUD res.locals.redirect change en fonction des situations (loggin réussi/loggin échoué/ modif, etc...).
        if (redirectPath) {
            res.redirect(redirectPath);
        } else {
        next();                                         // Pour ne pas freezer en cas de redirection comme un con
        }
    },


    validate: (req, res, next) => {
        req
        .sanitizeBody("email")
        .normalizeEmail({              
            all_lowercase: true
        })                                              //Convertit tous les emails en lowercase et efface les espaces blancs avec trim
        .trim();
        req.check("email", "Email n'est pas au bon format").isEmail();                                  // Dans la requête, vérifie que la valeur pour "email" est au format email 
        req.check("password", "Le mot de passe ne peut pas être vide").notEmpty();                      // Dans la requête, vérifie que la valeur pour "email" n'est pas vide

        req.getValidationResult()                                   // Récolte les résultats des validations faites avant et retourne une promesse contenant les erreurs
            .then((error) => {
                if(!error.isEmpty()) {                              // if (!error.isEmpty) ===> si erreur n'est pas vide alors...
                    let messages = error.array().map(e => e.msg);
                    req.skip = true;                                   // Indique que nous allons sauter le prochain middleware dans la chaîne créer dans le main (voir router.post), à savoir usersController.create. Ceci évite donc de créer un user non valide
                    req.flash("error", messages.join(" and "));              // Chaque message d'erreur sera séparé par " and "
                    res.locals.redirect = "/start";
                    next();
                } else {
                    next();                                         // Sans message nous passons au prochain middleware prévu
                }
            });
    },

// READ (R DU CRUD)

    show: (req, res, next) => {
        let userId = req.params.id;
        console.log(`userId:${userId}`);
        let aspirationUserCorps;                // Ces variables vont nous servir pour caler les aspirations de l'user actuel et les identifiés
        let aspirationUserEsprit;
        let aspirationUserSocial;
        let aspirationUserArts;
        let aspirationUserStyle;
        let aspirationUserCooking;
 
        User.findById(userId).populate("corps esprit social arts style cooking")   // Grâce à Populate nous pouvons récupérer l'ensemble des données contenus dans les propriétés listés entre parenthèse
            .then(user => {
                res.locals.utilisateur = user;
                aspirationUserCorps = user.corps.aspirationCorps;
                aspirationUserEsprit = user.esprit.aspirationEsprit;
                aspirationUserSocial = user.social.aspirationSocial;
                aspirationUserArts = user.arts.aspirationArts;
                aspirationUserStyle= user.style.aspirationStyle;
                aspirationUserCooking = user.cooking.aspirationCooking;
            })
            .then(()=> {
                console.log(`aspirationcorps:${aspirationUserCorps}`);
                return AspirationCorps.findOne({titre:aspirationUserCorps})       // On identifie l'aspiration qui correspond à celle entrée par l'user durant le quizz
            })
            .then(objectif => {                                        // CE BLOC Sert à caler l'aspiration correcte dans une variable locale ici, objectifCorps
                res.locals.objectifCorps = objectif;
                console.log(`objectifCorps:${objectif}`);
            })
            .then(()=> {
                return AspirationEsprit.findOne({titre:aspirationUserEsprit})
            })
            .then(objectif => {
                res.locals.objectifEsprit = objectif;
            })
            .then(()=> {
                return AspirationSocial.findOne({titre:aspirationUserSocial})
            })
            .then(objectif => {
                res.locals.objectifSocial = objectif;
            })
            .then(()=> {
                return AspirationArts.findOne({titre:aspirationUserArts})
            })
            .then(objectif => {
                res.locals.objectifArts = objectif;
            })
            .then(()=> {
                return AspirationStyle.findOne({titre:aspirationUserStyle})
            })
            .then(objectif => {
                res.locals.objectifStyle = objectif;
            })
            .then(()=> {
                return AspirationCooking.findOne({titre:aspirationUserCooking})
            })
            .then(objectif => {
                res.locals.objectifCooking = objectif;
                console.log(`objectifCooking:${objectif}`);
                next();
            });

    },

    showView: (req, res) => {
        res.render("user/results", {
            id : req.params.id,
        })
    },
// PARTIE HERO
    hero: (req, res, next) => {                 
        let utilisateur = res.locals.currentUser;
        let aspirationUserCorps;                // Ces variables vont nous servir pour caler les aspirations de l'user actuel et les identifiés
        let aspirationUserEsprit;
        let aspirationUserSocial;
        let aspirationUserArts;
        let aspirationUserStyle;
        let aspirationUserCooking;
        User.findById(utilisateur.id).populate("corps esprit social arts style cooking activitesCorps activitesEsprit activitesSocial activitesArts activitesStyle activitesCooking activitesPasseesCorps activitesPasseesEsprit activitesPasseesSocial activitesPasseesArts activitesPasseesStyle activitesPasseesCooking")    //ON RECUPERE L'ID DU CurrentUser, pour rappel currentUser = User loggé ! (paramétré dans le main grâce à tonton passport). Grâce à cette id, on récupère l'ensemble de l'user que l'on populate.
            .then((user) => {
                res.locals.hero = user;    // L'User ainsi récupéré et ensuite placé dans la variable hero.
                aspirationUserCorps = user.corps.aspirationCorps;
                aspirationUserEsprit = user.esprit.aspirationEsprit;
                aspirationUserSocial = user.social.aspirationSocial;
                aspirationUserArts = user.arts.aspirationArts;
                aspirationUserStyle= user.style.aspirationStyle;
                aspirationUserCooking = user.cooking.aspirationCooking;
            })
            .then(()=> {
                return AspirationCorps.findOne({titre:aspirationUserCorps})       // On identifie l'aspiration qui correspond à celle entrée par l'user durant le quizz
            })
            .then(objectif => {                                        // CE BLOC Sert à caler l'aspiration correcte dans une variable locale ici, objectifCorps
                res.locals.objectifCorps = objectif;
            })
            .then(()=> {
                return AspirationEsprit.findOne({titre:aspirationUserEsprit})
            })
            .then(objectif => {
                res.locals.objectifEsprit = objectif;
            })
            .then(()=> {
                return AspirationSocial.findOne({titre:aspirationUserSocial})
            })
            .then(objectif => {
                res.locals.objectifSocial = objectif;
            })
            .then(()=> {
                return AspirationArts.findOne({titre:aspirationUserArts})
            })
            .then(objectif => {
                res.locals.objectifArts = objectif;
            })
            .then(()=> {
                return AspirationStyle.findOne({titre:aspirationUserStyle})
            })
            .then(objectif => {
                res.locals.objectifStyle = objectif;
            })
            .then(()=> {
                return AspirationCooking.findOne({titre:aspirationUserCooking})
            })
            .then(objectif => {
                res.locals.objectifCooking = objectif;
                next();
            });
                
        },


    heroView: (req, res) =>{
                res.locals.categoriePrincipales = categoriesPrincipales;  // On passe dans la vue heroView les 6 catégories nous sera utile pour retrouver les activités
                console.log(`Les categories principales:${categoriesPrincipales}`);                                                  // Permet de sauvegarder l'activité passées dans le model de l'user
                res.render("user/hero", {
                    layout:"layoutUser",
                })
                                       
    },

// AJOUT DE NOUVELLES ACTIVITES CORPS

    saveActivitiesCorps:(req, res, next) => {                                 // ACTION POUR SAUVEGARDER ACTIVITE DANS L'USER MODEL ET REDIRIGER VERS LE CHOXI DE NOUVELLE ACTIVITE
            let userActif;                          
            let userId = req.params.id;
            let categorieId;                                                        // Utile pour retrouver le document corps correspondant à l'user.
            let categorie = req.params.categorie;
            let activiteDone;   // Créer pour recevoir les valeurs de l'activitésPassées.

            User.findById(userId).populate("corps activitesCorps activitesPasseesCorps")
            .then(utilisateur => {                                              // 1 - Trouver l'utilisateur Actif
                userActif = utilisateur;
                console.log(`L'activité de l'user: ${userActif.activitesCorps}`);     // possibilité de variabiliser cela ? Cela nous évitera de le faire pour chaque skills. Utiliser categorie pour variabiliser serait pratique

                activiteDone = {                                               // 2 - Lui créer une nouvelle activite passees
                    titre: userActif.activitesCorps.titre,
                    description: userActif.activitesCorps.description,
                    categorie: userActif.activitesCorps.categorie,
                    sousCategorie:userActif.activitesCorps.sousCategorie,
                    pourcentagePuissance: userActif.activitesCorps.pourcentagePuissance,
                    pourcentageSouplesse: userActif.activitesCorps.pourcentageSouplesse,
                    pourcentageTechnique: userActif.activitesCorps.pourcentageTechnique,
                    pourcentageSante: userActif.activitesCorps.pourcentageSante,
                    totalPtsExp: userActif.activitesCorps.totalPtsExp,
                    noteObtenue: req.body.noteObtenue,
                    user: userActif._id                                   // AVEC cette dernière ligne on fait le join entre ActivitesPasseesCategorie et User. L'activité 
                };

                userActif.activitesPasseesCorps.push(activiteDone);           // 3-  PUSHER l'activite terminée DANS L'ARRAY ActivitesPasseesCategorie de l'user
                console.log(`Activite incorporé dans ActivitesPassees: ${userActif.activitesPasseesCorps[0]}`);

                
                let historiqueUser = userActif.activitesPasseesCorps;               // 4A - On place les activités Passées dans une variable pour une meilleure lisibilité
                let nmbreActivitesPassees = historiqueUser.length;                      //4B - On stocke la longueur de l'array activitésPasséesCategorie dans une variable pour plus de lisibilité
                let activiteAIntegrer = historiqueUser[nmbreActivitesPassees - 1];    // 4 - On récupère le dernier élément de l'array et on le cale dans une variable. (numéro index dernier élément =  length -1)


                let statsCorps = userActif.corps;
                let difficulteActivite = userActif.activitesCorps.difficulte;
                let coefficientDegradation = 1 * Math.pow(0.95, statsCorps.scoreCorps - 1);   // / 5 - On met à jour le score de l'user en utilisant notamment une SUITE GEOMETRIQUE DECROISSANTE. Un = U0 * q^n     SUITE GEOMETRIQUE DECROISSANTE avec n = score - 1 ; q 0.95 et U0 = 1  (plus d'explication en dessous), grâce au coefficient de degradation l'user a besoin de faire de plus en plus d'activités pour maintenir sa progression.

                console.log(`Ancien Score Corps:${statsCorps.scoreCorps}`);
                userActif.corps.totalExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation;
                userActif.corps.puissanceExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentagePuissance;
                userActif.corps.techniqueExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageSouplesse;
                userActif.corps.souplesseExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageTechnique;
                userActif.corps.santeExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageSante;
                console.log(`L'opération en détail: ${activiteAIntegrer.noteObtenue} * ${difficulteActivite} * ${coefficientDegradation}`);
               
               
                userActif.activitesCorps = undefined;             //6 - ON vide la key actvitesCorps en lui donnant la valeur undefined.
                console.log(`Activite en Cours(sense etre egal a 'undefined'):${userActif.activiteCorps}`);                       

                console.log(`Nouveau Score Corps:${userActif.corps.scoreCorps}`);
            })
            .then(() => {
                categorieId = userActif.corps._id;
                let newTotal = userActif.corps.totalExpAcquise;                       //On cale les nouveaux totaux d'exp acquise dans ces variables, on les utilisera pour updater l'user
                let newPuissance = userActif.corps.puissanceExpAcquise;
                let newTechnique =  userActif.corps.techniqueExpAcquise;
                let newSouplesse = userActif.corps.souplesseExpAcquise
                let newSante = userActif.corps.santeExpAcquise;


                return Corps.findByIdAndUpdate(categorieId,{                           // 7 - On sauvegarde l'entrée ainsi modifiée
                    totalExpAcquise : newTotal,
                    puissanceExpAcquise : newPuissance,
                    techniqueExpAcquise : newTechnique,
                    souplesseExpAcquise :  newSouplesse,
                    santeExpAcquise :  newSante
                })        
            })
            .then(() => {
                res.locals.hero = userActif;
                res.locals.redirect = `/users/newActivities/${userId}/${categorieId}/activiteCorps`;          // Ainsi l'user se retrouve dans la page newActivities relatives à sa catégorie
                userActif.save();                                                  // Permet de sauvegarder l'activité passées dans le model de l'user
                next();
            })                                                 


                                    

    },
    choixActivitiesCorpsView: (req, res) => {               //La Vue pour choisir les nouvelles activités
        userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.hero = user;
            res.render("user/newActivities/newActivitiesCorps");
        })
    },


    newActivitiesCorps : (req, res, next) => {               // LA ROUTE POUR CREER LA NOUVELLE ACTIVITE DANS LE CORPS DE L'USER 
        let userId = req.params.id;
        let userActif;
        let sousCategorieChoisie = req.body.sousCategorie;           // 1 - Récupérer le choix de sousCategorie fait par l'user
        console.log(`La sousCategorie choisie par l'user: ${sousCategorieChoisie}`);
        
        User.findById(userId)                               // 2- Récupérer l'user 
        .then(utilisateur => {
            userActif = utilisateur;
        })
        .then(() => {
            return ActiviteCorps.countDocuments({sousCategorie: sousCategorieChoisie})              // 3 - Compter le nombre d'entrées correspondant à la sousCategorie choisie par l'userActif
        })                                                   // Pour le moment on chope parmi toutes les activités d'une catégorie, on filtrera par sousCategorie quand on comprendra ce fuckin count
        .then(nmbrEntrees => {
            console.log(`Le nombre d'entrées pour la SousCategorie: ${nmbrEntrees}`);
            let random = Math.floor(Math.random() * nmbrEntrees);                           // 4 - créer une variable pour randomiser en fonction du nombre d'entrées correspondantes aux critères
            return ActiviteCorps.findOne({sousCategorie: sousCategorieChoisie}).skip(random);          // 5 - Choper l'une de ces entrées
        })
        .then (activiteCorps => {     
            userActif.activitesCorps = activiteCorps;                                        // 6 - L'attribuer à l'user dans son ActivitesCorps.
            console.log(`Nouvelle Activité Corps:${activiteCorps}`);
            res.locals.redirect = "/users/hero"
            userActif.save();
            next();                                 
        })              
                                                               
         
    },


// AJOUT DE NOUVELLES ACTIVITES Esprit

    saveActivitiesEsprit:(req, res, next) => {                                 // ACTION POUR SAUVEGARDER ACTIVITE DANS L'USER MODEL ET REDIRIGER VERS LE CHOXI DE NOUVELLE ACTIVITE
        let userActif;                          
        let userId = req.params.id;
        let categorieId;                                                        // Utile pour retrouver le document Esprit correspondant à l'user.
        let categorie = req.params.categorie;
        let activiteDone;   // Créer pour recevoir les valeurs de l'activitésPassées.

    User.findById(userId).populate("esprit activitesEsprit activitesPasseesEsprit")
        .then(utilisateur => {                                              // 1 - Trouver l'utilisateur Actif
            userActif = utilisateur;
            console.log(`L'activité de l'user: ${userActif.activitesEsprit}`);     // possibilité de variabiliser cela ? Cela nous évitera de le faire pour chaque skills. Utiliser categorie pour variabiliser serait pratique

            activiteDone = {                                               // 2 - Lui créer une nouvelle activite passees
                titre: userActif.activitesEsprit.titre,
                description: userActif.activitesEsprit.description,
                categorie: userActif.activitesEsprit.categorie,
                sousCategorie:userActif.activitesEsprit.sousCategorie,
                pourcentageHardSkills: userActif.activitesEsprit.pourcentageHardSkills,
                pourcentageSoul: userActif.activitesEsprit.pourcentageSoul,
                pourcentageCrafty: userActif.activitesEsprit.pourcentageCrafty,
                totalPtsExp: userActif.activitesEsprit.totalPtsExp,
                noteObtenue: req.body.noteObtenue,
                user: userActif._id                                   // AVEC cette dernière ligne on fait le join entre ActivitesPasseesCategorie et User. L'activité 
            };

            userActif.activitesPasseesEsprit.push(activiteDone);           // 3-  PUSHER l'activite terminée DANS L'ARRAY ActivitesPasseesCategorie de l'user
            console.log(`Activite incorporée dans ActivitesPassees: ${activiteDone}`);

            
            let historiqueUser = userActif.activitesPasseesEsprit;               // 4A - On place les activités Passées dans une variable pour une meilleure lisibilité
            let nmbreActivitesPassees = historiqueUser.length;                      //4B - On stocke la longueur de l'array activitésPasséesCategorie dans une variable pour plus de lisibilité
            let activiteAIntegrer = historiqueUser[nmbreActivitesPassees - 1];    // 4 - On récupère le dernier élément de l'array et on le cale dans une variable. (numéro index dernier élément =  length -1)


            let statsEsprit = userActif.esprit;
            let difficulteActivite = userActif.activitesEsprit.difficulte;
            let coefficientDegradation = 1 * Math.pow(0.95, statsEsprit.scoreEsprit - 1);   // / 5 - On met à jour le score de l'user en utilisant notamment une SUITE GEOMETRIQUE DECROISSANTE. Un = U0 * q^n     SUITE GEOMETRIQUE DECROISSANTE avec n = score - 1 ; q 0.95 et U0 = 1  (plus d'explication en dessous), grâce au coefficient de degradation l'user a besoin de faire de plus en plus d'activités pour maintenir sa progression.

            console.log(`Ancien Score Esprit:${statsEsprit.scoreEsprit}`);
            userActif.esprit.totalExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation;
            userActif.esprit.hardsSkillsExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageHardSkills;
            userActif.esprit.soulExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageSoul;
            userActif.esprit.craftyExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageCrafty;
            console.log(`L'opération en détail: ${activiteAIntegrer.noteObtenue} * ${difficulteActivite} * ${coefficientDegradation}`);
        
        
            userActif.activitesEsprit = undefined;                                                        // 6 - ON vide la key actvitesEsprit en lui donnant la valeur undefined.
            console.log(`Activite en Cours(sense etre egal a 'undefined'):${userActif.activiteEsprit}`);                       

            console.log(`Nouveau Score Esprit:${userActif.esprit.scoreEsprit}`);
        })
        .then(() => {
            categorieId = userActif.esprit._id;
            let newTotal = userActif.esprit.totalExpAcquise;                       //On cale les nouveaux totaux d'exp acquise dans ces variables, on les utilisera pour updater l'user
            let newHardSkills = userActif.esprit.hardsSkillsExpAcquise;
            let newSoul =  userActif.esprit.soulExpAcquise;
            let newCrafty = userActif.esprit.craftyExpAcquise
            let newSante = userActif.esprit.santeExpAcquise;


            return Esprit.findByIdAndUpdate(categorieId,{                           // 7 - On sauvegarde l'entrée ainsi modifiée
                totalExpAcquise : newTotal,
                hardsSkillsExpAcquise : newHardSkills,
                soulExpAcquise : newSoul,
                craftyExpAcquise :  newCrafty,
                santeExpAcquise :  newSante
            })        
        })
        .then(() => {
            res.locals.hero = userActif;
            res.locals.redirect = `/users/newActivities/${userId}/${categorieId}/activiteEsprit`;          // Ainsi l'user se retrouve dans la page newActivities relatives à sa catégorie
            userActif.save();
            next();
        })                                                 

    },
    choixActivitiesEspritView: (req, res) => {               //La Vue pour choisir les nouvelles activités
        userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.hero = user;
            res.render("user/newActivities/newActivitiesEsprit");
        })
    },
    newActivitiesEsprit : (req, res, next) => {               // LA ROUTE POUR CREER LA NOUVELLE ACTIVITE DANS LE Esprit DE L'USER 
        let userId = req.params.id;
        let userActif;
        let sousCategorieChoisie = req.body.sousCategorie;           // 1 - Récupérer le choix de sousCategorie fait par l'user
        console.log(`La sousCategorie choisie par l'user: ${sousCategorieChoisie}`);

        User.findById(userId)                               // 2- Récupérer l'user 
        .then(utilisateur => {
        userActif = utilisateur;
        })
        .then(() => {
            return ActiviteEsprit.countDocuments({sousCategorie: sousCategorieChoisie})              // 3 - Compter le nombre d'entrées correspondant à la sousCategorie choisie par l'userActif
        })                                                   // Pour le moment on chope parmi toutes les activités d'une catégorie, on filtrera par sousCategorie quand on comprendra ce fuckin count
        .then(nmbrEntrees => {
            console.log(`Le nombre d'entrées pour la SousCategorie: ${nmbrEntrees}`);
            let random = Math.floor(Math.random() * nmbrEntrees);                           // 4 - créer une variable pour randomiser en fonction du nombre d'entrées correspondantes aux critères
            return ActiviteEsprit.findOne({sousCategorie: sousCategorieChoisie}).skip(random);          // 5 - Choper l'une de ces entrées
        })
        .then (activiteEsprit => {     
            userActif.activitesEsprit = activiteEsprit;                                        // 6 - L'attribuer à l'user dans son activitesEsprit.
            console.log(`Nouvelle Activité Esprit:${activiteEsprit}`);
            res.locals.redirect = "/users/hero"
            userActif.save();
            next();                                 
        })              
                                                    

    },
    // AJOUT DE NOUVELLES ACTIVITES SOCIAL

    saveActivitiesSocial:(req, res, next) => {                                 // ACTION POUR SAUVEGARDER ACTIVITE DANS L'USER MODEL ET REDIRIGER VERS LE CHOXI DE NOUVELLE ACTIVITE
            let userActif;                          
            let userId = req.params.id;
            let categorieId;                                                        // Utile pour retrouver le document social correspondant à l'user.
            let categorie = req.params.categorie;
            let activiteDone;   // Créer pour recevoir les valeurs de l'activitésPassées.

            User.findById(userId).populate("social activitesSocial activitesPasseesSocial")
            .then(utilisateur => {                                              // 1 - Trouver l'utilisateur Actif
                userActif = utilisateur;
                console.log(`L'activité de l'user: ${userActif.activitesSocial}`);     // possibilité de variabiliser cela ? Cela nous évitera de le faire pour chaque skills. Utiliser categorie pour variabiliser serait pratique

                activiteDone = {                                               // 2 - Lui créer une nouvelle activite passees
                    titre: userActif.activitesSocial.titre,
                    description: userActif.activitesSocial.description,
                    categorie: userActif.activitesSocial.categorie,
                    sousCategorie:userActif.activitesSocial.sousCategorie,
                    pourcentagePotes: userActif.activitesSocial.pourcentagePotes,
                    pourcentageAventure: userActif.activitesSocial.pourcentageAventure,
                    pourcentageCharisma: userActif.activitesSocial.pourcentageCharisma,
                    totalPtsExp: userActif.activitesSocial.totalPtsExp,
                    noteObtenue: req.body.noteObtenue,
                    user: userActif._id                                   // AVEC cette dernière ligne on fait le join entre ActivitesPasseesCategorie et User. L'activité 
                };
                console.log(`Activite faite, incorporé dans ActivitesPassees: ${activiteDone}`);


                userActif.activitesPasseesSocial.push(activiteDone);           // 3-  PUSHER l'activite terminée DANS L'ARRAY ActivitesPasseesCategorie de l'user
                console.log(`L'activite pushé dans l'User: ${activiteDone}`);
                
                let historiqueUser = userActif.activitesPasseesSocial;               // 4A - On place les activités Passées dans une variable pour une meilleure lisibilité
                let nmbreActivitesPassees = historiqueUser.length;                      //4B - On stocke la longueur de l'array activitésPasséesCategorie dans une variable pour plus de lisibilité
                let activiteAIntegrer = historiqueUser[nmbreActivitesPassees - 1];    // 4 - On récupère le dernier élément de l'array et on le cale dans une variable. (numéro index dernier élément =  length -1)
                console.log(`L'activite à intégrer: ${activiteAIntegrer}`);


                let statsSocial = userActif.social;
                let difficulteActivite = userActif.activitesSocial.difficulte;
                let coefficientDegradation = 1 * Math.pow(0.95, statsSocial.scoreSocial - 1);   // / 5 - On met à jour le score de l'user en utilisant notamment une SUITE GEOMETRIQUE DECROISSANTE. Un = U0 * q^n     SUITE GEOMETRIQUE DECROISSANTE avec n = score - 1 ; q 0.95 et U0 = 1  (plus d'explication en dessous), grâce au coefficient de degradation l'user a besoin de faire de plus en plus d'activités pour maintenir sa progression.

                console.log(`Ancien Score Social:${statsSocial.scoreSocial}`);
                userActif.social.totalExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation;
                userActif.social.potesExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentagePotes;
                userActif.social.aventureExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageAventure;
                userActif.social.charismaExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageCharisma;
                console.log(`L'opération en détail: ${activiteAIntegrer.noteObtenue} * ${difficulteActivite} * ${coefficientDegradation}`);
               
               
                userActif.activitesSocial = undefined;                                                        // 6 - ON vide la key actvitesSocial en lui donnant la valeur undefined.
                console.log(`Activite en Cours(sense etre egal a 'undefined'):${userActif.activiteSocial}`);                       

                console.log(`Nouveau Score Social:${userActif.social.scoreSocial}`);
            })
            .then(() => {
                categorieId = userActif.social._id;
                let newTotal = userActif.social.totalExpAcquise;                       //On cale les nouveaux totaux d'exp acquise dans ces variables, on les utilisera pour updater l'user
                let newPotes = userActif.social.potesExpAcquise;
                let newAventure =  userActif.social.aventureExpAcquise;
                let newCharisma = userActif.social.charismaExpAcquise


                return Social.findByIdAndUpdate(categorieId,{                           // 7 - On sauvegarde l'entrée ainsi modifiée
                    totalExpAcquise : newTotal,
                    potesExpAcquise : newPotes,
                    aventureExpAcquise : newAventure,
                    charismaExpAcquise :  newCharisma,
                })        
            })
            .then(() => {
                res.locals.hero = userActif;
                res.locals.redirect = `/users/newActivities/${userId}/${categorieId}/activiteSocial`;          // Ainsi l'user se retrouve dans la page newActivities relatives à sa catégorie
                userActif.save();                                          // Permet de sauvegarder l'activité passées dans le model de l'user
                next();
            })                                                 

    },
    choixActivitiesSocialView: (req, res) => {               //La Vue pour choisir les nouvelles activités
        userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.hero = user;
            res.render("user/newActivities/newActivitiesSocial");
        })
    },
    newActivitiesSocial : (req, res, next) => {               // LA ROUTE POUR CREER LA NOUVELLE ACTIVITE DANS LE CORPS DE L'USER 
        let userId = req.params.id;
        let userActif;
        let sousCategorieChoisie = req.body.sousCategorie;           // 1 - Récupérer le choix de sousCategorie fait par l'user
        console.log(`La sousCategorie choisie par l'user: ${sousCategorieChoisie}`);
        
        User.findById(userId)                               // 2- Récupérer l'user 
        .then(utilisateur => {
            userActif = utilisateur;
        })
        .then(() => {
            return ActiviteSocial.countDocuments({sousCategorie: sousCategorieChoisie})              // 3 - Compter le nombre d'entrées correspondant à la sousCategorie choisie par l'userActif
        })                                                   // Pour le moment on chope parmi toutes les activités d'une catégorie, on filtrera par sousCategorie quand on comprendra ce fuckin count
        .then(nmbrEntrees => {
            console.log(`Le nombre d'entrées pour la SousCategorie: ${nmbrEntrees}`);
            let random = Math.floor(Math.random() * nmbrEntrees);                           // 4 - créer une variable pour randomiser en fonction du nombre d'entrées correspondantes aux critères
            return ActiviteSocial.findOne({sousCategorie: sousCategorieChoisie}).skip(random);          // 5 - Choper l'une de ces entrées
        })
        .then (activiteSocial => {     
            userActif.activitesSocial = activiteSocial;                                        // 6 - L'attribuer à l'user dans son ActivitesSocial.
            console.log(`Nouvelle Activité Social:${activiteSocial}`);
            res.locals.redirect = "/users/hero"
            userActif.save();
            next();                                 
        })              
                                                               
         
    },


// AJOUT DE NOUVELLES ACTIVITES ARTS

    saveActivitiesArts:(req, res, next) => {                                 // ACTION POUR SAUVEGARDER ACTIVITE DANS L'USER MODEL ET REDIRIGER VERS LE CHOXI DE NOUVELLE ACTIVITE
            let userActif;                          
            let userId = req.params.id;
            let categorieId;                                                        // Utile pour retrouver le document arts correspondant à l'user.
            let categorie = req.params.categorie;
            let activiteDone;   // Créer pour recevoir les valeurs de l'activitésPassées.

            User.findById(userId).populate("arts activitesArts activitesPasseesArts")
            .then(utilisateur => {                                              // 1 - Trouver l'utilisateur Actif
                userActif = utilisateur;
                console.log(`L'activité de l'user: ${userActif.activitesArts}`);     // possibilité de variabiliser cela ? Cela nous évitera de le faire pour chaque skills. Utiliser categorie pour variabiliser serait pratique

                activiteDone = {                                               // 2 - Lui créer une nouvelle activite passees
                    titre: userActif.activitesArts.titre,
                    description: userActif.activitesArts.description,
                    categorie: userActif.activitesArts.categorie,
                    sousCategorie:userActif.activitesArts.sousCategorie,
                    pourcentagePractice: userActif.activitesArts.pourcentagePractice,
                    pourcentageCulture: userActif.activitesArts.pourcentageCulture,
                    pourcentageExpressivite: userActif.activitesArts.pourcentageExpressivite,
                    totalPtsExp: userActif.activitesArts.totalPtsExp,
                    noteObtenue: req.body.noteObtenue,
                    user: userActif._id                                   // AVEC cette dernière ligne on fait le join entre ActivitesPasseesCategorie et User. L'activité 
                };
                console.log(`Activite faite, incorporé dans ActivitesPassees: ${activiteDone}`);


                userActif.activitesPasseesArts.push(activiteDone);           // 3-  PUSHER l'activite terminée DANS L'ARRAY ActivitesPasseesCategorie de l'user

                
                let historiqueUser = userActif.activitesPasseesArts;               // 4A - On place les activités Passées dans une variable pour une meilleure lisibilité
                let nmbreActivitesPassees = historiqueUser.length;                      //4B - On stocke la longueur de l'array activitésPasséesCategorie dans une variable pour plus de lisibilité
                let activiteAIntegrer = historiqueUser[nmbreActivitesPassees - 1];    // 4 - On récupère le dernier élément de l'array et on le cale dans une variable. (numéro index dernier élément =  length -1)
                console.log(`L'activite à intégrer: ${activiteAIntegrer}`);


                let statsArts = userActif.arts;
                let difficulteActivite = userActif.activitesArts.difficulte;
                let coefficientDegradation = 1 * Math.pow(0.95, statsArts.scoreArts - 1);   // / 5 - On met à jour le score de l'user en utilisant notamment une SUITE GEOMETRIQUE DECROISSANTE. Un = U0 * q^n     SUITE GEOMETRIQUE DECROISSANTE avec n = score - 1 ; q 0.95 et U0 = 1  (plus d'explication en dessous), grâce au coefficient de degradation l'user a besoin de faire de plus en plus d'activités pour maintenir sa progression.

                console.log(`Ancien Score Arts:${statsArts.scoreArts}`);
                userActif.arts.totalExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation;
                userActif.arts.practiceExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentagePractice;
                userActif.arts.cultureExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageCulture;
                userActif.arts.expressiviteExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageExpressivite;
                console.log(`L'opération en détail: ${activiteAIntegrer.noteObtenue} * ${difficulteActivite} * ${coefficientDegradation}`);
               
               
                userActif.activitesArts = undefined;                                                        // 6 - ON vide la key actvitesArts en lui donnant la valeur undefined.
                console.log(`Activite en Cours(sense etre egal a 'undefined'):${userActif.activiteArts}`);                       

                console.log(`Nouveau Score Arts:${userActif.arts.scoreArts}`);
            })
            .then(() => {
                categorieId = userActif.arts._id;
                let newTotal = userActif.arts.totalExpAcquise;                       //On cale les nouveaux totaux d'exp acquise dans ces variables, on les utilisera pour updater l'user
                let newPractice = userActif.arts.practiceExpAcquise;
                let newCulture =  userActif.arts.cultureExpAcquise;
                let newExpressivite = userActif.arts.expressiviteExpAcquise


                return Arts.findByIdAndUpdate(categorieId,{                           // 7 - On sauvegarde l'entrée ainsi modifiée
                    totalExpAcquise : newTotal,
                    practiceExpAcquise : newPractice,
                    cultureExpAcquise : newCulture,
                    expressiviteExpAcquise :  newExpressivite,
                })        
            })
            .then(() => {
                res.locals.hero = userActif;
                res.locals.redirect = `/users/newActivities/${userId}/${categorieId}/activiteArts`;          // Ainsi l'user se retrouve dans la page newActivities relatives à sa catégorie
                userActif.save();               // Permet de sauvegarder l'activité passées dans le model de l'user
                next();
            })                                                 


                                    

    },
    choixActivitiesArtsView: (req, res) => {               //La Vue pour choisir les nouvelles activités
        userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.hero = user;
            res.render("user/newActivities/newActivitiesArts");
        })
    },
    newActivitiesArts : (req, res, next) => {               // LA ROUTE POUR CREER LA NOUVELLE ACTIVITE DANS LE ARTS DE L'USER 
        let userId = req.params.id;
        let userActif;
        let sousCategorieChoisie = req.body.sousCategorie;           // 1 - Récupérer le choix de sousCategorie fait par l'user
        console.log(`La sousCategorie choisie par l'user: ${sousCategorieChoisie}`);
        
        User.findById(userId)                               // 2- Récupérer l'user 
        .then(utilisateur => {
            userActif = utilisateur;
        })
        .then(() => {
            return ActiviteArts.countDocuments({sousCategorie: sousCategorieChoisie})              // 3 - Compter le nombre d'entrées correspondant à la sousCategorie choisie par l'userActif
        })                                                   // Pour le moment on chope parmi toutes les activités d'une catégorie, on filtrera par sousCategorie quand on comprendra ce fuckin count
        .then(nmbrEntrees => {
            console.log(`Le nombre d'entrées pour la SousCategorie: ${nmbrEntrees}`);
            let random = Math.floor(Math.random() * nmbrEntrees);                           // 4 - créer une variable pour randomiser en fonction du nombre d'entrées correspondantes aux critères
            return ActiviteArts.findOne({sousCategorie: sousCategorieChoisie}).skip(random);          // 5 - Choper l'une de ces entrées
        })
        .then (activiteArts => {     
            userActif.activitesArts = activiteArts;                                        // 6 - L'attribuer à l'user dans son ActivitesArts.
            console.log(`Nouvelle Activité Arts:${activiteArts}`);
            res.locals.redirect = "/users/hero"
            userActif.save();
            next();                                 
        })              
                                                               
         
    },

    // AJOUT DE NOUVELLES ACTIVITES STYLE

    saveActivitiesStyle:(req, res, next) => {                                 // ACTION POUR SAUVEGARDER ACTIVITE DANS L'USER MODEL ET REDIRIGER VERS LE CHOXI DE NOUVELLE ACTIVITE
            let userActif;                          
            let userId = req.params.id;
            let categorieId;                                                        // Utile pour retrouver le document style correspondant à l'user.
            let categorie = req.params.categorie;
            let activiteDone;   // Créer pour recevoir les valeurs de l'activitésPassées.

            User.findById(userId).populate("style activitesStyle activitesPasseesStyle")
            .then(utilisateur => {                                              // 1 - Trouver l'utilisateur Actif
                userActif = utilisateur;
                console.log(`L'activité de l'user: ${userActif.activitesStyle}`);     // possibilité de variabiliser cela ? Cela nous évitera de le faire pour chaque skills. Utiliser categorie pour variabiliser serait pratique

                activiteDone = {                                               // 2 - Lui créer une nouvelle activite passees
                    titre: userActif.activitesStyle.titre,
                    description: userActif.activitesStyle.description,
                    categorie: userActif.activitesStyle.categorie,
                    sousCategorie:userActif.activitesStyle.sousCategorie,
                    pourcentageOriginal: userActif.activitesStyle.pourcentageOriginal,
                    pourcentageElegance: userActif.activitesStyle.pourcentageElegance,
                    pourcentageBasic: userActif.activitesStyle.pourcentageBasic,
                    totalPtsExp: userActif.activitesStyle.totalPtsExp,
                    noteObtenue: req.body.noteObtenue,
                    user: userActif._id                                   // AVEC cette dernière ligne on fait le join entre ActivitesPasseesCategorie et User. L'activité 
                };
                console.log(`Activite faite, incorporé dans ActivitesPassees: ${activiteDone}`);


                userActif.activitesPasseesStyle.push(activiteDone);           // 3-  PUSHER l'activite terminée DANS L'ARRAY ActivitesPasseesCategorie de l'user

                
                let historiqueUser = userActif.activitesPasseesStyle;               // 4A - On place les activités Passées dans une variable pour une meilleure lisibilité
                let nmbreActivitesPassees = historiqueUser.length;                      //4B - On stocke la longueur de l'array activitésPasséesCategorie dans une variable pour plus de lisibilité
                let activiteAIntegrer = historiqueUser[nmbreActivitesPassees - 1];    // 4 - On récupère le dernier élément de l'array et on le cale dans une variable. (numéro index dernier élément =  length -1)
                console.log(`L'activite à intégrer: ${activiteAIntegrer}`);


                let statsStyle = userActif.style;
                let difficulteActivite = userActif.activitesStyle.difficulte;
                let coefficientDegradation = 1 * Math.pow(0.95, statsStyle.scoreStyle - 1);   // / 5 - On met à jour le score de l'user en utilisant notamment une SUITE GEOMETRIQUE DECROISSANTE. Un = U0 * q^n     SUITE GEOMETRIQUE DECROISSANTE avec n = score - 1 ; q 0.95 et U0 = 1  (plus d'explication en dessous), grâce au coefficient de degradation l'user a besoin de faire de plus en plus d'activités pour maintenir sa progression.

                console.log(`Ancien Score Style:${statsStyle.scoreStyle}`);
                userActif.style.totalExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation;
                userActif.style.colorfulExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageOriginal;
                userActif.style.classyExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageElegance;
                userActif.style.simpleExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageBasic;
                userActif.style.santeExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageSante;
                console.log(`L'opération en détail: ${activiteAIntegrer.noteObtenue} * ${difficulteActivite} * ${coefficientDegradation}`);
               
               
                userActif.activitesStyle = undefined;                                                        // 6 - ON vide la key actvitesStyle en lui donnant la valeur undefined.
                console.log(`Activite en Cours(sense etre egal a 'undefined'):${userActif.activiteStyle}`);                       

                console.log(`Nouveau Score Style:${userActif.style.scoreStyle}`);
            })
            .then(() => {
                categorieId = userActif.style._id;
                let newTotal = userActif.style.totalExpAcquise;                       //On cale les nouveaux totaux d'exp acquise dans ces variables, on les utilisera pour updater l'user
                let newColorful = userActif.style.colorfulExpAcquise;
                let newClassy =  userActif.style.classyExpAcquise;
                let newSimple = userActif.style.simpleExpAcquise


                return Style.findByIdAndUpdate(categorieId,{                           // 7 - On sauvegarde l'entrée ainsi modifiée
                    totalExpAcquise : newTotal,
                    colorfulExpAcquise : newColorful,
                    classyExpAcquise : newClassy,
                    simpleExpAcquise :  newSimple,
                })        
            })
            .then(() => {
                res.locals.hero = userActif;
                res.locals.redirect = `/users/newActivities/${userId}/${categorieId}/activiteStyle`;          // Ainsi l'user se retrouve dans la page newActivities relatives à sa catégorie
                userActif.save();                      // Permet de sauvegarder l'activité passées dans le model de l'user
                next();
            })                                                 


                                    

    },
    choixActivitiesStyleView: (req, res) => {               //La Vue pour choisir les nouvelles activités
        userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.hero = user;
            res.render("user/newActivities/newActivitiesStyle");
        })
    },
    newActivitiesStyle : (req, res, next) => {               // LA ROUTE POUR CREER LA NOUVELLE ACTIVITE DANS LE STYLE DE L'USER 
        let userId = req.params.id;
        let userActif;
        let sousCategorieChoisie = req.body.sousCategorie;           // 1 - Récupérer le choix de sousCategorie fait par l'user
        console.log(`La sousCategorie choisie par l'user: ${sousCategorieChoisie}`);
        
        User.findById(userId)                               // 2- Récupérer l'user 
        .then(utilisateur => {
            userActif = utilisateur;
        })
        .then(() => {
            return ActiviteStyle.countDocuments({sousCategorie: sousCategorieChoisie})              // 3 - Compter le nombre d'entrées correspondant à la sousCategorie choisie par l'userActif
        })                                                   // Pour le moment on chope parmi toutes les activités d'une catégorie, on filtrera par sousCategorie quand on comprendra ce fuckin count
        .then(nmbrEntrees => {
            console.log(`Le nombre d'entrées pour la SousCategorie: ${nmbrEntrees}`);
            let random = Math.floor(Math.random() * nmbrEntrees);                           // 4 - créer une variable pour randomiser en fonction du nombre d'entrées correspondantes aux critères
            return ActiviteStyle.findOne({sousCategorie: sousCategorieChoisie}).skip(random);          // 5 - Choper l'une de ces entrées
        })
        .then (activiteStyle => {     
            userActif.activitesStyle = activiteStyle;                                        // 6 - L'attribuer à l'user dans son ActivitesStyle.
            console.log(`Nouvelle Activité Style:${activiteStyle}`);
            res.locals.redirect = "/users/hero"
            userActif.save();
            next();                                 
        })              
                                                               
         
    },

// AJOUT DE NOUVELLES ACTIVITES COOKING

    saveActivitiesCooking:(req, res, next) => {                                 // ACTION POUR SAUVEGARDER ACTIVITE DANS L'USER MODEL ET REDIRIGER VERS LE CHOXI DE NOUVELLE ACTIVITE
            let userActif;                          
            let userId = req.params.id;
            let categorieId;                                                        // Utile pour retrouver le document cooking correspondant à l'user.
            let categorie = req.params.categorie;
            let activiteDone;   // Créer pour recevoir les valeurs de l'activitésPassées.

            User.findById(userId).populate("cooking activitesCooking activitesPasseesCooking")
            .then(utilisateur => {                                              // 1 - Trouver l'utilisateur Actif
                userActif = utilisateur;
                console.log(`L'activité de l'user: ${userActif.activitesCooking}`);     // possibilité de variabiliser cela ? Cela nous évitera de le faire pour chaque skills. Utiliser categorie pour variabiliser serait pratique

                activiteDone = {                                               // 2 - Lui créer une nouvelle activite passees
                    titre: userActif.activitesCooking.titre,
                    description: userActif.activitesCooking.description,
                    categorie: userActif.activitesCooking.categorie,
                    sousCategorie:userActif.activitesCooking.sousCategorie,
                    pourcentageClassic: userActif.activitesCooking.pourcentageClassic,
                    pourcentageHealthy: userActif.activitesCooking.pourcentageHealthy,
                    pourcentageDecouverte: userActif.activitesCooking.pourcentageDecouverte,
                    pourcentagePlaisir: userActif.activitesCooking.pourcentagePlaisir,
                    totalPtsExp: userActif.activitesCooking.totalPtsExp,
                    noteObtenue: req.body.noteObtenue,
                    user: userActif._id                                   // AVEC cette dernière ligne on fait le join entre ActivitesPasseesCategorie et User. L'activité 
                };
                console.log(`Activite faite, incorporé dans ActivitesPassees: ${activiteDone}`);


                userActif.activitesPasseesCooking.push(activiteDone);           // 3-  PUSHER l'activite terminée DANS L'ARRAY ActivitesPasseesCategorie de l'user

                
                let historiqueUser = userActif.activitesPasseesCooking;               // 4A - On place les activités Passées dans une variable pour une meilleure lisibilité
                let nmbreActivitesPassees = historiqueUser.length;                      //4B - On stocke la longueur de l'array activitésPasséesCategorie dans une variable pour plus de lisibilité
                let activiteAIntegrer = historiqueUser[nmbreActivitesPassees - 1];    // 4 - On récupère le dernier élément de l'array et on le cale dans une variable. (numéro index dernier élément =  length -1)
                console.log(`L'activite à intégrer: ${activiteAIntegrer}`);


                let statsCooking = userActif.cooking;
                let difficulteActivite = userActif.activitesCooking.difficulte;
                let coefficientDegradation = 1 * Math.pow(0.95, statsCooking.scoreCooking - 1);   // / 5 - On met à jour le score de l'user en utilisant notamment une SUITE GEOMETRIQUE DECROISSANTE. Un = U0 * q^n     SUITE GEOMETRIQUE DECROISSANTE avec n = score - 1 ; q 0.95 et U0 = 1  (plus d'explication en dessous), grâce au coefficient de degradation l'user a besoin de faire de plus en plus d'activités pour maintenir sa progression.

                console.log(`Ancien Score Cooking:${statsCooking.scoreCooking}`);
                userActif.cooking.totalExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation;
                userActif.cooking.classicExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageClassic;
                userActif.cooking.healthyExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageHealthy;
                userActif.cooking.decouverteExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageDecouverte;
                userActif.cooking.plaisirExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentagePlaisir;
                console.log(`L'opération en détail: ${activiteAIntegrer.noteObtenue} * ${difficulteActivite} * ${coefficientDegradation}`);
               
               
                userActif.activitesCooking = undefined;                                                        // 6 - ON vide la key actvitesCooking en lui donnant la valeur undefined.
                console.log(`Activite en Cours(sense etre egal a 'undefined'):${userActif.activiteCooking}`);                       

                console.log(`Nouveau Score Cooking:${userActif.cooking.scoreCooking}`);
            })
            .then(() => {
                categorieId = userActif.cooking._id;
                let newTotal = userActif.cooking.totalExpAcquise;                       //On cale les nouveaux totaux d'exp acquise dans ces variables, on les utilisera pour updater l'user
                let newClassic = userActif.cooking.classicExpAcquise;
                let newHealthy =  userActif.cooking.healthyExpAcquise;
                let newDecouverte = userActif.cooking.decouverteExpAcquise
                let newPlaisir = userActif.cooking.plaisirExpAcquise;


                return Cooking.findByIdAndUpdate(categorieId,{                           // 7 - On sauvegarde l'entrée ainsi modifiée
                    totalExpAcquise : newTotal,
                    classicExpAcquise : newClassic,
                    healthyExpAcquise : newHealthy,
                    decouverteExpAcquise :  newDecouverte,
                    plaisirExpAcquise :  newPlaisir
                })        
            })
            .then(() => {
                res.locals.hero = userActif;
                res.locals.redirect = `/users/newActivities/${userId}/${categorieId}/activiteCooking`;          // Ainsi l'user se retrouve dans la page newActivities relatives à sa catégorie
                userActif.save();     // Permet de sauvegarder l'activité passées dans le model de l'user
                next();
            })                                                 


                                    

    },
    choixActivitiesCookingView: (req, res) => {               //La Vue pour choisir les nouvelles activités
        userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.hero = user;
            res.render("user/newActivities/newActivitiesCooking");
        })
    },
    newActivitiesCooking : (req, res, next) => {               // LA ROUTE POUR CREER LA NOUVELLE ACTIVITE DANS LE COOKING DE L'USER 
        let userId = req.params.id;
        let userActif;
        let sousCategorieChoisie = req.body.sousCategorie;           // 1 - Récupérer le choix de sousCategorie fait par l'user
        console.log(`La sousCategorie choisie par l'user: ${sousCategorieChoisie}`);
        
        User.findById(userId)                               // 2- Récupérer l'user 
        .then(utilisateur => {
            userActif = utilisateur;
        })
        .then(() => {
            return ActiviteCooking.countDocuments({sousCategorie: sousCategorieChoisie})              // 3 - Compter le nombre d'entrées correspondant à la sousCategorie choisie par l'userActif
        })                                                   // Pour le moment on chope parmi toutes les activités d'une catégorie, on filtrera par sousCategorie quand on comprendra ce fuckin count
        .then(nmbrEntrees => {
            console.log(`Le nombre d'entrées pour la SousCategorie: ${nmbrEntrees}`);
            let random = Math.floor(Math.random() * nmbrEntrees);                           // 4 - créer une variable pour randomiser en fonction du nombre d'entrées correspondantes aux critères
            return ActiviteCooking.findOne({sousCategorie: sousCategorieChoisie}).skip(random);          // 5 - Choper l'une de ces entrées
        })
        .then (activiteCooking => {     
            userActif.activitesCooking = activiteCooking;                                        // 6 - L'attribuer à l'user dans son ActivitesCooking.
            console.log(`Nouvelle Activité Cooking:${activiteCooking}`);
            res.locals.redirect = "/users/hero"
            userActif.save();
            next();                                 
        })              
                                                               
         
    },





    
// LOGIN - LOGOUT
    authenticate: passport.authenticate("local", {
        failureRedirect:"/users/login",     //PAGE DE DESTINATION SI ERREUR DE LOGIN (de la part de l'user)
        successRedirect:`/users/hero`,      // PAGE DE DESTINATION EN CAS DE SUCCES
    }),


    loginView: (req, res) => {
        res.render("user/login");
    }

    
}


// EXPLICATION SUITE GEOMETRIQUE DECROISSANTE

/*

+ un utilisateur à un niveau important, plus il doit réaliser d'activité pour passer au niveau supérieur.

En gros, les gains rapportés par une activité se dégrade avec sa montée en puissance.
Pour créer cet effet nous utilisons une suite géométrique décroissante.

DONNEES

- Le niveau de base  est le niveau 1
- Au niveau 5 réaliser, une activité facile (100pts) faut automatiquement passer au niveau supérieur
-

U0 = 1 ===> correspond au niveau 1

Un = U0 x q^n,  avec :
    U0 = 1 ===> correspond au niveau 1
    q = la raison, ici la raison est de 0,85
    n = niveau actuel de l'user - 1. Par exemple m = 1 pour un user de niveau 2
    Un = niveau de degradation, si user est niveau 2, Un correspond à U1 (sa raison est alors de q^1)
     


*/
