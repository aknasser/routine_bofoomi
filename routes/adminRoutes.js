const router = require("express").Router();
const adminController = require("../controllers/adminController");


// LES ROUTES DE VERIFICATION CREATION D'ACTIVITE (Au cours la redirection ne suffit pas)
router.get("/activites/resultatCreationCorps/:id", adminController.confirmationActiviteCorps);
router.get("/activites/resultatCreationEsprit/:id", adminController.confirmationActiviteEsprit);
router.get("/activites/resultatCreationSocial/:id", adminController.confirmationActiviteSocial);
router.get("/activites/resultatCreationArts/:id", adminController.confirmationActiviteArts);
router.get("/activites/resultatCreationStyle/:id", adminController.confirmationActiviteStyle);
router.get("/activites/resultatCreationCooking/:id", adminController.confirmationActiviteCooking);


// LES ROUTES RELATIVES A L'ADMINISTRATION DES ACTIVITES (CREATE)

router.get("/activites", adminController.admin);        // ACCUEUIL ACTIVITE
router.get("/activites/create", adminController.adminCreate);     //PAGE CREATE ACTIVITES
router.get("/activites/createCorps", adminController.activiteCorps);    // CREATION CORPS
router.get("/activites/createEsprit", adminController.activiteEsprit);    // CREATION ESPRIT
router.get("/activites/createSocial", adminController.activiteSocial);    // CREATION SOCIAL
router.get("/activites/createArts", adminController.activiteArts);    // CREATION ARTS
router.get("/activites/createStyle", adminController.activiteStyle);    // CREATION STYLE
router.get("/activites/createCooking", adminController.activiteCooking);    // CREATION COOKING



// LES ROUTES RELATIVES A L'ADMINISTRATION DES ACTIVITES (READ)
router.get("/activites/categorieIndex", adminController.adminCategorieIndex)                    // LA PAGE POUR CHOISIR LA CATEGORIE A MODIFIER/SUPPRIMER/VOIR
router.get("/activites/index/:categorie", adminController.adminIndexView);     //PAGE MODIF ACTIVITES

// LES ROUTES RELATIVES A L'ADMINISTRATION DES ACTIVITES(UPDATE)
router.get("/activites/:id/:categorie/update/edit:categorie", adminController.edit);  // LA ROUTE MENANT AU FORMULAIRE D'EDITION. LA VUE AFFICHEE DEPEND DE LA CATEGORIE DE L'ACTIVITE(CORPS,ESPRIT, ETC).
router.put("/:id/:categorie/update", adminController.update,adminController.redirectView);    // LA ROUTE UPDATE POUR LE CORPS

// LA ROUTE RELATIVES A L'ADMINSTRATION DES ACTIVITES (DELETE)
router.delete("/activites/:id/:categorie/delete", adminController.delete, adminController.redirectView);        



// LES ROUTES DE CREATION D'ACTIVITE
router.post("/activites/createCorps",adminController.creaActiviteCorps, adminController.redirectView);
router.post("/activites/createEsprit",adminController.creaActiviteEsprit, adminController.redirectView);
router.post("/activites/createSocial",adminController.creaActiviteSocial, adminController.redirectView);
router.post("/activites/createArts",adminController.creaActiviteArts, adminController.redirectView);
router.post("/activites/createStyle",adminController.creaActiviteStyle, adminController.redirectView);
router.post("/activites/createCooking",adminController.creaActiviteCooking, adminController.redirectView);






module.exports = router;