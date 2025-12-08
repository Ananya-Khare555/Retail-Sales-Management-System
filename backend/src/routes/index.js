const express = require("express");
const router = express.Router();
const salesRoutes = require("./sales.routes");
const metaRoutes = require("./meta.routes");

router.use("/sales", salesRoutes);
router.use("/", metaRoutes);

module.exports = router;
