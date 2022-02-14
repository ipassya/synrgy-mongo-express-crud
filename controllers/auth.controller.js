const Admin = require("../models/Admin");
const JWT = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SecretKey);

module.exports = {
  signup: async (req, res) => {
    if (
      !req.body ||
      req.body.name == "" ||
      req.body.username == "" ||
      req.body.email == "" ||
      req.body.password == ""
    ) {
      res.send({
        message: "Please fill all the fields",
        statusCode: 402,
      });
    } else {
      await Admin.findOne({
        $or: [
          {
            username: req.body.username,
          },
          {
            email: req.body.email,
          },
        ],
      })
        .then(async (response) => {
          if (response == null) {
            const newAdmin = new Admin({
              name: req.body.name,
              username: req.body.username,
              email: req.body.email,
              password: cryptr.encrypt(req.body.password),
            });
            let createData = await newAdmin.save(newAdmin);
            if (createData) {
              res.send({
                message: "Successfully added admin",
                statusCode: 200,
              });
            } else {
              res.send({
                message: "Failed to add admin",
                statusCode: 500,
              });
            }
          } else {
            res.send({
              message: "Username or Email already exists",
              statusCode: 502,
            });
          }
        })
        .catch((err) => {
          res.send({
            message: "Failed to add admin",
            statusCode: 500,
          });
        });
    }
  },
  login: async (req, res) => {
    let dataFind = await Admin.findOne({ email: req.body.email })
      .then((response) => response)
      .catch((err) => false);
    if (!dataFind) {
      res.send({
        message: "Data not found",
        statusCode: 500,
      });
    } else {
      if (cryptr.decrypt(dataFind.password) === req.body.password) {
        let token = JWT.sign(
          {
            id: dataFind._id,
            username: dataFind.username,
            email: dataFind.email,
          },
          process.env.SecretKey,
          {
            expiresIn: "1h",
          }
        );
        let dataParsing = {
          username: dataFind.username,
          fullname: dataFind.fullname,
          email: dataFind.email,
          tokenType: "Bearer",
          token: token,
        };
        res.send({
          message: "Login successfully",
          statusCode: 200,
          results: dataParsing,
        });
      } else {
        res.send({
          message: "Wrong username or password",
          statusCode: 502,
        });
      }
    }
  },
};
