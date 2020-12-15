const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/users", userRoutes);
router.use("/", homeRoutes); 
router.use("/admin", adminRoutes);


module.exports = router;

