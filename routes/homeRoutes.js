const router = require("express").Router();
const homeController = require("../controllers/homeController");


// LES ROUTES PROPRES A LA HOME PAGE ET CONCEPT PAGE
router.get("/", homeController.home);  // HOMEPAGE 
router.get("/concept", homeController.concept);  // CONCEPT
router.get("/start", homeController.startQuizz) // DEBUT QUESTIONNAIRE




module.exports = router;