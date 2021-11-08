const router = require("express").Router();
const homeController = require("../controllers/homeController");


// LES ROUTES PROPRES A LA HOME PAGE ET CONCEPT PAGE
router.get("/", homeController.home);  // HOMEPAGE 
router.get("/concept", homeController.concept);  // CONCEPT
router.get("/start", homeController.startQuizz) // DEBUT QUESTIONNAIRE


// LES ROUTES RELATIVES AU FORMULAIRE
router.get("/start-body/:id", homeController.objectif, homeController.pageQuizz) // SECTION QUIZZ CORPS


 // LA ROUTE POUR AFFICHER LA PAGE FINALE DU QUESTONNAIRE
router.get("/results/:id", homeController.show, homeController.showView); //SECTION RESULTATS



module.exports = router;