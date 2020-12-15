const router = require("express").Router();
const usersController = require("../controllers/usersController");


router.get("/results/:id", usersController.show, usersController.showView); //SECTION RESULTATS
router.get("/hero/:id",usersController.hero, usersController.heroView); // ESPACE USER (LA VRAIE ROUTE)


// LES ROUTES POUR ACCEDER A LA VUE DES NOUVELLES ACTIVITES
router.get("/newActivities/:id/:categorie/activiteCorps", usersController.choixActivitiesCorpsView);   // PRESENTENT LES NOUVELLES ACTIVITES DISPONIBLES POUR L'USER EN FONCTION DE LA CATEGORIE.
router.get("/newActivities/:id/:categorie/activiteEsprit", usersController.choixActivitiesEspritView);   // PRESENTENT LES NOUVELLES ACTIVITES DISPONIBLES POUR L'USER EN FONCTION DE LA CATEGORIE.
router.get("/newActivities/:id/:categorie/activiteSocial", usersController.choixActivitiesSocialView);   // PRESENTENT LES NOUVELLES ACTIVITES DISPONIBLES POUR L'USER EN FONCTION DE LA CATEGORIE.
router.get("/newActivities/:id/:categorie/activiteArts", usersController.choixActivitiesArtsView);   // PRESENTENT LES NOUVELLES ACTIVITES DISPONIBLES POUR L'USER EN FONCTION DE LA CATEGORIE.
router.get("/newActivities/:id/:categorie/activiteStyle", usersController.choixActivitiesStyleView);   // PRESENTENT LES NOUVELLES ACTIVITES DISPONIBLES POUR L'USER EN FONCTION DE LA CATEGORIE.
router.get("/newActivities/:id/:categorie/activiteCooking", usersController.choixActivitiesCookingView);   // PRESENTENT LES NOUVELLES ACTIVITES DISPONIBLES POUR L'USER EN FONCTION DE LA CATEGORIE.


// LES ROUTES POUR ACCEDER AU DETAILS DES ACTIVITES PASSEES
router.get("/resultats/:id", usersController.activitesIndex);
router.get("/resultats/index/:id/:categorie", usersController.OldActivities);


// LES ROUTES DE LOGIN
router.get("/login", usersController.loginView);
router.get("/logout", usersController.logout, usersController.redirectView);                   // POUR SE DECONNECTER 




router.post("/login", usersController.authenticate);
router.post("/create", usersController.create, usersController.redirectView);
router.post("/create/body",usersController.createBody, usersController.redirectView);
router.post("/create/mind",usersController.createMind, usersController.redirectView);
router.post("/create/social",usersController.createSocial, usersController.redirectView);
router.post("/create/arts",usersController.createArts, usersController.redirectView);
router.post("/create/style",usersController.createStyle, usersController.redirectView);
router.post("/create/cooking",usersController.createCooking, usersController.redirectView);


// LES ROUTES POUR ENREGISTRER ACTIVITES PASSEES
router.post("/saveActivites/:id/corps", usersController.saveActivitiesCorps, usersController.redirectView);   // ON MET LA CATEGORIE EN PARAMETRE POUR LA RECUPERER ET AINSI CIBLER FACILEMENT LES COLLECTION A MAJ
router.post("/saveActivites/:id/esprit", usersController.saveActivitiesEsprit, usersController.redirectView);   // ON MET LA CATEGORIE EN PARAMETRE POUR LA RECUPERER ET AINSI CIBLER FACILEMENT LES COLLECTION A MAJ
router.post("/saveActivites/:id/social", usersController.saveActivitiesSocial, usersController.redirectView);   // ON MET LA CATEGORIE EN PARAMETRE POUR LA RECUPERER ET AINSI CIBLER FACILEMENT LES COLLECTION A MAJ
router.post("/saveActivites/:id/arts", usersController.saveActivitiesArts, usersController.redirectView);   // ON MET LA CATEGORIE EN PARAMETRE POUR LA RECUPERER ET AINSI CIBLER FACILEMENT LES COLLECTION A MAJ
router.post("/saveActivites/:id/style", usersController.saveActivitiesStyle, usersController.redirectView);   // ON MET LA CATEGORIE EN PARAMETRE POUR LA RECUPERER ET AINSI CIBLER FACILEMENT LES COLLECTION A MAJ
router.post("/saveActivites/:id/cooking", usersController.saveActivitiesCooking, usersController.redirectView);   // ON MET LA CATEGORIE EN PARAMETRE POUR LA RECUPERER ET AINSI CIBLER FACILEMENT LES COLLECTION A MAJ


// LES ROUTES POUR CHOPER NOUVELLES ACTIVITES
router.post("/newActivities/:id/corps", usersController.newActivitiesCorps, usersController.redirectView)
router.post("/newActivities/:id/esprit", usersController.newActivitiesEsprit, usersController.redirectView)
router.post("/newActivities/:id/social", usersController.newActivitiesSocial, usersController.redirectView)
router.post("/newActivities/:id/arts", usersController.newActivitiesArts, usersController.redirectView)
router.post("/newActivities/:id/style", usersController.newActivitiesStyle, usersController.redirectView)
router.post("/newActivities/:id/cooking", usersController.newActivitiesCooking, usersController.redirectView)



module.exports = router;