const jwt = require("jsonwebtoken");
const AdminService = require("../services/admins");
const RoleService = require("../services/roles");

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

exports.getAuth = function (req, res, next) {
  if(req) { 
    const role = await RoleService.getRole({ _id: req.role_id });
    var allow = false;

    role.forEach(function(perm){
      if (req.method == "POST" && perms.create) allow = true;
      else if (req.method == "GET" && perms.read) allow = true;
      else if (req.method == "PUT" && perms.write) allow = true;
      else if (req.method == "DELETE" && perm.delete) allow = true;
    })
    if (allow) next();
    else res.status(403).send({error: 'access denied'});
   } else res.status(400).send({error: 'invalid token'})
}
