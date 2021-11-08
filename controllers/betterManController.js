
//MODELS POUR LA LISTE DS DANS START-BODY
const BetterMan = require("../models/betterMan");



module.exports = {
    index : async (req, res) => {                               // SUPER EXEMPLE DE PAGINATION AVEC MONGODB / MONGOOSE

        const checkPage = req.params.page ? req.params.page : 1 ;   // TRADUCTION DE CETTE DRÔLE DE NOTATION : Pas de quoi flipper ce n'est qu'une abréviation de  IF req.params.page existe alors checkpage = req.params.page ELSE checkpage = 0. On met en place cette condition au cas où l'user arrive sur la page via la nav-bar (pour des raisons esthétiques on ne met pas le numéro de page 1 quand l'user passe par là).
        const articleByPage = 5;
        const nmbreDePages = [];

        const toSkip = await (checkPage - 1) * articleByPage;                  // Pour déterminer le nombre d'élement à sauter avant d'effectuer la query. Par exemple si nous sommes sur la page 3. Nous sautons les 10 ((3-1) * 5 ) premiers articles avant de choper les éléments 
        const inspiration = await BetterMan.find({});      
        const nmbreArticles = await inspiration.length;
        const articleToDisplay = await BetterMan.find({}).skip(toSkip).limit(articleByPage);  // Ainsi on récupère uniquement le nmbre d'éléments voulu par page (avec limit). En utilisant skip(toSkip), on saute le nombre d'article voulu en fonction de la page à afficher. Par exemple si nous allons sur la page 4, nous allons vouloir sauter les (4-1)*5 = 16 premiers articles.


        for (let i = (nmbreArticles/articleByPage)-1; i >= 0; i--) {            // NmbreArticles/articlesByPage pour déterminer le nombre de Page. i a cette valeur pour que à chaque tour de boucle, la valeur de numeroPages augmente de "1".
            let numeroPages = (nmbreArticles/articleByPage) - i;        // A chaque tour, la valeur de numeropages augmentera donc de 1.
            nmbreDePages.push(numeroPages)                          
        }
        console.log("L'ARRAY NOMBRE DE PAGES", nmbreDePages);

        res.render("betterMan/index", {
            layout: "layoutUser",
            articles : articleToDisplay,
            pages : nmbreDePages                // L'array nmbreDePages est du type [1,2,3,4,5...];
        });
    },

    article : async (req, res) => {
        articleId = req.params.article;
        article = await BetterMan.findById(articleId);

        res.render("betterMan/article", {
            layout: "layoutUser",
            betterMan : article
        });
    },

};