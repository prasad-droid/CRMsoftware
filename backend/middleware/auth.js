const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "psmcodes_secret";

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  // console.log("Auth header:", authHeader);
  // console.log("Token:", token);

  if (!token) {
    return res.status(403).json({ error: "Forbidden - no token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = decoded;
    next();
  });
}

module.exports = authenticate;
