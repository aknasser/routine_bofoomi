
//MODELS POUR LA LISTE DS DANS START-BODY


module.exports = {
    home : (req, res) => {
        res.render("index");
    },
    concept:(req, res) => {
        res.render("concept");
    },
    startQuizz:(req, res) => {
        res.render("start");
    },

};