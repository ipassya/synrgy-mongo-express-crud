const Student = require("../models/Student");
const Admin = require("../models/Admin");
const chectAuth = require("../middlewares/checkAuth.middleware");
const Path = require("path");
const randomString =
  require("../middlewares/randomString.middleware").RandomString;

module.exports = {
  findAll: async (req, res) => {
    let token = await chectAuth.JWTVerify(req.headers);
    if (!token) {
      res.send(400);
    } else {
      const students = await Student.aggregate([
        {
          $lookup: {
            from: "admins",
            localField: "adminId",
            foreignField: "email",
            as: "admin",
          },
        },
      ])
        .then((response) => response)
        .catch((err) => false);
      if (students) {
        res.send({
          message: "Successfully get all students",
          statusCode: 200,
          results: students,
        });
      } else {
        res.status(404).json({ message: "Students not found" });
      }
    }
  },
  create: async (req, res) => {
    let token = await chectAuth.JWTVerify(req.headers);
    if (!token) {
      res.send(400);
    } else {
      let studentImage = req.file.image;
      if (!studentImage.mimetype.includes("image")) {
        res.status(400).json({ message: "Invalid file type" });
      } else {
        let newNameImage =
          randomString(25) + studentImage.mimetype.replace("assets/img/", ".");
        let dirName = Path.join(__dirname, "../public/assets/img/");
        let pathImage = req.get("host") + "/assets/img/" + newNameImage;

        studentImage.mv(dirName + newNameImage, async (err) => {
          if (err) {
            res.status(500).json({ message: "Error uploading file" });
          } else {
            const newStudent = new Student({
              nim: req.body.nim,
              name: req.body.name,
              email: req.body.email,
              major: req.body.major,
              university: req.body.university,
              image: pathImage,
              adminId: req.body.adminId,
            });
            await newStudent
              .save(newStudent)
              .then((response) => {
                res.send({
                  message: "Successfully create new student",
                  statusCode: 200,
                  results: response,
                });
              })
              .catch((err) => {
                res.status(500).json({ message: "Error creating student" });
              });
          }
        });
      }
    }
  },
};
