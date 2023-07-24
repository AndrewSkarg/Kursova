const { sign, verify } = require("jsonwebtoken");
const user = require("./models/user");

const createTokens = (user) => {
  const accessToken = sign(
    { email: user.email, user_id: user.user_id },
    "some_secretkey_in_env"  
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(401).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, "some_secretkey_in_env"); 
    if (validToken) {
      req.authenticated = true;
      req.user=validToken;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
