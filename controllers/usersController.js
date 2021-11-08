const User = require("../models/user");
const obj = require("../models/objectif");
const Routine = require("../models/routine");
const RoutineDone = require("../models/routineDone");
const BetterMan = require("../models/betterMan");
const BucketList = require("../models/bucketList");
const Challenge = require("../models/challenge");
const mongoose = require("mongoose");


// LES AUTRES VARIABLES UTILES EN GLOBAL SCOPE
let newUser;
let countSection = 0;     // Pour savoir à quel moment, nous devons basculer du questionnaire à la page des résultats. Ce basculement a lieu quand l'user post les données pour la 6ème et dernière catégorie catégorie. countSection prend +1 à chaque passage donc quand dès que countSection > 6 on redirige vers la page "results"
let objHero = [];
let routinesHero = [];
let challengesHero = [];

// LES VARIABLES DEDIE AU HERO (user déjà crée)
let userHero;   // dans cette variable, nous calons l'user que nous identifions lors du login.





// La variable sections contient les objects que nous utiliserons pour bouger de page en page. On charge les bons objectifs avec sectionName (à utiliser avec find) et on cale le bon url avec urlRedirect (qui sera caler dans urlNextPage)
let sections = [                    
    {
        sectionName : "corps",
        titrePage : "Corps et Vitalité",
        namePic : "body.png",
        namePicAlt :"un gros point d'interrogation. Décline ton identité",
        sousTitre : "Objectif Corps",
        indexNextPage : 0,
        objectifsUser: []
    },
    {
        sectionName : "esprit",
        titrePage : "Esprit",
        namePic : "mind.png",
        namePicAlt :"ce bon vieux Socrates",
        sousTitre : "Objectif Esprit",
        indexNextPage : 1,
        objectifsUser: []
    },
    {
        sectionName : "social",
        titrePage : "Social",
        namePic : "micro.png",
        namePicAlt :"un joli micro",
        sousTitre : "Objectif Social",
        indexNextPage : 2,
        objectifsUser: []
    },
    {
        sectionName : "arts",
        titrePage : "Arts",
        namePic : "paint.png",
        namePicAlt :"un joli peinture",
        sousTitre : "Objectif Arts",
        indexNextPage : 3,
        objectifsUser: []
    },
    {
        sectionName : "style",
        titrePage : "Style",
        namePic : "dress.png",
        namePicAlt :"ptite robe",
        sousTitre : "Objectif Style",
        indexNextPage : 4,
        objectifsUser: []
    },
    {
        sectionName : "cooking",
        titrePage : "Cooking",
        namePic : "cooking.png",
        namePicAlt :"paye ton cuistot",
        sousTitre : "Objectif Cooking",
        indexNextPage : 5,
        objectifsUser: []
    },
    {
        sectionName : "bucketList",
        titrePage : "Bucket List",
        namePic : "unSceau.png",
        namePicAlt :"un Sceau",
        sousTitre : "Bucket List",
        indexNextPage : 6,
        objectifsUser : []
    },
    {
        sectionName : "fantome",
        titrePage : "Fantome",
        namePic : "ghost.png",
        namePicAlt :"ghost",
        sousTitre : "Objectif Ghost",
        indexNextPage : 7,
        objectifsUser : []
    }

];




// LES VARIABLES RELATIVES A L'AUTHENTIFICATION.
const passport = require("passport");


// CES VARIABLES SONT UTILISES POUR CALER LES DATAS POSTES DANS UN OBJET PUIS L'INTEGRER DANS L'USER DANS LA FB








// ON SE SERVIRA D'USERPARAMS POUR SIMPLIFIER LE CODE PLUS BAS 
const userParams = (body) => {
    return {
        prenom: body.prenom,
        nom: body.nom,
        email: body.email,
        password: body.password,
        age: body.age,
        ville: body.ville,
    };
};






module.exports = {



    // LES ACTIONS DEDIEES AU QUESTIONNAIRE - PARTIE 'GET'
    objectif: (req, res, next) => {
        let originUser = req.header('Referrer')                 // req.header("Referrer") nous permet d'identifier la page d'origine de l'user
        if (originUser.indexOf("start-body") === -1 && originUser.indexOf("results") === -1) {             // indexOf() cherche "start-body" OU 'results' dans le string originUser si il ne le trouve pas, originUser.indexOf("start-body") ==== -1. Donc quand il est égal à -1, on considère que l'user vient de lancer le questionnaire -1 ou vient d'une autre page. Pour les users qui viennent d'une autre page, on pourra remplacer le message d'erreur par une page d'erreur stylisée qui redirige l'user vers la page start
            countSection = 0;                           
            objHero = [];                   // Ainsi quand l'user quitte le questionnaire OU le finit. Nous vidons l'array objHero. Au cas où il souhaite refaire le questionnaire durant cette session.
            routinesHero = [];               // même principe de réinitilisation que pour objHero.
            challengesHero = [];
            for (let i = 0; i < sections.length; i++) {
                sections[i].objectifsUser = [];                              // Ainsi à chaque fois que l'user commence un questionnaire, on vide la valeur des objectifsSUer pour chaque objectifs (dans sa session).
                }
        }
        if (countSection >= 6) {                                            // Si countSection supérieur à 6 on affiche les buckets Lists plutôt que les objectifs
            BucketList.find({})
            .then(challenges => {
                res.locals.objectif = challenges;
                res.locals.categorie = sections[countSection];    
                console.log("CATEGORIE INDEX (CHALLENGES)", res.locals.categorie);           
                next();
            })
            .catch(error => {
                next(error);
            })
        } else {
            obj.find({category : sections[countSection].sectionName})
            .then(goal => {
                res.locals.objectif = goal;
                res.locals.categorie = sections[countSection];  
                console.log("CATEGORIE INDEX", res.locals.categorie);                        
                next();
            })
            .catch(error => {                      // En cas de pépin...
                next(error);
            });       
        }
        console.log("couNTSECTION AVEC LE GET DE LA VIEW", countSection);
     
    },



    show: (req, res, next) => {

        res.locals.groupe = sections;
        console.log("la valeur de la variable locale GROUPE",res.locals.groupe);
        next();                                                 // Une fois que la boucle for a fini son ouvrage on passe à showView
    },


    pageQuizz:(req, res) => {
        if (countSection >= 7) {            // Dès que countsection est supérieur à 6, on passe sur la page des résultat et on remet countSection à 0. Ceci nous permet de passer à la page de fin du quizz (result) et de remettre le compteur à 0 pour l'utiliser à nouveau si nécessaire
            res.render("user/results",{
                id : req.params.id,
            });


        } else if (countSection === sections[countSection].indexNextPage) {                    // Quand countSection == sections [countSection -1].indexNextPage alors les 2 matches et la bonne page s'affiche. Par exemple quand countSection = 2  sections [countSection -1].indexNextPage = section[2-1].indexNextPage, ce qui correspond donc à section[1].indexNextPage, soit le SECOND élément de la chaîne. countSection étant égal à 2. Nous sommes bien sur la page de la seconde section. On affiche donc le start-body avec les objectifs correspondants. Good!
            res.render("user/start-body", {
            id : req.params.id
            
             })
        }

    },



/* AMELIORATION ENVISAGEABLE
1 - Quand l'user fait marche arrière, on ouvre une window pour lui indiquer qu'il sera contraint de recommencer le formulaire
2 - Mettre le formulaire de contact avec email à la fin du questionnaire. Ainsi l'user peut se tromper autant de fois qu'il veut. Son email ne sera enregistré que lorsque tout le reste sera validé. Ainsi il peut recommencer le questionnaire plusieurs fois sans avoir à supprimer son email à chaque fois.
3 - Si l'user charge directement l'URL du questionnaire (ex: http://localhost:1993/start-body/612c0c7714e5d63d08807649), originUser.indexOf("start-body") est undefined. Dans ce cas, on peut créer une page d'erreur stylisée qui le redirige vers le début du questionnaire. 

*/

//CREATE DE L'USER (C du CRUD) - PARTIE 'POST'


    create: (req, res, next) => {
        newUser = new User((req.body));       // LE MODEL "USER" NOUS SERT DE CONSTRUCTOR.
        User.register(newUser, req.body.password, (error, user) => {
            if(user) {
                res.locals.redirect = `start-body/${user._id}`;    // Pour passer la variable _id dans la barre URL elle nous servira à identifier l'user tout le long du formulaire
                next();
            } else {
                res.locals.redirect = "/";
                console.log(error.message);
                next();
            }
        });
    },


// LES OBJECTIFS



    createObjectif: (req, res, next) => {                                           // createObjectif nous sert à alimenter l'user avec ces nouveaux objectifs.
        

        const nouvelObj = async() => {
            userId = req.body.id;             // LE BON ID EST DETECTE :D
            let newObjectif = await req.body.objectif;              //1 - ON cale les objectifs choisis par l'user dans une variable

            for (let i = 0 ; i < newObjectif.length; i++) {
                const objectifCible = await obj.findById(newObjectif[i]);   // - ON récupère l'ensemble de l'object objectif choisi par l'user en allant le choper dans la BDD.

                const nmbreDeRoutine = await Routine.count({code_goal : objectifCible.code_goal}) // 2 - On compte les routines qui possédent le même code goal que l'objectif i choisi par l'user dans le questionnaire
                const random = await Math.floor(Math.random() * nmbreDeRoutine);                // 3 - On multiplie le nombre de routine d'une catégorie donnée par un nombre aléatoire. On arrondi avec Math.floor
                const firstRoutine = await Routine.findOne({code_goal : objectifCible.code_goal}).skip(random); // 4 - Après avoir sauté X éléments (skip(random)), on choisit 1 un élément de la collection Routine correspondant à la catégorie voulue.
                routinesHero.push(firstRoutine);                        // 4- On push la nouvelle Routine qui correspond à l'obj dans la variable routinesHero.
                objHero.push(newObjectif[i]);                           // 4(bis) - On push le newObjectif dans objHero

            }

            await User.findByIdAndUpdate(userId, {             // 5 - Utili Permet d'éviter les problèmes de parallel saving for a same model
                $set: { objectifs : objHero,
                        routinesEnCours : routinesHero
                    },                                      // 6 -Avec $set, on indique que la valeur de objectifs = objHero désormais. A chaque sections objHero s'enrichit en objectifs. De même pour RoutinesEnCours et routinesHero
                  },
                {new : true},                               // 7 - Très important !! Avec {new : true}, on indique à mongoose de renvoyer la NOUVELLE VALEUR de l'objet. Par défaut {new : false}. Si on veut utiliser la valeur nouvellement updaté directement, bien pensé à mettre {new : true}
            )   

        }

        const nouveauxChallenges = async() => {
            userId = req.body.id;             // LE BON ID EST DETECTE :D
            let newChallenges = await req.body.objectif;              //1 - ON cale les objectifs choisis par l'user dans une variable

            for (let i = 0 ; i < newChallenges.length; i++) {
                const challengeReference = await BucketList.findById(newChallenges[i]);   // 2 - ON récupère l'ensemble de l'object objectif choisi par l'user en allant le choper dans la collection BUcketList.
                const challengeCible = await Challenge.create({                                 // 3 - On crée un Challenge qui correspond à ChallengeReference. Cette variable challengeCible sera set dans l'user. On pourra la modifier à souhait. Sans toucher les challenges de Reference (BucketList)
                    user:  userId,                        
                    title : challengeReference.title, 
                    steps : challengeReference.steps, 
                    category : challengeReference.category    
                })
                
                challengesHero.push(challengeCible);                        // 3 - On push le nouveaux challenge qui correspond à l'obj dans la variable routinesHero.
            }




            await User.findByIdAndUpdate(userId, {             // 5 - Utili Permet d'éviter les problèmes de parallel saving for a same model
                $set: { challenges : challengesHero
                    },                                      // 6 -Avec $set, on indique que la valeur de objectifs = objHero désormais. A chaque sections objHero s'enrichit en objectifs. De même pour RoutinesEnCours et routinesHero
                  },
                {new : true},                               // 7 - Très important !! Avec {new : true}, on indique à mongoose de renvoyer la NOUVELLE VALEUR de l'objet. Par défaut {new : false}. Si on veut utiliser la valeur nouvellement updaté directement, bien pensé à mettre {new : true}
            )   

        }

        if (countSection >= 6) {                            // NO TOUCH
            nouveauxChallenges();
        } else {
            nouvelObj();
        }



        next();
    },

    feed : (req, res, next) => {                                                                // feed nous sert à alimenter les sections[i].objectifsUser. A chaque fois que l'user choisit des objectifs, on ajoute également ces derniers à sections pour pouvoirs les recracher tranquillement.
        userId = req.body.id;             // LE BON ID EST DETECTE :D
        newObjectif = req.body.objectif;        // On cale les objectifs / bucket Lists choisies par l'user dans cette variable
            if (countSection >= 6) {
                console.log("JUSTE AVANT INCREMENT(REDIR)", countSection);
                for (let i = 0 ; i < newObjectif.length; i++) {
                    BucketList.findById(newObjectif[i])                                                
                    .then(challenges => {
                            console.log("challenges", challenges); 
                            for (let j = 0; j < sections.length; j++) {
                                if (sections[j].sectionName === "bucketList") {
                                    sections[j].objectifsUser.push(challenges);                 //  caler une boucle for et push dans l'array qui a sectionName === Bucket List mais flemme                        
                                    console.log("LE CONTENU D'OBJECTIFUSER AVEC BUCKET", sections[j]);          
                                }
                            }                                              
                                     
                    })
                }
                res.locals.redirect = `/users/results/${userId}`;   // Pour rediriger vers la page suivante
            } else if (countSection > 5) {
                console.log("JUSTE AVANT INCREMENT(CHALLENGES)", countSection);
  
                res.locals.redirect = `/users/start-body/${userId}`;   // Pour rediriger vers la page suivante 
            } else {
                for (let i = 0 ; i < newObjectif.length; i++) {
                    obj.findById(newObjectif[i])                                                // On recherche l'ensemble de l'objectifs choisi dans la collection obj
                    .then(fullObjectif => {                                                         // fullObjectif contient l'ensemble de cet objectif (auparavant nous n'avions que l'id)
                        for (let j = 0; j < sections.length; j++) {                             // on fait une seconde boucle qui loop dans chaque objet de sections
                            if (fullObjectif.category === sections[j].sectionName) {                // Avec cette boucle nous vérifions à quel catégorie correspond le nouvel objectif. (on compare l'intitulé de la catégory de l'object avec le nom de la section)
                                sections[j].objectifsUser.push(fullObjectif);                           // Quand l'égalité est vérifier on pousse l'objectif dans la section qui lui correspond. L'objectif ainsi poussé pourra être récupéré dans la page des résultats à la fin du formulaire.
        
                            }
                        }         
                    })
                }
            res.locals.redirect = `/users/start-body/${userId}`;   // Pour rediriger vers la page suivante 
            } 
            countSection++;
            console.log("JUSTE APRES INCREMENT", countSection);
            next();
    },


    redirectView : (req, res, next) => {                 // La CB function middleware pour créer la vue pour rediriger vers un chemin d'accès
        let redirectPath = res.locals.redirect;          // Dans les différentes parties du CRUD res.locals.redirect change en fonction des situations (loggin réussi/loggin échoué/ modif, etc...).
        if (redirectPath) {
            res.redirect(redirectPath);
        } else {
        next();                                         // Pour ne pas freezer en cas de redirection comme un con
        }
    },












    validate: (req, res, next) => {
        req
        .sanitizeBody("email")
        .normalizeEmail({              
            all_lowercase: true
        })                                              //Convertit tous les emails en lowercase et efface les espaces blancs avec trim
        .trim();
        req.check("email", "Email n'est pas au bon format").isEmail();                                  // Dans la requête, vérifie que la valeur pour "email" est au format email 
        req.check("password", "Le mot de passe ne peut pas être vide").notEmpty();                      // Dans la requête, vérifie que la valeur pour "email" n'est pas vide

        req.getValidationResult()                                   // Récolte les résultats des validations faites avant et retourne une promesse contenant les erreurs
            .then((error) => {
                if(!error.isEmpty()) {                              // if (!error.isEmpty) ===> si erreur n'est pas vide alors...
                    let messages = error.array().map(e => e.msg);
                    req.skip = true;                                   // Indique que nous allons sauter le prochain middleware dans la chaîne créer dans le main (voir router.post), à savoir usersController.create. Ceci évite donc de créer un user non valide
                    req.flash("error", messages.join(" and "));              // Chaque message d'erreur sera séparé par " and "
                    res.locals.redirect = "/start";
                    next();
                } else {
                    next();                                         // Sans message nous passons au prochain middleware prévu
                }
            });
    },



    
// LOGIN - LOGOUT


    getId: (req, res, next) => {                // Cette petite manip nous permet d'avoir le bon userHero dans le module hero (un peu plus bas, c'est celui qui GET/ render la vue hero)
        let emailUser = req.body.email;
        User.findOne({email : emailUser})
        .then(userLogged => {
            userHero = userLogged;
        })
        next();
    },

    authenticate: 
    passport.authenticate("local", {
        failureRedirect:"/users/login",     //PAGE DE DESTINATION SI ERREUR DE LOGIN (de la part de l'user)
        successRedirect:`/users/hero`,      // PAGE DE DESTINATION EN CAS DE SUCCES
    }),


    loginView: (req, res) => {
        res.render("user/login");
    },
    logout: (req, res, next) => {
        req.logout();                    // La method logout est fourni par passport pour Log out les users
        res.locals.redirect = "/";
        next();  
    },

// LA PAGE HERO

    hero:  (req, res) => {

    const affichage = async() => {
        let actions = [];
        let quetes = [];

        const nmbreArticles = await BetterMan.count({}) // On compte le nombre total d'article
        const random = await Math.floor(Math.random() * nmbreArticles);                // On multiplie le nombre d'article d par un nombre aléatoire. On arrondi avec Math.floor
        const dailyInspiration = await BetterMan.findOne({}).skip(random);              // On saute un nombre d'articles aléatoire avant de faire notre query. Ceci nous permet d'avoir constamment un nouvel article

        const lUser = await User.findById(userHero.id).populate("objectifs")            // Le populate nous permet de récupérer l'objectif en entier (et pas seulement l'id). Ainsi, nous allons pouvoir utiliser l'ensemble des propriétés d'objectifs dans la view "hero"
            for  (let i = 0; i < lUser.routinesEnCours.length; i++) {
                const laRoutine = await Routine.findById(lUser.routinesEnCours[i])
                actions.push(laRoutine);
            }
            for  (let i = 0; i < lUser.objectifs.length; i++) {
                quetes.push(lUser.objectifs[i]);
            }
            await res.render("user/hero", {
                layout:"layoutUser",
                hero : lUser,
                categorie : sections,
                toDo : actions,
                quetes : quetes,
                inspiration : dailyInspiration
            })

        }
        affichage();
    },
    
    maJroutine : (req, res, next) => {
                                                                                    // LA PARTIE POUR CREER UNE NOUVELLE ROUTINE DONE
        const routineMgmt = async() => {

            const myHero = await User.findById(userHero.id).populate("objectifs routinesEnCours");            // Tant que la session est actif la valeur de userHero ne devrait pas poser de souci
            const note = await req.body.noteObtenue;                                                    // On récupère la note obtenue par l'User
            const routineEffectuee = await req.body.routineEffectuee;
            const laRoutine = await Routine.findById(routineEffectuee);
            const newRoutineDone = await RoutineDone.create({
                user : myHero,
                routine: laRoutine,
                noteObtenue: note,
            })                                                                         
                                                                                    // LA PARTIE POUR MAJ LES ROUTINES EN COURS (suppression de l'ancienne et attribution d'une nouvelle)
            const leBonCode = laRoutine.code_goal;
            const RoutineId = laRoutine.id;
            const nmbreDeRoutine = await Routine.count({code_goal : leBonCode}) // On compte les routines qui possédent le même code goal que l'objectif i choisi par l'user dans le questionnaire
            const random = await Math.floor(Math.random() * nmbreDeRoutine);                // On multiplie le nombre de routine d'une catégorie donnée par un nombre aléatoire. On arrondi avec Math.floor
            const newTaf = await Routine.findOne({code_goal : leBonCode}).skip(random); // Après avoir sauté X éléments (skip(random)), on choisit 1 un élément de la collection Routine correspondant à la catégorie voulue.

            const pullRoutine = await User.findByIdAndUpdate(userHero.id, {
                $pull: {
                    "routinesEnCours": {$in: [RoutineId] }                  // ici nous retirons de l'array routinesEnCours, l'élément qui a un id identique à celui de la Routine qui vient d'être faite. 
                    },
                },
                {upsert: true, new: true},
            )                                                                      //AJOUTER $PULL (pas trop compliqué!!!!!) Utiliser ce lien : https://docs.mongodb.com/manual/reference/operator/update/pull/ 
            const myHeroImproved = await User.findByIdAndUpdate(userHero.id, {
                $push : {
                    "routinesEnCours" : newTaf,                           // On pousse la nouvelle routine à faire (newTaf) dans l'array routinesEnCours de l'user
                    "routinesDone" : newRoutineDone                        // On pousse la nouvelle routine dans l'array routinesPassees du model User
                    }
                },
                {upsert: true, new : true}                               // 7 - Très important !! Avec {new : true}, on indique à mongoose de renvoyer la NOUVELLE VALEUR de l'objet. Par défaut {new : false}. Si on veut utiliser la valeur nouvellement updaté directement, bien pensé à mettre {new : true}
            )          
                                            // Une fois que toutes les opérations ont été effectuées au passé au middleware suivants. Ainsi on s'assure que les bonnes infos seront au bon endroit à temps.

            res.locals.redirect = `/users/hero`                                       // FIN DE LA PARTIE POUR CALER UNE NOUVELLE ROUTINE EN COURS                                                       
            await next();     
        }
    
    routineMgmt()
  
    },



// LA PAGE DES RESULTATS PASSEES

    sommaireRoutine : (req, res) => {
        res.render("user/oldActivities/activiteIndex", {
            layout:"layoutUser",
            id: req.params.id,
            categories : sections
        })
    },

    aspiration : async (req, res) => {     // ON UTILISE PAST ROUTINE POUR FAIRE TRANSITER LES DONNEES
        let aspiration = req.params.aspiration;       //1 - On stocke la valeur du groupe d'objectif dans cette variable (par exemple, corps)
        let userId = req.params.id;                   // 2 - on se sert de cette variable pour retrouver l'user
        let objectifs = [];                             // 3 - On crée cette variable vide en amont. Elle servira à stocker les objectifs qui ont un "category" === aspiration
        let hero = await User.findById(userId).populate("objectifs");  // 4 - On retrouve l'user en prenant soin de populate "objectifs". Cela nous permet d'avoir accès à la propriété category du model objectif

        for (let i = 0; i < hero.objectifs.length; i++) {           // 5 -Combo for / if : On parcours les objectifs de l'use...
            if (hero.objectifs[i].category === aspiration) {        // ...Dès qu'un objectif a une propriété catégorie identique à aspiration...
                objectifs.push(hero.objectifs[i]);                  // ...On le pousse dans l'array objectifs crée en amont
            }
        }
        res.render("user/oldActivities/recapObjectifs", {           // 6 - On affiche la vue en transférant dans la vue l'iD de l'user et l'array objectifs. Dans la vue on parcourera cet objet objectifs pour afficher l'ensemble des objectifs. BOOM.
            layout:"layoutUser",
            id: req.params.id,
            aspiration : req.params.aspiration,
            objectifs : objectifs
        })                                     

    },
    pastRoutine : async (req, res) => {
        let userId = req.params.id;
        let objectifId = req.params.objectifId;
        let objectifCible ;
        let oldRoutines = [];
        let hero = await User.findById(userId).populate("objectifs routinesDone")
        .populate({                                                                     // On utilise ce schéma de populate pour poulate un subdocument.
            path: "routinesDone",
            populate : {
                path: "routine",
                model : "Routine"
            }
        })
                                                                                                                         // 4 - On retrouve l'user en prenant soin de populate "objectifs". Cela nous permet d'avoir accès à la propriété category du model objectif
        for (let i = 0; i < hero.objectifs.length; i++) {
            if (hero.objectifs[i].id === objectifId) {
                objectifCible = hero.objectifs[i];
            }
        }




    for (let i = 0; i < hero.routinesDone.length; i++) {           // 5 -Combo for / if : On parcours les objectifs de l'use...
            for (let j = 0 ; j < objectifCible.routine.length; j++) {

                if (JSON.stringify(hero.routinesDone[i].routine.id) === JSON.stringify(objectifCible.routine[j])) {        // On utilise JSON.stringify pour s'assurer que les 2 objets seront du même type lors de la comparaison, nécessaire pour vérifier l'égalité / condition
                    oldRoutines.push(hero.routinesDone[i]);                  // ...On le pousse dans l'array objectifs crée en amont
                }
            }
        }
    
// 
    const notes = ["F", "D", "C", "B", "A", "S"];
    const countNotes = [];
    for (let i = 0; i < notes.length; i++) {
        let nombreDeNotes = oldRoutines.filter(routine => routine.gradeLetter === notes[i]).length;
        countNotes.push(nombreDeNotes);
    }     

        res.render("user/oldActivities/routinesDone", {
            layout:"layoutUser",
            id: req.params.id,
            routinesPassees : oldRoutines,
            numberNotes : countNotes,
            objectif : objectifCible
        })
    },




}





