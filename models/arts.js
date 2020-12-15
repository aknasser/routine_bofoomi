const mongoose = require("mongoose");

const {Schema} = mongoose;

const artsSchema = new Schema(
    {
        lecture: {                  //CATEGORIE: CULTURE
            type: Number,
            required: true
        },
        expo: {                     //CATEGORIE: CULTURE
            type: Number,
            required: true
        },
        cinema: {                   //CATEGORIE: CULTURE
            type: Number,
            required: true
        },
        activiteArtistique: {       //CATEGORIE: ARTS
            type: Number,
            required: true
        },
        plaisirArts: {       //CATEGORIE: ARTS
            type: Number,
            required: true
        },
        moment: {       //CATEGORIE: EXPRESSIVITE
            type: Number,
            required: true
        },
        showman: {       //CATEGORIE: EXPRESSIVITE
            type: Number,
            required: true
        },
        artFavori1: {              
            type: String,
            required: true
        },
        artFavori2: {
            type: String,
            required: true
        },
        aspirationArts: {
            type: String,
            required: true
        },
        activiteArts: [{                          
            type: mongoose.Schema.Types.ObjectId,
            ref:"ActiviteArts"
        }],
        totalExpAcquise: {
            type: Number
        },
        practiceExpAcquise: {
            type: Number
        },
        cultureExpAcquise: {
            type: Number
        },
        expressiviteExpAcquise: {
            type: Number
        }
    }

);


    artsSchema.virtual("scorePractice")              // Ici nous créons un attribut virtuel pour si nécessaire afficher le nom entier de l'user. Cet attribut ne fait pas partie des composant du Schema user mais peut être utilisé à souhait(fonctionne un peu comme les instance methods).
        .get(function() {
            let scoreDepartPractice = ((this.activiteArtistique + this.plaisirArts) / 2);
            let scorePractice = (scoreDepartPractice + this.practiceExpAcquise);

            return scorePractice;
        });

    artsSchema.virtual("scoreCulture")              // Ici nous créons un attribut virtuel pour si nécessaire afficher le nom entier de l'user. Cet attribut ne fait pas partie des composant du Schema user mais peut être utilisé à souhait(fonctionne un peu comme les instance methods).
        .get(function() {
            let scoreDepartCulture = ((this.lecture + this.expo + this.cinema) / 3);
            let scoreCulture = (scoreDepartCulture + this.cultureExpAcquise);

            return scoreCulture;
        });


    artsSchema.virtual("scoreExpressivite")              // Ici nous créons un attribut virtuel pour si nécessaire afficher le nom entier de l'user. Cet attribut ne fait pas partie des composant du Schema user mais peut être utilisé à souhait(fonctionne un peu comme les instance methods).
        .get(function() {
            let scoreDepartExpressivite = ((this.moment + this.showman) / 2);
            let scoreExpressivite = (scoreDepartExpressivite + this.expressiviteExpAcquise);

            return scoreExpressivite;
        });



    artsSchema.virtual("scoreArts")              // Ici nous créons un attribut virtuel pour si nécessaire afficher le nom entier de l'user. Cet attribut ne fait pas partie des composant du Schema user mais peut être utilisé à souhait(fonctionne un peu comme les instance methods).
        .get(function() {
            let scoreDepartArts = (this.scorePractice + this.scoreCulture + this.scoreExpressivite) / 3 ;
            let scoreArts = (scoreDepartArts + this.totalExpAcquise);

            return scoreArts;
        });


// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Arts", artsSchema);  