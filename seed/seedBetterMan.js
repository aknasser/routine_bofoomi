// AVEC CE FICHIER NOUS REMPLISSONS LES ROUTINES
// ALIMENTER LES OBJECTIFS AVEC seedobjectifs.js avant d'utiliser ce seed.
// A terme penser à les fusionner ensemble

const mongoose = require("mongoose");
const BetterMan = require("../models/betterMan");


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES



//L'ALIMENTATION DE LA COLLECTION "betterMan" commence ici.


const alimentation = async() => {
    const clean = await BetterMan.deleteMany({}) 
    
    // QUELQUES BETTER MAN HISTOIRE DE CHARGER LA BDD (le restera sera rempli via l'espace admin, faut pas déconner)
        const sora = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Shine like Sora",
            content: "Shine, smile and inspire. Just like a warm sun. I will keep moving forward with my big smile and my cheerful nature even if I fail. True light reaches its brightest level during the time of darkness and uncertainty. Be that light. When the road is dark and surrounded by the fog of despair, I show them the way. If necessary, I  build that way. How ? With my bare hands, my relentless efforts and my brave heart. Behind my smile and my careless nature lies an indomitable spirit. I am the one who shines,  the one who fights. I am the smiling fighter.",
            picture: "dodo.png"
        }); 
    
        const cheeky = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Be cheeky and daring. Don't ask permission",
            content: "Don’t ask permission, just do it ! People won’t give you opportunities or free shots. We all need to sort out [a]our own shit. People can help you… once in a while. But at the end of the day, you must be your biggest fan, your loudest cheerleader. Because if you don’t root for yourself, why should people root for you ?",
            picture: "dodo.png"
        }); 

        const temple = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"My body is a temple",
            content: "Your body is the purest reflection of your mind. It’s the first thing people see when they connect with you. No matter how 'great', your soul can be, if your body isn’t appealing and fit, you won’t attract anyone. If you can’t even care about your own health, why should I care about you ? That’s nonsense.",
            picture: "dodo.png"
        });  


        const soul = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"A playful soul",
            content: "People don't change. They evolve, they grow. What I call soul is the centre of our very being. How to find it ? Strip away all the masks you wear and you will see it. Finding your soul is no small feat. It takes courage, vulnerability and patience. I've always hidden my true self behind masks. Truth be told, I still do...and I like it. If you craft them properly, masks are useful, masks are powerful. Sounds dishonest ? But what is honesty ? Honesty is being true to yourself. As long as you know who you are, it's OK to wear masks and fake it, once in a while.",
            picture: "dodo.png"
        });  


        const strangers = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Strangers are friends I haven't met yet",
            content: "We like people we are familiar with. Lover, friends, family. When we see them this sense of familiarity puts us at ease. Because we KNOW them, we let them come closer, we bond together.Every bond we have come from this feeling of familiarity. If we look carefully at our friends we can easily identify the common points we share.",
            picture: "dodo.png"
        });  

        const pace = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Finding the right Pace",
            content: "Life is an unpredictable music with high tempo and slow parts. From time to time, it can be chaotic. Just like a storm breaking your landmarks and habits. As “cliché” as it may sound, change is the only constant. Is life a game ? Yes. Everything can be boiled down to probabilities and mathematics models. Even love. But don’t get fooled. You can tip these probabilities in your favor.Because...life is a rhythmic game. To “win” you need to open your ears, feel the flow and move accordingly. That’s it.",
            picture: "dodo.png"
        });  

        const fears = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Follow your fears",
            content: "Remember why you are here.You came to this place to learn, grow, overcome and make a difference. This is a huge task. So be grateful to have this opportunity and give your best. This is a huge task and you have a big ego...don't listen to it",
            picture: "dodo.png"
        });  

        const lesson = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"Lessons from a 3-years relationship",
            content: "level-headed blablblabla ",
            picture: "dodo.png"
        });  

        const afraid = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"What would you do if you weren't afraid ?",
            content: "This question is very Powerful. In fact, this is the most impacting question you can ask yourself: What would you do if you weren’t afraid ? In 99% of the situation, fear is the only thing that restrains us from doing the right thing at the right pace( See finding the right pace above). Fear is the curtain that keeps you away from your main stage, your life.",
            picture: "dodo.png"
        });  

        const happy = await BetterMan.create({                                               // POUR CREER LA NOUVELLES ENTREE DANS LA COLLECTION "Routine" voir model présent dans le fichier "routine.js"
            title:"When you wonder if you're happy...you're not happy",
            content: "This one is quite straightforward. Happiness is something you feel. When your life is blissful, you don’t even think about your happiness. You enjoy your time, and that’s it. Am I happy ?  This is not the right question. Instead you should ask yourself:  Why am I unhappy ? This is awkward, this is a bit depressing. Still, this question is the very first step leading to a sustainable happiness.",
            picture: "dodo.png"
        });  


                       
};

alimentation()                  // ON APPELLE LA FONCTION ASYNCHRONE POUR ALIMENTER LA BDD

