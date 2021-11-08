const router = require("express").Router();
const usersController = require("../controllers/usersController");




// LES ROUTES POUR CREER L'USER (C DU CRUD) - PARTIE GET
router.get("/start-body/:id", usersController.objectif, usersController.pageQuizz) // SECTION QUIZZ CORPS

 // LA ROUTE POUR AFFICHER LA PAGE FINALE DU QUESTONNAIRE - PARTIE GET
 router.get("/results/:id",usersController.show, usersController.pageQuizz); //SECTION RESULTATS



// LES ROUTES POUR CREER L'USER (C DU CRUD) - PARTIE POST
router.post("/create", usersController.create, usersController.redirectView);               // La route pour créer l'uer
router.post("/create/objectif",usersController.createObjectif, usersController.feed, usersController.redirectView);   // La route qui nous permet de choisir l'objectif pour l'user pour chaque catégorie



// LES ROUTES DE LOGIN
router.get("/login", usersController.loginView);
router.get("/logout", usersController.logout, usersController.redirectView);                   // POUR SE DECONNECTER 
router.post("/login", usersController.getId, usersController.authenticate);


// LA PAGE UTILISATEUR
router.get("/hero", usersController.hero);

// LA PAGE SOMMAIRE-RESULTATS DE L'USER
router.get("/resultats/:id", usersController.sommaireRoutine);


// LA PAGE POUR AFFICHER LES OBJECTIFS
router.get("/resultats/:id/:aspiration",usersController.aspiration)

// LA PAGE POUR AFFICHER LES ROUTINES PASSEES
router.get("/resultats/:id/:aspiration/:objectifId", usersController.pastRoutine);



// LA ROUTE POUR GERER LA CREATION D'UNE NOUVELLE ROUTINE DONE ET D'UNE NOUVELLE ROUTINE EN COURS 
router.post("/taskDone",usersController.maJroutine, usersController.redirectView);


module.exports = router;