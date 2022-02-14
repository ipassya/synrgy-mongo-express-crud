const Student = require("../models/Student");
const chectAuth = require("../middlewares/checkAuth.middleware");
const Path = require("path");
const randomString =
  require("../middlewares/randomString.middleware").RandomString;

module.exports = {
  findAll: async (req, res) => {
    let token = await chectAuth.JWTVerify(req.headers);
    if (!token) {
      res.send({
        statusCode: 401,
        message: "Token is invalid",
      });
    } else {
      const students = await Student.find()
        .then((response) => response)
        .catch((err) => false);
      if (students) {
        res.send({
          message: "Successfully get all students",
          statusCode: 200,
          results: students,
        });
      } else {
        res.send({
          message: "Failed to get all students",
          statusCode: 500,
        });
      }
    }
  },

  create: async (req, res) => {
    let token = await chectAuth.JWTVerify(req.headers);
    if (!token) {
      res.send({
        statusCode: 401,
        message: "Token is invalid",
      });
    } else if (!req.body || !req.files) {
      res.send({
        statusCode: 402,
        message: "Please fill all the fields",
      });
    } else if (!req.files.image.mimetype.includes("image")) {
      res.send({
        message: "Invalid image type",
        statusCode: 415,
      });
    } else {
      let studentImage = req.files.image;
      let newNameImage =
        randomString(25) + studentImage.mimetype.replace("image/", ".");
      let dirName = Path.join(__dirname, "../public/assets/img/");
      let pathImage =
        "http://" + req.get("host") + "/assets/img/" + newNameImage;

      studentImage.mv(dirName + newNameImage, async (err) => {
        if (err) {
          res.send({
            message: "Failed to upload image",
            statusCode: 500,
          });
        } else {
          const newStudent = new Student({
            nim: req.body.nim,
            name: req.body.name,
            email: req.body.email,
            major: req.body.major,
            university: req.body.university,
            image: pathImage,
            createAdminId: req.body.createAdminId,
          });
          await newStudent
            .save(newStudent)
            .then((response) => {
              res.send({
                message: "Successfully added student",
                statusCode: 200,
                results: response,
              });
            })
            .catch((err) => {
              res.send({
                message: "Failed to add student",
                statusCode: 500,
              });
            });
        }
      });
    }
  },

  delete: async (req, res) => {
    let token = await chectAuth.JWTVerify(req.headers);
    if (!token) {
      res.send({
        statusCode: 401,
        message: "Token is invalid",
      });
    } else {
      const student = await Student.findById(req.params.id)
        .then((response) => response)
        .catch((err) => false);
      if (student) {
        await Student.findByIdAndDelete(req.params.id)
          .then((response) => {
            res.send({
              message: "Successfully deleted student",
              statusCode: 200,
              results: response,
            });
          })
          .catch((err) => {
            res.send({
              message: "Failed to delete student",
              statusCode: 500,
            });
          });
      } else {
        res.send({
          message: "Data not found",
          statusCode: 500,
        });
      }
    }
  },

  update: async (req, res) => {
    let token = await chectAuth.JWTVerify(req.headers);
    if (!token) {
      res.send({
        statusCode: 401,
        message: "Token is invalid",
      });
    } else {
      const student = await Student.findById(req.params.id)
        .then((response) => response)
        .catch((err) => false);
      if (student) {
        if (req.files) {
          let studentImage = req.files.image;
          let newNameImage =
            randomString(25) + studentImage.mimetype.replace("image/", ".");
          let dirName = Path.join(__dirname, "../public/assets/img/");
          let pathImage =
            "http://" + req.get("host") + "/assets/img/" + newNameImage;

          studentImage.mv(dirName + newNameImage, async (err) => {
            if (err) {
              res.send({
                message: "Failed to upload image",
                statusCode: 500,
              });
            } else {
              await Student.findByIdAndUpdate(req.params.id, {
                nim: req.body.nim,
                name: req.body.name,
                email: req.body.email,
                major: req.body.major,
                university: req.body.university,
                image: pathImage,
                updateAdminId: req.body.updateAdminId,
              })
                .then((response) => {
                  res.send({
                    message: "Successfully update student",
                    statusCode: 200,
                    results: response,
                  });
                })
                .catch((err) => {
                  res.send({
                    message: "Failed to update student",
                    statusCode: 500,
                  });
                });
            }
          });
        } else if (!req.files) {
          await Student.findByIdAndUpdate(req.params.id, {
            nim: req.body.nim,
            name: req.body.name,
            email: req.body.email,
            major: req.body.major,
            university: req.body.university,
            updateAdminId: req.body.updateAdminId,
          })
            .then((response) => {
              res.send({
                message: "Successfully update student",
                statusCode: 200,
                results: response,
              });
            })
            .catch((err) => {
              res.send({
                message: "Failed to update student",
                statusCode: 500,
              });
            });
        } else {
          res.send({
            message: "Invalid image type",
            statusCode: 415,
          });
        }
      } else {
        res.send({
          message: "Data not found",
          statusCode: 500,
        });
      }
    }
  },
};
