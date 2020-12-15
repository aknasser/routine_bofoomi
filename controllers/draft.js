// AJOUT DE NOUVELLES ACTIVITES STYLE

    saveActivitiesStyle:(req, res, next) => {                                 // ACTION POUR SAUVEGARDER ACTIVITE DANS L'USER MODEL ET REDIRIGER VERS LE CHOXI DE NOUVELLE ACTIVITE
            let userActif;                          
            let userId = req.params.id;
            let categorieId;                                                        // Utile pour retrouver le document style correspondant à l'user.
            let categorie = req.params.categorie;
            let activiteDone;   // Créer pour recevoir les valeurs de l'activitésPassées.

            User.findById(userId).populate("style activitesStyle activitesPasseesStyle")
            .then(utilisateur => {                                              // 1 - Trouver l'utilisateur Actif
                userActif = utilisateur;
                console.log(`L'activité de l'user: ${userActif.activitesStyle}`);     // possibilité de variabiliser cela ? Cela nous évitera de le faire pour chaque skills. Utiliser categorie pour variabiliser serait pratique

                activiteDone = {                                               // 2 - Lui créer une nouvelle activite passees
                    titre: userActif.activitesStyle.titre,
                    description: userActif.activitesStyle.description,
                    categorie: userActif.activitesStyle.categorie,
                    sousCategorie:userActif.activitesStyle.sousCategorie,
                    pourcentageOriginal: userActif.activitesStyle.pourcentageOriginal,
                    pourcentageElegance: userActif.activitesStyle.pourcentageElegance,
                    pourcentageBasic: userActif.activitesStyle.pourcentageBasic,
                    totalPtsExp: userActif.activitesStyle.totalPtsExp,
                    noteObtenue: req.body.noteObtenue,
                    user: userActif._id                                   // AVEC cette dernière ligne on fait le join entre ActivitesPasseesCategorie et User. L'activité 
                };
                console.log(`Activite faite, incorporé dans ActivitesPassees: ${activiteDone}`);


                userActif.activitesPasseesStyle.push(activiteDone);           // 3-  PUSHER l'activite terminée DANS L'ARRAY ActivitesPasseesCategorie de l'user

                
                let historiqueUser = userActif.activitesPasseesStyle;               // 4A - On place les activités Passées dans une variable pour une meilleure lisibilité
                let nmbreActivitesPassees = historiqueUser.length;                      //4B - On stocke la longueur de l'array activitésPasséesCategorie dans une variable pour plus de lisibilité
                let activiteAIntegrer = historiqueUser[nmbreActivitesPassees - 1];    // 4 - On récupère le dernier élément de l'array et on le cale dans une variable. (numéro index dernier élément =  length -1)
                console.log(`L'activite à intégrer: ${activiteAIntegrer}`);


                let statsStyle = userActif.style;
                let difficulteActivite = userActif.activitesStyle.difficulte;
                let coefficientDegradation = 1 * Math.pow(0.95, statsStyle.scoreStyle - 1);   // / 5 - On met à jour le score de l'user en utilisant notamment une SUITE GEOMETRIQUE DECROISSANTE. Un = U0 * q^n     SUITE GEOMETRIQUE DECROISSANTE avec n = score - 1 ; q 0.95 et U0 = 1  (plus d'explication en dessous), grâce au coefficient de degradation l'user a besoin de faire de plus en plus d'activités pour maintenir sa progression.

                console.log(`Ancien Score Style:${statsStyle.scoreStyle}`);
                userActif.style.totalExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation;
                userActif.style.colorfulExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageOriginal;
                userActif.style.classyExpAcquise += activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageElegance;
                userActif.style.simpleExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageBasic;
                userActif.style.santeExpAcquise +=  activiteAIntegrer.noteObtenue * difficulteActivite * coefficientDegradation * activiteAIntegrer.pourcentageSante;
                console.log(`L'opération en détail: ${activiteAIntegrer.noteObtenue} * ${difficulteActivite} * ${coefficientDegradation}`);
               
               
                userActif.activitesStyle = undefined;                                                        // 6 - ON vide la key actvitesStyle en lui donnant la valeur undefined.
                console.log(`Activite en Cours(sense etre egal a 'undefined'):${userActif.activiteStyle}`);                       

                console.log(`Nouveau Score Style:${userActif.style.scoreStyle}`);
            })
            .then(() => {
                categorieId = userActif.style._id;
                let newTotal = userActif.style.totalExpAcquise;                       //On cale les nouveaux totaux d'exp acquise dans ces variables, on les utilisera pour updater l'user
                let newPuissance = userActif.style.colorfulExpAcquise;
                let newTechnique =  userActif.style.classyExpAcquise;
                let newSouplesse = userActif.style.simpleExpAcquise


                return Style.findByIdAndUpdate(categorieId,{                           // 7 - On sauvegarde l'entrée ainsi modifiée
                    totalExpAcquise : newTotal,
                    colorfulExpAcquise : newPuissance,
                    classyExpAcquise : newTechnique,
                    simpleExpAcquise :  newSouplesse,
                })        
            })
            .then(() => {
                res.locals.hero = userActif;
                res.locals.redirect = `/users/newActivities/${userId}/${categorie}`;          // Ainsi l'user se retrouve dans la page newActivities relatives à sa catégorie
                next();
            })                                                 


                                    

    },
    choixActivitiesStyleView: (req, res) => {               //La Vue pour choisir les nouvelles activités
        userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.hero = user;
            res.render("user/newActivities/newActivitiesStyle");
        })
    },
    newActivitiesStyle : (req, res, next) => {               // LA ROUTE POUR CREER LA NOUVELLE ACTIVITE DANS LE STYLE DE L'USER 
        let userId = req.params.id;
        let userActif;
        let sousCategorieChoisie = req.body.sousCategorie;           // 1 - Récupérer le choix de sousCategorie fait par l'user
        console.log(`La sousCategorie choisie par l'user: ${sousCategorieChoisie}`);
        
        User.findById(userId)                               // 2- Récupérer l'user 
        .then(utilisateur => {
            userActif = utilisateur;
        })
        .then(() => {
            return ActiviteStyle.countDocuments({sousCategorie: sousCategorieChoisie})              // 3 - Compter le nombre d'entrées correspondant à la sousCategorie choisie par l'userActif
        })                                                   // Pour le moment on chope parmi toutes les activités d'une catégorie, on filtrera par sousCategorie quand on comprendra ce fuckin count
        .then(nmbrEntrees => {
            console.log(`Le nombre d'entrées pour la SousCategorie: ${nmbrEntrees}`);
            let random = Math.floor(Math.random() * nmbrEntrees);                           // 4 - créer une variable pour randomiser en fonction du nombre d'entrées correspondantes aux critères
            return ActiviteStyle.findOne({sousCategorie: sousCategorieChoisie}).skip(random);          // 5 - Choper l'une de ces entrées
        })
        .then (activiteStyle => {     
            userActif.activitesStyle = activiteStyle;                                        // 6 - L'attribuer à l'user dans son ActivitesStyle.
            console.log(`Nouvelle Activité Style:${activiteStyle}`);
            res.locals.redirect = "/users/hero"
            userActif.save();
            next();                                 
        })              
                                                               
         
    },
