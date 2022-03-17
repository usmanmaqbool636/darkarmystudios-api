var RoleService = require('../services/roles.js') 

exports.addRole = async (req, res, next) => {
    try {
      const { body } = req;
      const Role = RoleService.newRole(body);

      await Role.save();
  
      return res.status(200).json({
        success: true,
        data: {
          Role
        },
        message: "Role Created Successfully",
        status: 200,
      });
    } catch (error) {
      return next(error);
    }
};

exports.getAllRoles = async (req, res, next) => {
    try {
      const Roles = await RoleService.getRoles({});
      return res.status(200).json({
        success: true,
        data: {
          Roles
        },
        message: "ok",
        status: 200,
      });
    } catch (error) {
      return next(error);
    }
};
  
exports.getSingleRole = async (req, res, next) => {
    try {
      const Role = await RoleService.getRole({_id:req.query.id});
      console.log(Role)
      return res.status(200).json({
        success: true,
        data: {
          Role
        },
        message: "ok",
        status: 200,
      });
    } catch (error) {
      return next(error);
    }
};
  
exports.updateRole = async (req, res, next) => {
    try {
        const Role = await RoleService.updateRole({_id:req.query.id},req.body);
        if (!Role)
          return next({
            success: false,
            data: {},
            message: "Role Not found",
            status: 404,
          });
        return res.status(200).json({
        success: true,
        data: {
            Role
        },
        message: "ok",
        status: 200,
        });
    } catch (error) {
        return next(error);
    }
};
  
exports.deleteRole = async (req, res, next) => {
    try {
      console.log(req.query.id);
        const Role = await RoleService.deleteRole({_id:req.query.id},{$set:{
        deletedAt:Date.now(),
        // deletedBy:
        isDeleted:true
        }})
        if (!Role)
          return next({
            success: false,
            data: {},
            message: "Role Not found",
            status: 404,
          });
        return res.status(200).json({
        success: true,
        data: {
            Role
        },
        message: "ok",
        status: 200,
        });
    } catch (error) {
        return next(error);
    }
};
  