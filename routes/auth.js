const router = require("express").Router();
const auth = require("../controllers/auth.controller");

// API
router.post("/api/auth/signup/", auth.signup);
router.post("/api/auth/login/", auth.login);

module.exports = router;
