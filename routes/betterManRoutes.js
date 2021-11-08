const router = require("express").Router();
const betterManController = require("../controllers/betterManController");



router.get("", betterManController.index);  // INDEX BETTER MAN
router.get("/:page", betterManController.index);  //LA ROUTE POUR LES DIFFERENTES PAGES
router.get("/inspiration/:article", betterManController.article);



module.exports = router;