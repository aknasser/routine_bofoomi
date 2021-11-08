// MODELS POUR LA LISTE DS DANS START-BODY
const User = require("../models/user");
const Objectif = require("../models/objectif");
const Routine = require ("../models/routine");
const BetterMan = require("../models/betterMan")
const BucketList = require("../models/bucketList");
const mongoose = require("mongoose");



const categories = 
    [{
        title: "Users",
        schema : "User",
        nameLink: "users",
        all: []
    },
    {
        title: "Objectifs",
        schema : "Objectif",
        nameLink: "objectifs",
        all: []  
    },

    {
        title: "Routines",
        schema: "Routine",
        nameLink: "routines",
        all : [] 

    },

    {
        title: "Better Man",
        schema: "BetterMan",
        nameLink: "betterMan",
        all: []

    },

    {
        title: "Bucket List",
        schema: "BucketList",
        nameLink: "bucketList",
        all: [] 

    }]


    const sections = 
        [{
            name: "corps",
            code_goal: ["abdo", "5KM", "10km", "15km","first_option_basket"]
        },
        {
            name: "esprit",
            code_goal: ["conscience", "courage", "bizdev"]

        },

        {
            name: "social",
            code_goal: ["amis", "inspiration", "personal_branding"]

        },

        {
            name: "arts",
            code_goal: ["ecriture", "musique"]

        },

        {
            name: "style",
            code_goal: ["maison", "fringue"]

        },

        {
            name: "cooking",
            code_goal: ["new_recipes", "veggie_recipes"]

        }];


    let elementSelected;            // elementSelected nous permet de détecter la catégorie d'object (user, routine, objectifs) que nous souhaitons modifier/ supprimer / ajouter
    let newRoutine = [];  // Cette variable est utilisée pour alimenter les firstRoutines. Une fois que newRoutine est alimenté. On la "set" dans l'user (pour sa propriété RoutineEnCours)

    const userParams = (body) => {                                                      //Cette variable nous servira de constructor pour facilement ajouter des Users
        return {
            prenom: body.prenom,
            nom: body.nom,
            email: body.email,
            password: body.password,
            age: body.age,
            ville: body.ville,
            objectifs : body.objectif,
            challenges : body.challenge
        }
    }



    const detectionCategorie = (categorie) => {                         // En fonction du name-link, elementSelected change de valeur (user, objectif...etc)
        typeElement = categorie;
        for (let i = 0; i < categories.length; i++) {
            if (typeElement === categories[i].nameLink || typeElement === categories[i].schema) {
                elementSelected = categories[i];
            }
        }
    return elementSelected;
    }





module.exports = {
    homeAdmin : async (req, res) => {   
        res.render("admin/adminHome", {
           items : categories
        })
    },

    indexElement : async (req, res) => {                                           
        res.render("admin/adminHome", {
           items : categories
        })
    },

    choixAction : async (req, res, next) => { 
        detectionCategorie(req.params.categorie);                       // Nous permet de savoir dans quel catégorie nous nous trouvons (users, routines, objectifs, challenges, Bucket List, Better man )
        res.render("admin/adminAction", {
            element : elementSelected
        })

    },

    choixActionUser : async (req, res, next) => { 
        detectionCategorie(req.params.categorie);                       // Nous permet de savoir dans quel catégorie nous nous trouvons (users, routines, objectifs, challenges, Bucket List, Better man )
        res.render("admin/actionUser", {
            element : elementSelected
        })

    },


    addElement : async (req, res) => {                                              // L'action GET qui mène à la vue dédiée aux ajouts d'éléments
        detectionCategorie(req.params.categorie);
        const allObjectifs = await Objectif.find({});
        const allBucketList = await BucketList.find({});
        
        res.render(`admin/newElement-${elementSelected.nameLink}`, {                // elementSelected.nameLink nous permet de récupérer le nameLink de l'élément sélectionné. En complétant ainsi l'adresse à choper pour le render on évite de copier plusieurs fois ce code
           element : elementSelected,
           sections : sections,
           objectifs : allObjectifs,
           bucketList : allBucketList
        })
    },
                                                                // LA PARTIE C DU CRUD. Possible de factoriser un peu plus bas car code répétitif à un moment.
    newElementUser : async (req, res) => {
        let newUser = await new User(userParams(req.body));                                                             // CE COMBO newUser et User.register sont propre au package PASSPORT. Ceci nous permet d'avoir un user crée avec un password hash proprement dès le début!
        await User.register(newUser, req.body.password)                                                                 // De l'importance d'AWAIT. La création de l'user prend du temps. sans await, nous nous retrouvons à updater quelque chose qui n'a pas encore été crée

        for (let i = 0 ; i < newUser.objectifs.length ; i++) {
            const objectifCible = await Objectif.findById(newUser.objectifs[i]);
            const nmbreRoutine = await Routine.count({code_goal : objectifCible.code_goal});
            const random = await Math.floor(Math.random() * nmbreRoutine);
            const firstRoutine = await Routine.findOne({code_goal : objectifCible.code_goal}).skip(random);
            newRoutine.push(firstRoutine);

        }

        console.log("Les new routines:", newRoutine);
        console.log(newUser.id);
        let userCompleted = "dodo"
        userCompleted = await User.findByIdAndUpdate(newUser.id, {
                $set : {
                    routinesEnCours : newRoutine
                },
            },
            {new: true}
        )
        console.log("L'user complètement crée :", userCompleted)
        await res.redirect(`/admin/action/users`);

    },

    newElementObjectif : async (req, res) => {
        let specs = req.body;
        let newObjectif = await Objectif.create({
            title : specs.title,
            category : specs.category,
            code_goal : specs.code_goal,
        })

    console.log ("L'objectif crée", newObjectif);
    await res.redirect(`/admin/action/objectifs`);
    },

    newElementRoutine : async (req, res) => {
        let specs = req.body;
        let objectifMatch = await Objectif.findOne({code_goal : req.body.code_goal});      // On récupère le code_goal de l'objectif correspondant.



        let newRoutine = await Routine.create({
            title : specs.title,
            description : specs.description,
            advice : specs.advice,
            time : specs.time,
            category : specs.category,
            code_goal : specs.code_goal,
            objectif : objectifMatch,
        })

        let extraRoutine = await Objectif.findByIdAndUpdate(objectifMatch, {
            $push : {
                routine : newRoutine.id
            },
        },
        {new : true})

    console.log ("La routine créee", newRoutine);
    console.log("L'Objectif MàJ", extraRoutine);

    await res.redirect(`/admin/action/routines`);
    },

    newElementBetterMan : async (req, res) => {
        let specs = req.body;
        let newArticle = await BetterMan.create({
            title : specs.title,
            content : specs.content,
            picture : specs.picture,
        })

        console.log ("L'objectif crée", newArticle);
        await res.redirect(`/admin/action/betterMan`);
    },

    newElementBucketList : async (req, res) => {
        let specs = req.body;
        let newChallenge = await BucketList.create({
            title : specs.title,
            steps : specs.steps,
            category : specs.category,
        })

        console.log ("L'objectif crée", newChallenge);
        await res.redirect(`/admin/action/bucketList`); 
    },






    allElements : async (req, res) => {                                      // LE READ DU CRUD
        const allUsers = await User.find({})
        const allObjectifs = await Objectif.find({});
        const allRoutines = await Routine.find({});
        const allBetterMen = await BetterMan.find({});
        const allBucketList = await BucketList.find({});

        const allItems = await [allUsers, allObjectifs, allRoutines, allBetterMen, allBucketList];  
        for (let i = 0; i < allItems.length; i++) {                                                            // allItems et categories sont de mêmes longueur et on leur categorie ordonnés de la même manière. On peut donc faire une seule boucle. La bonne practice serait de les définir directement dans l'objet categorie
            categories[i].all = allItems[i];
        }
        
        
        let element;

        for (let i = 0 ; i < categories.length; i++) {
            if (req.params.categorie === categories[i].nameLink) {
                element = categories[i];
            }
            
        }
        console.log("ALL",element.all);


        res.render("admin/allElements", {
            element : element.all,
            categorie: element
        })
    },


// LA PARTIE U DU CRUD ( reprend la même structure que la partie C mais on utlise FindByIdAndUpdate combiné à $set)
    modifiedElement : async(req, res) => {
        let elementId = req.params.id;
        let schema = req.params.schema
        let categorieModel = mongoose.model(schema);
        const toModify = await categorieModel.findById(elementId);
        const allObjectifs = await Objectif.find({});
        const allChallenges = await BucketList.find({});
        console.log("TO MODIFY", toModify);
        
        res.render(`admin/update/modifyElement-${schema}`, {
            schema : schema,
            element : toModify,
            sections : sections,
            objectifs : allObjectifs,
            bucketList: allChallenges
        })
    },

    updateElement : async (req,res) => {
        let elementId = req.params.id;
        let schema = req.params.schema;
        let elementUpdate;
        detectionCategorie(schema);

        switch (schema) {
            case "User":
                console.log("case User")
                for (let i = 0 ; i < req.body.objectif.length ; i++) {
                    const objectifCible = await Objectif.findById(req.body.objectif[i]);
                    const nmbreRoutine = await Routine.count({code_goal : objectifCible.code_goal});
                    const random = await Math.floor(Math.random() * nmbreRoutine);
                    const firstRoutine = await Routine.findOne({code_goal : objectifCible.code_goal}).skip(random);
                    newRoutine.push(firstRoutine);
        
                }

                elementUpdate = await User.findByIdAndUpdate(elementId, {
                    $set : {
                        prenom : req.body.prenom,
                        nom : req.body.nom,
                        email : req.body.email,
                        age : req.body.age,
                        ville : req.body.ville,
                        objectifs : req.body.objectif,
                        challenges : req.body.challenge,         
                        routinesEnCours : newRoutine
                            },
                        },
                        {new: true}
                    )
                    break;

            case "Objectif":
                console.log("case Objectif")
                elementUpdate = await Objectif.findByIdAndUpdate(elementId, {
                    $set : {
                        title : req.body.title,
                        category : req.body.category,
                        code_goal : req.body.code_goal,
                            },
                        },
                        {new: true}
                    )
                    break;

            case "Routine":
                console.log("case Routine")
                let objectifMatch = await Objectif.findOne({code_goal : req.body.code_goal});      // On récupère le code_goal de l'objectif correspondant.
                elementUpdate = await Routine.findByIdAndUpdate(elementId, {
                    $set : {
                        title : req.body.title,
                        description : req.body.description,
                        advice : req.body.advice,
                        time : req.body.time,
                        ville : req.body.ville,
                        category : req.body.category,
                        code_goal : req.body.code_goal,         
                        objectif : objectifMatch,
                            },
                        },
                        {new: true}
                    )
                    break;

            case "BetterMan":
                console.log("case BetterMan")
                elementUpdate = await BetterMan.findByIdAndUpdate(elementId, {
                    $set : {
                        title : req.body.title,
                        content : req.body.content,
                        picture : req.body.picture,
                            },
                        },
                        {new: true}
                    )
                    break;

            case "BucketList":
                console.log("case BucketList")
                elementUpdate = await BucketList.findByIdAndUpdate(elementId, {
                    $set : {
                        title : req.body.title,
                        steps : req.body.steps,
                        category : req.body.category,
                            },
                        },
                        {new: true}
                    )
                    break;
            }

            console.log("ELEMENTUPDATE:", elementUpdate);

        res.redirect(`/admin/action/${elementSelected.nameLink}`);
    },

// LA PARTIE D DU CRUD

    delete : async (req, res, next) => {

    let itemId = req.params.id;
    detectionCategorie(req.params.categorie);

    let categorieModel = mongoose.model(`${elementSelected.schema}`);
    const toDelete = await categorieModel.findByIdAndRemove(itemId)
    console.log("La valeur supprimée", toDelete);

        await next();     // Pour retourner vers l'index
    }

};