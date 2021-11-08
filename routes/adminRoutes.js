const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("", adminController.homeAdmin);
router.get("/action/:categorie",adminController.choixAction);
router.get("/index/:categorie",adminController.indexElement);// 


// LA PARTIE  C DU CRUD (GET)
router.get("/ajout/users",adminController.addElement);
router.get("/ajout/objectifs",adminController.addElement);
router.get("/ajout/routines",adminController.addElement);
router.get("/ajout/betterMan",adminController.addElement);
router.get("/ajout/bucketlist",adminController.addElement);

// LA PARTIE  C DU CRUD (POST)

router.post("/ajout/users", adminController.newElementUser);
router.post("/ajout/objectifs", adminController.newElementObjectif);
router.post("/ajout/routines", adminController.newElementRoutine);
router.post("/ajout/betterMan", adminController.newElementBetterMan);
router.post("/ajout/bucketlist", adminController.newElementBucketList);

//LA PARTIE R DU CRUD (GET)

router.get("/allElements/:categorie", adminController.allElements);


// LA PARTIE U DU CRUD(GET)
router.get("/modifyElement/:schema/:id", adminController.modifiedElement);


// LA PARTIE U DU CRUD (POST)
router.post("/modifyElement/:schema/:id", adminController.updateElement);



// LA PARTIE D DU CRUD (DELETE)
router.delete("/delete/:categorie/:id", adminController.delete, adminController.allElements);        



// ICI AJOUTER LES ROUTES POUR LES AUTRES CATEGORIES


module.exports = router;