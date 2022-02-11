const JWT = require("jsonwebtoken");

exports.JWTVerify = async (tokenData) => {
  let tokenAuth = tokenData.authorization.split(" ");

  if (tokenAuth[0] != "Bearer") {
    return false;
  } else {
    let resultToken = await JWT.verify(
      tokenAuth[1],
      process.env.SecretKey,
      (err, resultToken) => {
        if (err) return false;
        if (resultToken) return resultToken;
      }
    );
    return resultToken;
  }
};
