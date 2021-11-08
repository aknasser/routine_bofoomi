const router = require("express").Router();
const bucketList = require("../controllers/bucketListController");



router.get("/:id", bucketList.challenges);  // AFFICHER LA PAGE BUCKETLIST
router.post("/defisReleves/:id/:challengesId", bucketList.missionDone,  bucketList.challenges);  //LA ROUTE POUR METTRE A JOUR LES STEPS ACCOMPLIS




module.exports = router;