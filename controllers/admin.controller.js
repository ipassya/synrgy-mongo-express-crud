const Axios = require("axios");

module.exports = {
  viewAdmin: async (req, res) => {
    const adminLogin = req.cookies.username;
    const token = req.cookies.token;
    const tokenType = req.cookies.tokenType;
    await Axios.get("/api/students/", {
      headers: { Authorization: `${tokenType} ${token}` },
    })
      .then((response) => {
        if (response.data.statusCode == 200) {
          res.render("pages/admin/index", {
            students: response.data.results,
            admin: adminLogin,
          });
        } else {
          res.redirect("/login");
        }
      })
      .catch((err) => {
        res.redirect("/login");
      });
  },
  viewSignup: (req, res) => {
    res.render("pages/admin/auth/signup");
  },
  viewLogin: (req, res) => {
    res.render("pages/admin/auth/login");
  },
  logout: (req, res) => {
    res.clearCookie("token");
    res.clearCookie("tokenType");
    res.clearCookie("username");
    res.clearCookie("email");
    res.redirect("/login");
  },
};
