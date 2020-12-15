
const ActiviteCorps = require("../models/activites/activiteCorps");
const ActiviteEsprit = require("../models/activites/activiteEsprit");
const ActiviteSocial = require("../models/activites/activiteSocial");
const ActiviteArts = require("../models/activites/activiteArts");
const ActiviteStyle = require("../models/activites/activiteStyle");
const ActiviteCooking = require("../models/activites/activiteCooking");

const mongoose = require("mongoose");



const ActiviteParams = (body) => {         // Avec cette fonction nous pourrons retourner les datas crées/ mis à jour par l'user durant sa requête
    return {
        titre: body.titre,
        description: body.description,
        categorie: body.categorie,               // CATEGORIE EST DISPLAY est en read-only dans le formulaire
        sousCategorie: body.sousCategorie,
        difficulte: body.difficulte,
        pourcentagePuissance: body.pourcentagePuissance,
        pourcentageSouplesse: body.pourcentageSouplesse,
        pourcentageTechnique: body.pourcentageTechnique,
        pourcentageSante: body.pourcentageSante,
        prerequisF: body.prerequisF,
        prerequisD: body.prerequisD,
        prerequisC: body.prerequisC,
        prerequisB: body.prerequisB,
        prerequisA: body.prerequisA,
        prerequisS: body.prerequisS
    };
};



// NOTES: POSSIBILISER DE FACTORISER TOUT CA EN UTILISANT UN ARRAY CONTENANT LES 6 CATEGORIES ET UNE BOUCLE FOR (Ou PAS).




module.exports = {


// LES ACTIONS POUR AFFICHER LA VUE

    admin: (req, res) => {
        res.render("admin/activites/accueil");

    },
    adminCreate: (req, res) => {                                          
        res.render("admin/activites/create");
    },
    activiteCorps: (req, res) => {
        res.render("admin/activites/createCorps");
    },

    activiteEsprit: (req, res) => {
        res.render("admin/activites/createEsprit");
    },

    activiteSocial: (req, res) => {
        res.render("admin/activites/createSocial");
    },

    activiteArts: (req, res) => {
        res.render("admin/activites/createArts");
    },

    activiteStyle: (req, res) => {
        res.render("admin/activites/createStyle");
    },

    activiteCooking: (req, res) => {
        res.render("admin/activites/createCooking");
    },
    
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;          
        if (redirectPath) {
            res.redirect(redirectPath);
        } else {
        next();                                         // Pour ne pas freezer en cas de redirection comme un con
        }
    },



// AFFICHER LES RESULTATS

confirmationActiviteCorps: (req, res) => {
    let id = req.params.id;
    let challenge;
    ActiviteCorps.findById(id)
    .then(activite => {
        challenge = activite
        console.log(challenge);
        res.render("admin/activites/resultatCreationCorps", {
            defi : challenge
        });
    })

},

confirmationActiviteEsprit: (req, res) => {
    let id = req.params.id;
    let challenge;
    ActiviteEsprit.findById(id)
    .then(activite => {
        challenge = activite
        console.log(challenge);
        res.render("admin/activites/resultatCreationEsprit", {
            defi : challenge
        });
    })

},

confirmationActiviteSocial: (req, res) => {
    let id = req.params.id;
    let challenge;
    ActiviteSocial.findById(id)
    .then(activite => {
        challenge = activite
        console.log(challenge);
        res.render("admin/activites/resultatCreationSocial", {
            defi : challenge
        });
    })

},

confirmationActiviteArts: (req, res) => {
    let id = req.params.id;
    let challenge;
    ActiviteArts.findById(id)
    .then(activite => {
        challenge = activite
        console.log(challenge);
        res.render("admin/activites/resultatCreationArts", {
            defi : challenge
        });
    })
},

confirmationActiviteStyle: (req, res) => {
    let id = req.params.id;
    let challenge;
    ActiviteStyle.findById(id)
    .then(activite => {
        challenge = activite
        console.log(challenge);
        res.render("admin/activites/resultatCreationStyle", {
            defi : challenge
        });
    })
},

confirmationActiviteCooking: (req, res) => {
    let id = req.params.id;
    let challenge;
    ActiviteCooking.findById(id)
    .then(activite => {
        challenge = activite
        console.log(challenge);
        res.render("admin/activites/resultatCreationCooking", {
            defi : challenge
        });
    })
},





// CREATION D'ACTIVITES

    creaActiviteCorps: (req, res, next) => {
        ActiviteCorps.create({
            titre: req.body.titre,
            description: req.body.description,
            categorie: "Corps",
            sousCategorie: req.body.sousCategorie,
            difficulte: req.body.difficulte,
            pourcentagePuissance: req.body.pourcentagePuissance,
            pourcentageSouplesse: req.body.pourcentageSouplesse,
            pourcentageTechnique: req.body.pourcentageTechnique,
            pourcentageSante: req.body.pourcentageSante,
            prerequisF: req.body.prerequisF,
            prerequisD: req.body.prerequisD,
            prerequisC: req.body.prerequisC,
            prerequisB: req.body.prerequisB,
            prerequisA: req.body.prerequisA,
            prerequisS: req.body.prerequisS
        })
        .then(activite => {
            console.log(activite)
            let newActivite = activite;
            newActivite.save();
            res.locals.redirect = `/admin/activites/resultatCreationCorps/${activite._id}`;
            next();
        })                                     



    },
    creaActiviteEsprit: (req, res, next) => {
        ActiviteEsprit.create({
            titre: req.body.titre,
            description: req.body.description,
            categorie: "Esprit",
            sousCategorie: req.body.sousCategorie,
            difficulte: req.body.difficulte,
            pourcentageHardSkills: req.body.pourcentageHardSkills,
            pourcentageSoul: req.body.pourcentageSoul,
            pourcentageCrafty: req.body.pourcentageCrafty,
            prerequisF: req.body.prerequisF,
            prerequisD: req.body.prerequisD,
            prerequisC: req.body.prerequisC,
            prerequisB: req.body.prerequisB,
            prerequisA: req.body.prerequisA,
            prerequisS: req.body.prerequisS,
        })
        .then(activite => {
            console.log(activite)
            let newActivite = activite;
            newActivite.save();
            res.locals.redirect = `/admin/activites/resultatCreationEsprit/${activite._id}`;
            next();
        })                                     

    },
    creaActiviteSocial: (req, res, next) => {
        ActiviteSocial.create({
            titre: req.body.titre,
            description: req.body.description,
            categorie: "Social",
            sousCategorie: req.body.sousCategorie,
            difficulte: req.body.difficulte,
            pourcentagePotes: req.body.pourcentagePotes,
            pourcentageAventure: req.body.pourcentageAventure,
            pourcentageCharisma: req.body.pourcentageCharisma,
            prerequisF: req.body.prerequisF,
            prerequisD: req.body.prerequisD,
            prerequisC: req.body.prerequisC,
            prerequisB: req.body.prerequisB,
            prerequisA: req.body.prerequisA,
            prerequisS: req.body.prerequisS,
        })
        .then(activite => {
            console.log(activite)
            let newActivite = activite;
            newActivite.save();
            res.locals.redirect = `/admin/activites/resultatCreationSocial/${activite._id}`;
            next();
        })  
        
        
    },
    creaActiviteArts: (req, res, next) => {
        ActiviteArts.create({
            titre: req.body.titre,
            description: req.body.description,
            categorie: "Arts",
            sousCategorie: req.body.sousCategorie,
            difficulte: req.body.difficulte,
            pourcentagePractice: req.body.pourcentagePractice,
            pourcentageCulture: req.body.pourcentageCulture,
            pourcentageExpressivite: req.body.pourcentageExpressivite,
            prerequisF: req.body.prerequisF,
            prerequisD: req.body.prerequisD,
            prerequisC: req.body.prerequisC,
            prerequisB: req.body.prerequisB,
            prerequisA: req.body.prerequisA,
            prerequisS: req.body.prerequisS,
        })
        .then(activite => {
            console.log(activite)
            let newActivite = activite;
            newActivite.save();
            res.locals.redirect = `/admin/activites/resultatCreationArts/${activite._id}`;
            next();
        })
    },

    creaActiviteStyle: (req, res, next) => {
        ActiviteStyle.create({
            titre: req.body.titre,
            description: req.body.description,
            categorie: "Style",
            sousCategorie: req.body.sousCategorie,
            difficulte: req.body.difficulte,
            pourcentageOriginal: req.body.pourcentageOriginal,
            pourcentageElegance: req.body.pourcentageElegance,
            pourcentageBasic: req.body.pourcentageBasic,
            prerequisF: req.body.prerequisF,
            prerequisD: req.body.prerequisD,
            prerequisC: req.body.prerequisC,
            prerequisB: req.body.prerequisB,
            prerequisA: req.body.prerequisA,
            prerequisS: req.body.prerequisS,
        })
        .then(activite => {
            console.log(activite)
            let newActivite = activite;
            newActivite.save();
            res.locals.redirect = `/admin/activites/resultatCreationStyle/${activite._id}`;
            next();
        })  
    },



    creaActiviteCooking: (req, res, next) => {
        ActiviteCooking.create({
            titre: req.body.titre,
            description: req.body.description,
            categorie: "Cooking",
            sousCategorie: req.body.sousCategorie,
            difficulte: req.body.difficulte,
            pourcentageHealthy: req.body.pourcentageHealthy,
            pourcentageClassic: req.body.pourcentageClassic,
            pourcentageDecouverte: req.body.pourcentageDecouverte,
            pourcentagePlaisir: req.body.pourcentagePlaisir,
            prerequisF: req.body.prerequisF,
            prerequisD: req.body.prerequisD,
            prerequisC: req.body.prerequisC,
            prerequisB: req.body.prerequisB,
            prerequisA: req.body.prerequisA,
            prerequisS: req.body.prerequisS,
        })
        .then(activite => {
            console.log(activite)
            let newActivite = activite;
            newActivite.save();
            res.locals.redirect = `/admin/activites/resultatCreationCooking/${activite._id}`;
            next();
        })
    },


// AFFICHAGE DES ACTIVITES (READ)

    adminCategorieIndex: (req, res) => {
        res.render("admin/activites/categorieIndex")
    },
    
    adminIndexView: (req, res) => {
        let challenge;                                  // on prépare la variable challenge pour y mettre l'ensemble des activités
        let categorie = req.params.categorie;                   // on récupère la catégorie des activités en utilisant le params passé dans l'URL
        let categorieModel = mongoose.model(categorie);    // mongoose.model, nous permet de faire appel au model portant le même nom que la variable catégorie
        categorieModel.find()                                // Avec .find(), nous recrachons l'ensemble du model représenté par categorieModel
        .then(Allactivities => {
            challenge = Allactivities
            console.log(`Challenge: ${challenge}`);
            res.render("admin/activites/index", {
                activite : challenge                                //dans la vue "rendue" la variable activite contient les datas de la variable challenge définie ici
            });
        })
    },

// AFFICHAGE DES ACTIVITES (READ)
    edit: (req, res) => {
        let activiteId = req.params.id;    // nous sert à retrouver l'activité dans le model correspondant.
        let categorie = req.params.categorie;
        let categorieModel = mongoose.model(`Activite${categorie}`);       // ICI  categorie sera égal à corps, esprit, etc, il est donc nécessaire de faire une concaténation pour obtenir le nom correct du model à utiliser
        categorieModel.findById(activiteId)
        .then(challenge => {
            res.render(`admin/activites/update/edit${categorie}`, {
                activite: challenge
            });
        });
    },
    update: (req, res, next) => {                          // Cette action pour s'adapter en fonction de la categorie et de l'Id de l'activité.

        let activiteId = req.params.id;
        let updatedParams = ActiviteParams(req.body);
        console.log(`UpdatedParams: ${updatedParams.titre}`);
        let categorie = req.params.categorie;
        console.log(`categorie:${categorie}`)
        let categorieModel = mongoose.model(`Activite${categorie}`);
        categorieModel.findByIdAndUpdate(activiteId, {
            $set: updatedParams
        })
        .then(activite => {
            console.log(`Activite:${activite}`);
            res.locals.redirect = `/admin/activites/index/Activite${categorie}`;   
            next();
        })
        .catch(error => {
            next(error);
        });

//DELETE

    },
    delete : (req, res, next) => {
        let activiteId = req.params.id;
        let categorie = req.params.categorie;
        console.log(`categorie:${categorie}`)
        let categorieModel = mongoose.model(`Activite${categorie}`);
        categorieModel.findByIdAndRemove(activiteId)
            .then(() => {                                                               //UN PB AU NIVEAU DU THEN ?
                res.locals.redirect = `/admin/activites/index/Activite${categorie}`;   
                next();
            })
            .catch(error => {
                next(error);
            });
    },
    


    
};