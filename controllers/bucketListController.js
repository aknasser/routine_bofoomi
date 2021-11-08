// MODELS POUR LA LISTE DS DANS START-BODY
const User = require("../models/user");
const Challenge = require("../models/challenge");



module.exports = {
    challenges : async (req, res) => {   
        let heroId = req.params.id;
        const aHero = await User.findById(heroId).populate("challenges");                            
        res.render("bucketList/challenges", {
            layout: "layoutUser",
            challenges : aHero.challenges
        });
    },

    missionDone : async (req, res, next) => {
        let defisReleves = req.body.steps;                                      // 1 - On récupère les actions faites par l'user
        let heroId = req.params.id;
        let challengeId = req.params.challengesId;
        let leChallenge = [];

        console.log("DEFIS RELEVES:", defisReleves);
        
        const ChallengeUpdated = await Challenge.findByIdAndUpdate(challengeId, {
            $pull: {
                "steps": {$in: defisReleves}
                }
            },
            {new : true}
        )
;

        console.log("LA NOUVELLE VALEUR DU CHALLENGE :", ChallengeUpdated);
        res.redirect(`/bucketList/${heroId}`);
    },


};