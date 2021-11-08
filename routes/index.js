const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const betterManRoutes = require("./betterManRoutes");
const bucketListRoutes = require("./bucketListRoutes");


router.use("/", homeRoutes); 
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/betterMan", betterManRoutes);
router.use("/bucketList", bucketListRoutes);


module.exports = router;

