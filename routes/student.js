const router = require("express").Router();
const req = require("express/lib/request");
const res = require("express/lib/response");
const student = require("../controllers/student.controller");

// API
router.get("/api/students/", student.findAll);
router.post("/api/students/", student.create);
router.delete("/api/students/:id", student.delete);
router.put("/api/students/:id", student.update);

module.exports = router;
