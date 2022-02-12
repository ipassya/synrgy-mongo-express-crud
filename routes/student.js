const router = require("express").Router();
const req = require("express/lib/request");
const res = require("express/lib/response");
const student = require("../controllers/student.controller");

// API
router.get("/api/students/", student.findAll);
router.post("/api/students/", student.create);

module.exports = router;
