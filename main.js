// LES MODULES NECESSAIRES DE BASE

const express = require("express");
const layouts = require("express-ejs-layouts");
const passport = require("passport"); 


// IMPORTATION DES ROUTES.

const router = require("./routes/index");


// LE SERVER
const app = express();
app.use(express.static("public")); 

// APPLICATION VARIABLE
app.set("port", process.env.PORT || 1993);   // Si l'environnement ne définit pas de valeur spécifique alors PORT= 1993


// PREPARER A ECOUTER LE SERVEUR

const server = app.listen(app.get("port"), () => {
    console.log(`Nous sommes connectés au port ${app.get("port")}`);
});



// CONNECTION A LA DB

const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);     // Nécessaire pour pouvoir utiliser FindByIdAndUpdate


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/me_hero",        // Ainsi Mongoose en utilisant les variables de l'environnement ou le cas échéant à l'adresse local de la DB
    {useNewUrlParser: true}
);





const db = mongoose.connection;

mongoose.Promise = global.Promise

db.once("open", () => {
    console.log("All Right ! Connexion etablie avec la DB: me_hero");
});







// PARAMETRER LE SYSTEME DE VUES
app.set("view engine", "ejs");
app.use(layouts);   //Ceci nous permet d'utiliser les layout. Nous l'invoquons avant de construire les routes avec les vues dynamiques


// LE MODEL USER

const User = require("./models/user");










// PARAMETRER METHOD-OVERRIDE POUR ACCEPTER LES HTTP METHOD "PUT" ET DELETE (DANS UNE LOGIQUE DE CRUD)
const methodOverride = require("method-override");
app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

// PREPARER LES FLASH MESSAGES

const expressSession = require("express-session");
const cookieParser = require("cookie-parser");              // POUR LA CREATION / GESTION DES COOKIES
const connectFlash = require("connect-flash");                                         

app.use(cookieParser("motdepasse_hard"));   // "motdepasse_hard" est notre mot de passe secret. cookieParser l'utilise pour crypter les data des cookies envoyés. Idéalement ce mot de passe est plus compliqué et représentée par une variable. Ceci évite les failles de sécurité.
app.use(expressSession({                      // nous disons à expressSession d'utiliser des sessions et de recourir à cookie-parser comme methode de storage
    secret: "motdepasse_hard",
    cookie: {
        maxAge: 4000000                         // durée avant expiration des cookies 4 000 000ms
    },
    resave: false,                              // Pour ne pas envoyer de cookie à l'user si la session ne bouge pas
    saveUninitialized: false              // Pour éviter d'updater les datas de la session si rien n'a changé dans la session actuelle.
}));



app.use(connectFlash());               //Nous disons à l'application d'utiliser connectFlash() comme middleware

app.use((req, res, next) => {               // Nous créons la variable local flashMessages. (Elle sera passée dans la vue layout.ejs)
    res.locals.flashMessages = req.flash();     // TRES IMPORTANT: Cette variable est égal au message flash que nous allons créer
    next();
});

// INITIALISER PASSPORT.JS (Après le cookieParser)
app.use(passport.initialize());
app.use(passport.session());

// PREPARATION A LA SERIALISATION PASSPORT
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());    // Pour sérialiser et deserialiser les objects
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {                          // Nous utilisons cette middleware pour passer des variables locales aux vues. Ces variables seront utiles dans le layout.ejs (bouton login/log out)
    res.locals.loggedIn = req.isAuthenticated();       // isAuthentficated est une method propre à passport.js. Elle renvoie vrai ou faux. Elle nous indique si les datas d'un user sont actuellement présente dans les sessions cookies de la requête. En d'autres termes, si un user est connecté, isAuthentificated, renvoie "Vrai" 
    res.locals.currentUser = req.user;              // Si un user existe bien, nous pouvons l'attribuer à une variable que nous voulons (ici currentUser)
    next();
});


// POUR LIRE LES DATAS POSTEES PAR USER

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());


// UTILISER router pour EXPLORER LES ROUTES
app.use("/", router);



