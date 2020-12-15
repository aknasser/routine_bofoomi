const router = require("express").Router();
const homeController = require("../controllers/homeController");


// LES ROUTES RELATIVES AU FORMULAIRE

router.get("/start-body/:id", homeController.sportList, homeController.bodyQuizz) // SECTION QUIZZ CORPS
router.get("/start-mind/:id", homeController.disciplineList, homeController.mindQuizz)  // SECTION QUIZZ ESPRIT
router.get("/start-social/:id", homeController.socialQuizz)  // SECTION QUIZZ SOFT SKILLS
router.get("/start-arts/:id", homeController.artList, homeController.artsQuizz)   // SECTION QUIZZ ARTS
router.get("/start-style/:id", homeController.practicalQuizz)  // SECTION QUIZZ SENS PRATIQUE
router.get("/start-cooking/:id", homeController.cookingQuizz)  // SECTION QUIZZ COOK



// LES ROUTES PROPRES A LA HOME PAGE ET CONCEPT PAGE


router.get("/", homeController.home);  // HOMEPAGE 
router.get("/concept", homeController.concept);  // CONCEPT
router.get("/start", homeController.startQuizz) // DEBUT QUESTIONNAIRE





module.exports = router;