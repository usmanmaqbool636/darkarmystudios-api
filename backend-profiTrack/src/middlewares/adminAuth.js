const jwt = require("jsonwebtoken");
const AdminService = require("../services/admin");

exports.RequireSigninAdmin = (
    req,
    res,
    next
  ) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
  
    if (!token) {
      return next({ status: 401, message: "Unauthorized" });
    }
  
    jwt.verify(
      token,
      process.env.TOKEN_KEY,
      async (err, decode) => {
        if (!decode) {
          return  next({ status: 401, message: "Invalid Token" });
        } else {
          const admin = await AdminService.getAdmin({ _id: decode._id });
          req.user = admin;
          return next();
        }
      }
    );
  };
  