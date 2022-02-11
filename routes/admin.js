const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

// Admin Page
router.get("/", adminController.viewAdmin);

// Login Page
router.get("/login", adminController.viewLogin);

// Signup Page
router.get("/signup", adminController.viewSignup);

module.exports = router;
