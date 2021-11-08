// AVEC CE FICHIER NOUS REMPLISSONS LES ROUTINES
// ALIMENTER LES OBJECTIFS AVEC seedobjectifs.js avant d'utiliser ce seed.
// A terme penser à les fusionner ensemble

const mongoose = require("mongoose");
const Routine = require("../models/routine");
const Objectif = require("../models/objectif")


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


let lesObjs;
let lesRoutines;


//L'ALIMENTATION DE LA COLLECTION "routines" commence ici.


const alimentation = async() => {
    const clean = await Routine.deleteMany({}) 
    // SECTION CORPS
    
    // ABDO
        const routineGainage = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Circuit Gainage Intégral x 3",
            description: "Alterner gainage de face, gauche, droite et battement de pied. 30 secondes pour chaque gainage. Répéter cette routine 3 fois",
            advice: "Ce qui compte, c'est la qualité du gainage. Tu dois sentir que les abdos se contractent" ,
            time: 5,
            category: "corps",
            code_goal: "abdo"
        }) 
    
        const routineAssouplissements = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"5KM RUN",
            description: "Tout est dans le titre.",
            advice: "Essayer de partir assez fort et de maintenir l'effort. Il est plus simple de maintenir un rythme soutenu que de l'atteindre plus tard avec la fatigue accumulé" ,
            time: 25,
            category: "corps",
            code_goal: "5KM"
        });
    
    // 5KM
        const fiveKmRun = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"5KM RUN",
            description: "Tout est dans le titre.",
            advice: "Essayer de partir assez fort et de maintenir l'effort. Il est plus simple de maintenir un rythme soutenu que de l'atteindre plus tard avec la fatigue accumulé" ,
            time: 25,
            category: "corps",
            code_goal: "5KM"
        });
    
        const fartlek = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Fartlek",
            description: "10 run d'une minute à un rythme supérieur à celui du 5K. Entre chaque run jogger pendant 1 min",
            advice: "Jouer le jeu sinon cela ne sert à rien" ,
            time: 12,
            category: "corps",
            code_goal: "5KM"
        });
    
    // 10KM
        const tenKmRun = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"10KM RUN",
            description: "Tout est dans le titre.",
            advice: "Dans la mesure du possible essayer d'être le plus régulier pour le temps au kilomètre. S'appuyer sur Strava si nécessaire" ,
            time: 55,
            category: "corps",
            code_goal: "10KM"
        });
    
        const etirementsJambes = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Etirements des membres inférieures",
            description: "Mollet - Quadri - Fessier",
            advice: "Vraiment jouer le jeu et bien respirer" ,
            time: 10,
            category: "corps",
            code_goal: "10KM"
        });
    
        const tempsMoyen = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Taper son temps moyen - 5 secondes. X5 (avec séquence de repos d'une 1 minute)",
            description: "Si ton temps moyen sur 10km = 4:30, tu dois courir 5 fois en 4:25. Avec une minute de repos",
            advice: "Profiter de cette exercice pour travailler la foulée" ,
            time: 20,
            category: "corps",
            code_goal: "10KM"
        });
    
        const rouleau = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Rouleau!!",
            description: "Masser ses muscles intérieures avec le rouleau",
            advice: " S'attarder sur les zones douloureuses / dures" ,
            time: 10,
            category: "corps",
            code_goal: "10KM"
        });

    
    
    // 15KM
        const fifteenKmRun = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
                 title:"15KM RUN",
                 description: "Tout est dans le titre.",
                 advice: "Commencer doucement, bien faire attention à ses appuis pour ne pas se blesser (coucou essui-glace) " ,
                 time: 90,
                 category: "corps",
                 code_goal: "15KM"
             });
        
        const etirementJambes2 = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
                  title:"Etirements des membres inférieures",
                  description: "Mollet - Quadri - Fessier",
                  advice: "Vraiment jouer le jeu et bien respirer" ,
                  time: 10,
                  category: "corps",
                  code_goal: "15KM"
              });
    
        const respiration = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
                 title:"Exercice respiratoire",
                 description: "S'allonger sur le dos , respirer profondément. Le but est de sentir ses muscles se désactiver. Une fois que c'est fait, les réactiver lentement.",
                 advice: "Y aller progressivement. Désactiver les muscles en partant du haut vers le bas. Les activer en partant du bas vers le haut. Essayer de visualiser des flux colorés pour un meilleur résultats." ,
                 time: 10,
                 category: "corps",
                 code_goal: "15KM"
             });
    
        const rouleau2 = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
                 title:"Rouleau!!",
                 description: "Masser ses muscles intérieures avec le rouleau",
                 advice: " S'attarder sur les zones douloureuses / dures" ,
                 time: 10,
                 category: "corps",
                 code_goal: "15KM"
             });
    
    
    // BASKET
        const pickUpGame = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Pick-up Game : tenter au moins 3 shoots / match",
             description: "Prendre son courage à demain et conclure l'offensive sur au moins 3 actions",
             advice: "Tu rates tout les shoots que tu ne prends pas" ,
             time: 0,
             category: "corps",
             code_goal: "first_option_basket"
         });
    
        const hundredShoot = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"100 shoots",
              description: "Prendre 100 shoots à mi-distance. Commencer par des shoots standards, puis enchainer avec des shoots en sortie de dribble. Dynamique sur le rebond. Si plus de 2 rebonds,  le shoot ne compte pas.",
              advice: "Bien positionner ses appuis et s'appliquer sur la posture. Coude rentré vers l'intérieur. Jambes légerement écarté. Faire un mouvement fouetté avec la main. " ,
              time: 45,
              category: "corps",
              code_goal: "first_option_basket"
          });
    
        const handle = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Handle Practice",
             description: "Dribble main gauche / main droite en faisant rebondir la balle à différentes hauteurs - 3 série de 10 pour chaque main | Promener le chien (2 mains) 3 séries de 10 pour chaque main | Crossover à différentes hauteurs | Le grand 8 dans les 2 sens | Hésitation 5 séries de 10 | 1:30 freestyle | Attaque de panier furieux x20",
             advice: "Essayer de faire rebondir la balle le plus fort possible. quitte à faire des erreurs." ,
             time: 20,
             category: "corps",
             code_goal: "first_option_basket"
         });
    
    
    
    // SECTION ESPRIT
    // CONSIENCE
    
        const betterMan = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Ecrire un better man",
             description: "Ecrire un précepte du Better Man. S'inspirer des préceptes déjà établies ou en créant from scratch le cas échéant",
             advice: "Ne pas se concentrer sur la longueur mais sur la sincérité du texte" ,
             time: 30,
             category: "esprit",
             code_goal: "conscience"
         });
     
        const journal = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"1 journal de bord vidéo",
              description: "Faire une vidéo simple pour décrire son actualité du moment.",
              advice: "Ne pas se prendre au sérieux et juste aller avec le flow. PRO TIP : Faire la vidéo en Anglais" ,
              time: 15,
              category: "esprit",
              code_goal: "conscience"
          });
    
    // COURAGE
        const fear = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"Face à la peur",
              description: "Ce matin quel action / tâche te fait trembler. Qu'est-ce qui suscite de l'appréhension ?  Dès que tu l'as identifié, fais y face avec légereté. Tu ne peux pas perdre.",
              advice: "Ne pas hésiter à coucher sur le papier, ce qui nous fait peur pour remonter à la racine de la peur" ,
              time: 5,
              category: "esprit",
              code_goal: "courage"
          });
    
    
    // BIZDEV
        const elocution = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"Exercice d'élocution",
              description: "Prononcer chaque lettre de l'alphabet en ouvrant grand la bouche | Lire un article du courrier International avec un stylo dans la bouche",
              advice: "Pour l'exercice du stylo, alterner position horizontal et vertical (en le positionnant sur l'un des côtés de la bouche) pour de meilleurs résultats" ,
              time: 5,
              category: "esprit",
              code_goal: "bizdev"
          });
        
        const pitch = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
               title:"Répétition du Pitch",
               description: "Prendre un produit / solution star de Google (par ex Big Query) et se le pitcher",
               advice: "Pitcher d'abord à sa sauce, regarder les supports sur cloudhub, puis pitcher à nouveau " ,
               time: 5,
               category: "esprit",
               code_goal: "bizdev"
           });
        
        const productKnowledge = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"Product Knowledge",
              description: "Se poser 5 minutes et explorer 5 produits star de GCP",
              advice: "Rester high-level et se concentrer sur les benefits et la PUV du produit" ,
              time: 30,
              category: "esprit",
              code_goal: "bizdev"
          });
     
        const actuBizDev = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"Checker actu bizdev (veille)",
              description: "Tout est dans le titre. On est sur de la veille.",
              advice: "Utiliser Linkedin + Google pour identifier les nouvelles tendances marketing et Biz Dev" ,
              time: 20,
              category: "esprit",
              code_goal: "bizdev"
          });
    
    // SECTION SOCIAL
    // AMIS
        const inconnu = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Parler à un inconnu",
             description: "Tout est dans le titre. Sans forcer, en fonction du flow. Echanger une phrase avec un inconnu",
             advice: "Faire une remarque est un bon ice-breaker. Poser une question marche également " ,
             time: 5,
             category: "social",
             code_goal: "amis"
         });
    
        const sortie = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"Proposer une sortie à un pote",
              description: "Tout est dans le titre",
              advice: "Les 1-1 avec les potes permettent de tisser de belles connexions. Eviter les grosses soirées à plus de 12 personnes (sauf en fin de soirée)" ,
              time: 5,
              category: "social",
              code_goal: "amis"
          });
    
    
    // INSPIRATION
        const rire = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"Yoga du Rire",
              description: "Pendant 5 minutes rigoler à s'en exploser les boyaux. Les effets sont impressionnants",
              advice: "Ne pas se prendre au sérieux et penser à des choses positives." ,
              time: 5,
              category: "social",
              code_goal: "inspiration"
          });
    
        const anki = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Ajouter 10 nouveaux mots sur Anki",
             description: "Trouver 5 mots relativement courant et les ajouter à Anki Flashcards",
             advice: "Trouver des mots que j'entends régulièrement mais que je n'ai pas encore intégré" ,
             time: 5,
             category: "social",
             code_goal: "inspiration"
         });
    
    
        const video = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"1 journal de bord vidéo",
             description: "Faire une vidéo simple pour décrire son actualité du moment.",
             advice: "Ne pas se prendre au sérieux et juste aller avec le flow. PRO TIP : Faire la vidéo en Anglais" ,
             time: 15,
             category: "social",
             code_goal: "inspiration"
         });
    
     
    // BRANDING
        const socialNetwork = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"1 post Instagram / FB",
              description: "Self-explanatory",
              advice: "Avant de poster, se demander: 'Comment ai-je envie d'être perçu ?'" ,
              time: 5,
              category: "social",
              code_goal: "personal_branding"
          });
        
        const linkedin = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
               title:"1 post Linkedin",
               description: "Self-explanatory",
               advice: "Se créer une image de marque professionnel. Une bonne image doit pouvoir t'être utile quelque soit ta fonction / employeur. Ne pas juste poster du corporate." ,
               time: 5,
               category: "social",
               code_goal: "personal_branding"
           });
    
    
    // SECTION ARTS
    // ECRITURE
        const crayon = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Prendre le crayon pendant 5min",
             description: "Ecrire quelque chose, n'importe quoi. Cela peut être les chroniques du XXI ou le roman. Juste écrire.",
             advice: "Ne pas se prendre sur la forme. Cela se peaufine au fil de l'eau et à force d'écrire" ,
             time: 5,
             category: "arts",
             code_goal: "ecriture"
         });
    
        const chronique = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Reporter les Chroniques sur Drive",
             description: "Copier les chroniques sur le fichier Docs dédié.",
             advice: "Ne pas en modifier le fond mais si nécessaire en peaufiner la forme. Le faire en musique pour que cela passe mieux" ,
             time: 25,
             category: "arts",
             code_goal: "ecriture"
         });
    
    
     //MUSIQUE
        const gratte = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"Prendre la gratte pendant 5 min",
              description: "Jouer de la guitare rythmique, trouver un pattern et le jouer",
              advice: "Se laisser aller. Ne pas décourager." ,
              time: 5,
              category: "arts",
              code_goal: "musique"
          });
    
        const chant = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Chanter pendant 5 min",
             description: "Tout est dans le titre",
             advice: "Chanter en douceur, sans forcer la voix. Sourire et s'amuser. Penser à son estomac pour chanter et prendre le temps de respirer." ,
             time: 5,
             category: "arts",
             code_goal: "musique"
         });
    
    // SECTION STYLE
    // MAISON
        const menage = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Mini-ménage",
             description: "Checker l'état de l'appartement et nettoyer / ranger ce qui semble aller de travers",
             advice: "Ce mini-ménage te permettra d'être plus tranquille les samedis matins" ,
             time: 15,
             category: "style",
             code_goal: "maison"
         });
    
     //FRINGUE
        const pinterest = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Checker les tendances Pinterest",
             description: " Rechercher des styles de vêtements sympas sur Pinterest et Google Images",
             advice: "Pense à l'image que tu veux renvoyer" ,
             time: 10,
             category: "style",
             code_goal: "fringue"
         });
    
        const panoplie = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"Réfléchir à une panoplie",
              description: "Checker ses vêtements et réflechir à de nouvelles idées pour les combiner.",
              advice: "Eviter d'avoir plus de 3 couleurs différentes. Une seule pièce à motif." ,
              time: 10,
              category: "style",
              code_goal: "fringue"
          });
    
    
    
    // SECTION COOKING
    // NEW RECIPES
    
        const newRecipe = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Tester une nouvelle recette (normal)",
             description: "Tester une nouvelle recette. De préférence une recette goûtée quelque part (resto, amis, etc).",
             advice: "De préférence, choisir une recette goûtée quelque part (resto, amis, etc). Pour le premier essai, suivre scrupuleusement les consignes" ,
             time: 45,
             category: "cooking",
             code_goal: "new_recipes"
         });

        const perfectingRecipe = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Retravailler une recette connue",
             description: "Prendre une recette du Blue Book et voir quel ingrédient peut être ajouté, enlevé ou retravaillé",
             advice: "Faire preuve de créativité mais aussi de pragmatisme. Dans bien des cas, less is more." ,
             time: 45,
             category: "cooking",
             code_goal: "new_recipes"
         });
        
        const superCooking = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
              title:"10X Cooking",
              description: "Prendre une recette du Blue Book et sublimer chaque ingrédient à son maximum.",
              advice: "Au lieu de mélanger les ingrédients à l'arrache, le faire soigneusement en travaillant les ingrédients en amont pour un meilleur résultat" ,
              time: 45,
              category: "cooking",
              code_goal: "new_recipes"
          });
    
    // VEGGIE RECIPES
        const newVeggieRecipe = await Routine.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
             title:"Tester une nouvelle recette (Veggie)",
             description: "Tester une nouvelle recette Veggie.",
             advice: "De préférence, choisir une recette goûtée quelque part (resto, amis, etc). Pour le premier essai, suivre scrupuleusement les consignes. Ouvrir ses chakras et faire preuve d'audace." ,
             time: 45,
             category: "cooking",
             code_goal: "veggie_recipes"
         });

        const allObjectifs = await Objectif.find({});
        const allRoutines = await Routine.find({});

        return await{                                       // On retourne ces 2 valeurs pour pouvoir les utiliser dans la "chaîne" suivante
            allObjectifs,
            allRoutines
        };                          
};

alimentation()                  // ON APPELLE LA FONCTION ASYNCHRONE POUR ALIMENTER LA BDD
    .then(todo => {
        lesObjs = todo.allObjectifs;
        lesRoutines = todo.allRoutines;
    })
    .then( () => {
        console.log("Objectifs", lesObjs.length);
        console.log("Routines", lesRoutines.length);     
        for (let i = 0; i < lesObjs.length; i++) {
            for (let j = 0; j < lesRoutines.length; j++) {
                if (lesObjs[i].code_goal === lesRoutines[j].code_goal) {
                    lesObjs[i].routine.push(lesRoutines[j]);
                    console.log(`${lesRoutines[j].title},  a été poussé dans , ${lesObjs[i].title}`);
                    lesRoutines[j].objectif = lesObjs[i];
                    console.log(`${lesObjs[i].title},  est l'objectif référence de la routine : , ${lesRoutines[j].title}`);
                    lesRoutines[j].save();
                }
            }
            lesObjs[i].save();  // A la fin de la boucle on save l'objectif 
        }
    })
