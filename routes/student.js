const router = require("express").Router();
const student = require("../controllers/student.controller");

// API
router.get("/api/students/", student.findAll);
router.post("/api/students/", student.create);

module.exports = router;
