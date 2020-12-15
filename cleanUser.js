const mongoose = require("mongoose");
const User = require("./models/user")

mongoose.connect(
    "mongodb://localhost:27017/me_hero",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES



User.remove({})

