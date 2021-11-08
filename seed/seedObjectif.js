// AVEC CE FICHIER NOUS REMPLISSONS LES OBJECTIFS ET LEUR ATTRIBUONS LES ROUTINES PREALABLEMENT CREEES

const mongoose = require("mongoose");
const Objectif = require("../models/objectif");
const Routine = require("../models/routine");


let all_objectif;
let all_routine;



mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES

//1 - L'ALIMENTATION DE LA COLLECTION "objectifs" commence ici.


Objectif.deleteMany({})                                                           // POUR VIDER LA COLLECTION Objectif EST REPARTIR DE ZERO

// SECTION CORPS
 
    .then(() => {
       return Objectif.create({                                              
            title:"Avoir les 6 abdos visibles",
            category: "corps",
            code_goal: "abdo"
        })
    })
    .then(() => {
        return Objectif.create({                                               
            title:"10KM en moins de 43min",
            category: "corps",
            code_goal: "10KM"
         })
     })
     .then(() => {
        return Objectif.create({                                               
            title:"15KM en moins de 1h15",
            category: "corps",
            code_goal: "15KM"
         })
     })
     .then(() => {
        return Objectif.create({                                               
            title:"5KM en moins de 20min",
            category: "corps",
            code_goal: "5KM"
         })
     })
     .then(() => {
        return Objectif.create({                                               
            title:"Être la première option durant les pick-up game (Basket)",
            category: "corps",
            code_goal: "first_option_basket"
         })
     })

     // SECTION ESPRIT
 
     .then(() => {
        return Objectif.create({                                              
             title:"Augmenter son niveau de conscience",
             category: "esprit",
             code_goal: "conscience"
         })
     })
     .then(() => {
         return Objectif.create({                                               
            title:"Devenir courageux",
            category: "esprit",
            code_goal: "courage"
          })
      })
      .then(() => {
        return Objectif.create({                                               
           title:"As du Business Development",
           category: "esprit",
           code_goal: "bizdev"
         })
     })

      // SECTION SOCIAL
 
      .then(() => {
        return Objectif.create({                                              
             title:"Se faire 5 amis supplémentaires",
             category: "social",
             code_goal: "amis"
         })
     })
     .then(() => {
         return Objectif.create({                                               
            title:"Devenir une personne inspirante",
            category: "social",
            code_goal: "inspiration"
          })
      })
      .then(() => {
        return Objectif.create({                                               
           title:"Augmenter son Personal Branding",
           category: "social",
           code_goal: "personal_branding"
         })
     })

      // SECTION ARTS
 
      .then(() => {
        return Objectif.create({                                              
            title:"Ecrire / finir un roman",
            category: "arts",
            code_goal: "ecriture"
         })
     })
     .then(() => {
         return Objectif.create({                                               
            title:"Devenir un bon musicien-interprète",
            category: "arts",
            code_goal: "musique"
          })
      })

      

      // SECTION STYLE
 
      .then(() => {
        return Objectif.create({                                              
            title:"Une maison qui a du style",
            category: "style",
            code_goal: "maison"
         })
     })
     .then(() => {
         return Objectif.create({                                               
            title:"De l'allure",
            category: "style",
            code_goal: "fringue"
          })
      })

      // SECTION COOKING
 
      .then(() => {
        return Objectif.create({                                              
            title:"Maîtriser 15 nouvelles recettes classiques",
            category: "cooking",
            code_goal: "new_recipes"
         })
     })
     .then(() => {
         return Objectif.create({                                               
            title:"Tester 15 recettes veggie",
            category: "cooking",
            code_goal: "veggie_recipes"
          })
      })


    
    
    
    
    




