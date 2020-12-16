// AVEC CE FICHIER NOUS REMPLISSONS LES ASPIRATIONS

const mongoose = require("mongoose");
const AspirationCorps = require("./models/aspiration/aspirationCorps");
const AspirationEsprit = require("./models/aspiration/aspirationEsprit");
const AspirationSocial = require("./models/aspiration/aspirationSocial");
const AspirationArt = require("./models/aspiration/aspirationArt");
const AspirationStyle = require("./models/aspiration/aspirationStyle");
const AspirationCooking = require("./models/aspiration/aspirationCooking"); 


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES

//ASPIRATION CORPS


AspirationCorps.remove({})
    .then(() => {
       return AspirationCorps.create({
            titre:"La Voie de L'Olympien",
            description: "Athlète de haut niveau. Capable de répéter les efforts long/intense.",
            image: "puissance",
            bonusNom: "Surpuissance",
            actionPuissance: "Puissance",
            multiplicateurPuissance: 1.5,
            multiplicateurTechnique: 1,
            multiplicateurSouplesse: 1,
            multiplicateurSante: 1 
        })
    })
    .then(() => {
        return AspirationCorps.create({
            titre:"La Voie de L'As",
            description: "Technicien hors pair, en quête constante du geste juste",
            image: "technique",
            bonusNom: "Maestria",
            bonusAction: "Technique",
            multiplicateurPuissance: 1,
            multiplicateurTechnique: 1.5,
            multiplicateurSouplesse: 1,
            multiplicateurSante: 1  
        })
    })
    .then(() => {
        return AspirationCorps.create({
            titre:"La Voie de La Souplesse",
            description: "Maîtrise chaque fibre de son corps.Sens de l'équilibre exceptionnel",
            image: "souplesse",
            bonusNom: "Elasticité",
            bonusAction: "Equilibre",
            multiplicateurPuissance: 1,
            multiplicateurTechnique: 1,
            multiplicateurSouplesse: 1.5,
            multiplicateurSante: 1  
        })
    })
    .then(() => {
        return AspirationCorps.create({
            titre:"La Voie du Maintien",
            description: "Connaît son Corps comme sa poche",
            image: "sante",
            bonusNom: "Mon corps est un temple",
            bonusAction: "Maintien",
            multiplicateurPuissance: 1,
            multiplicateurTechnique: 1,
            multiplicateurSouplesse: 1,
            multiplicateurSante: 1.5  
        })
    })
    .then(lastEntry => {
        console.log(lastEntry);
    })
    .catch(error => {
        console.log(error.message)
    });


//ASPIRATION ESPRIT



AspirationEsprit.remove({})
    .then(() => {
       return AspirationEsprit.create({
            titre:"La Voie de L'Erudit",
            description: "Possède un véritable recul sur le monde. Grande capacité de réflexion",
            image: "soul",
            bonusNom: "Méditation constructive",
            bonusAction: "Soul",
            multiplicateurHardSkills: 1,
            multiplicateurSoul: 1.5,
            multiplicateurCrafty: 1
        })
    })
    .then(() => {
        return AspirationEsprit.create({
            titre:"La Voie de L'Expert",
            description: "Domine parfaitement son champ d'Expertise",
            image: "hardSkills",
            bonusNom: "Eurêka",
            bonusAction: "Expertise",
            multiplicateurHardSkills: 1.5,
            multiplicateurSoul: 1,
            multiplicateurCrafty: 1
        })
    })
    .then(() => {
        return AspirationEsprit.create({
            titre:"La Voie du Polymath",
            description: "Touche-à-tout à la curiosité débordante",
            image: "polymath",
            bonusNom: "Curiosité insatiable",
            bonusAction: "Nouveaux Savoirs",
            multiplicateurHardSkills: 1.25,
            multiplicateurSoul: 1.25,
            multiplicateurCrafty: 1.25
        })
    })
    .then(() => {
        return AspirationEsprit.create({
            titre:"La Voie du Rusé",
            description: "Capacité d'adaptation et sens pratique sont ses maîtres mots",
            image: "crafty",
            bonusNom: "Vif-Esprit",
            bonusAction: "SensPratique",
            multiplicateurHardSkills: 1,
            multiplicateurSoul: 1,
            multiplicateurCrafty: 1.5
        })
    })
    .then(lastEntry => {
        console.log(lastEntry);
    })
    .catch(error => {
        console.log(error.message)
    });

// ASPIRATION SOCIAL


AspirationSocial.remove({})
    .then(() => {
       return AspirationSocial.create({
            titre:"La Voie de L'Orateur",
            description: "A l'aise pour prendre la parole. Inspire et Divertit",
            image: "orateur",
            bonusNom: "Exaltation",
            bonusAction: "Charisme",
            multiplicateurCharisma: 1,
            multiplicateurPotes: 1.5,
            multiplicateurAventure: 1
        })
    })
    .then(() => {
        return AspirationSocial.create({
            titre:"La Voie du Réseauteur",
            description: "Met son relationnel au service de ses projets. A l'oeil pour repérer les opportunités",
            image: "reseauteur",
            bonusNom: "Plaque Tournante",
            bonusAction: "Réseau",
            multiplicateurCharisma: 1.25,
            multiplicateurPotes: 1.25,
            multiplicateurAventure: 1
        })
    })
    .then(() => {
        return AspirationSocial.create({
            titre:"La Voie de L'Aventurier",
            description: "Vit et partage des expériences hors du commun. Dynamique et toujours partant pour une nouveau périple",
            image: "aventurier",
            bonusNom: "Appel de l'Aventure",
            bonusAction: "Aventure",
            multiplicateurCharisma: 1,
            multiplicateurPotes: 1,
            multiplicateurAventure: 1.5
        })
    })
    .then(() => {
        return AspirationSocial.create({
            titre:"La Voie du Socializer",
            description: "Social et chaleureux, comprend bien les dynamiques de groupe",
            image: "socializer",
            bonusNom: "Ice-Breaker",
            bonusAction: "Liens",
            multiplicateurCharisma: 1,
            multiplicateurPotes: 1.5,
            multiplicateurAventure: 1
        })
    })
    .then(lastEntry => {
        console.log(lastEntry);
    })
    .catch(error => {
        console.log(error.message)
    });


//ASPIRATION ARTS



AspirationArt.remove({})
    .then(() => {
       return AspirationArt.create({
            titre:"La Voie du Virtuose",
            description: "Grande maîtrise d'un art, perfectionniste et super créatif",
            image: "virtuose",
            bonusNom: "Inspiration",
            bonusAction: "Pratique",
            multiplicateurArts: 1.5,
            multiplicateurCulture: 1,
            multiplicateurExpressivite: 1
        })
    })
    .then(() => {
        return AspirationArt.create({
            titre:"La Voie du Connaisseur",
            description: "Sensibilité et goût développé. Sait anticiper les œuvres amenées à briller.",
            image: "culture",
            bonusNom: "Flair",
            bonusAction: "Culture",
            multiplicateurArts: 1,
            multiplicateurCulture: 1.5,
            multiplicateurExpressivite: 1
        })
    })
    .then(() => {
        return AspirationArt.create({
            titre:"La Voie du Performeur",
            description: "Aime partager sa passion avec les autres. Sait occuper le devant de la scène",
            image: "performer",
            bonusNom: "On Stage",
            bonusAction: "Expressivité",
            multiplicateurArts: 1,
            multiplicateurCulture: 1,
            multiplicateurExpressivite: 1.5
        })
    })
    .then(lastEntry => {
        console.log(lastEntry);
    })
    .catch(error => {
        console.log(error.message)
    });




//ASPIRATION STYLE


AspirationStyle.remove({})
    .then(() => {
       return AspirationStyle.create({
            titre:"La Voie du Stylish",
            description: "s'appuie sur une garde robe de haute qualité et un savoir-vivre à tout épreuve",
            image: "stylish",
            bonusNom: "Raffinement",
            bonusAction: "Elegance",
            multiplicateurOriginal: 1,
            multiplicateurElegance: 1.5,
            multiplicateurBasic: 1
        })
    })
    .then(() => {
        return AspirationStyle.create({
            titre:"La Voie de l'Excentrique",
            description: "Confiant, revendique un style unique mais cohérent",
            image: "excentrique",
            bonusNom: "Explosion de couleurs",
            bonusAction: "Original",
            multiplicateurOriginal: 1.5,
            multiplicateurElegance: 1,
            multiplicateurBasic: 1
        })
    })
    .then(() => {
        return AspirationStyle.create({
            titre:"La Voie du BG",
            description: "Investit sur les pièces indispensable qui le sublimeront en toute simplicité",
            image: "bg",
            bonusNom: "Style Epuré",
            bonusAction: "Valeur sûre",
            multiplicateurOriginal: 1,
            multiplicateurElegance: 1,
            multiplicateurBasic: 1.5
        })
    })
    .then(lastEntry => {
        console.log(lastEntry);
    })
    .catch(error => {
        console.log(error.message)
    });




//ASPIRATION COOKING


AspirationCooking.remove({})
    .then(() => {
       return AspirationCooking.create({
            titre:"La Voie de L'Explorateur",
            description: "Audacieux dans ses préparations, n'hésite pas à cuisiner des plats...hors-normes",
            image: "chef",
            bonusNom: "Exploration Culinaire",
            bonusAction: "Découverte",
            multiplicateurDecouverte: 1.5,
            multiplicateurClassic: 1,
            multiplicateurHealthy: 1,
            multiplicateurPlaisir: 1
        })
    })
    .then(() => {
        return AspirationCooking.create({
            titre:"La Voie du Terroir",
            description: "s'appuie avant tout sur sa capacité d'exécution et les bons produits pour cuisiner",
            image: "terroir",
            bonusNom: "Eloge de la Simplicité",
            bonusAction: "Classique",
            multiplicateurDecouverte: 1,
            multiplicateurClassic: 1.5,
            multiplicateurHealthy: 1,
            multiplicateurPlaisir: 1
        })
    })
    .then(() => {
        return AspirationCooking.create({
            titre:"La Voie Verte",
            description: "Bonne connaissance des ingrédients et de leur bienfaits. La nourriture au service du corps",
            image: "healthy",
            bonusNom: "Sainte Cuisine",
            bonusAction: "Equilibré",
            multiplicateurDecouverte: 1,
            multiplicateurClassic: 1,
            multiplicateurHealthy: 1.5,
            multiplicateurPlaisir: 1
        })
    })
    .then(() => {
        return AspirationCooking.create({
            titre:"La Voie de l'Hédoniste",
            description: "met l'accent sur les plats qui éveillent les papilles. Comfort food et autres délices",
            image: "gourmand",
            bonusNom: "Explosion de Plaisir",
            bonusAction: "Plaisir",
            multiplicateurDecouverte: 1,
            multiplicateurClassic: 1,
            multiplicateurHealthy: 1,
            multiplicateurPlaisir: 1.5
        })
    })
    .then(lastEntry => {
        console.log(lastEntry);
    })
    .catch(error => {
        console.log(error.message)
    });
