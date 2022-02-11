const JWT = require("jsonwebtoken");

exports.JWTVerify = async (tokenType, tokenAuth) => {
  if (tokenType != "Bearer") {
    return false;
  } else {
    let resultToken = await JWT.verify(
      tokenAuth,
      process.env.SecretKey,
      (err, resultToken) => {
        if (err) return false;
        if (resultToken) return resultToken;
      }
    );
    return resultToken;
  }
};
