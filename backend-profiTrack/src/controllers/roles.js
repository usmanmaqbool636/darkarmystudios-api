var RoleService = require('../services/Role.js') 
// import { nanoid } from 'nanoid'

exports.addRole = async (req, res, next) => {
    try {
      const { body } = req;
      // body.roleId = nanoid()
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
      const Role = await RoleService.getRole({_id:req.params.id});
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
        const Role = await RoleService.updateRole({_id:req.params.id},req.body);
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
        const Role = await RoleService.deleteRole({_id:req.params.id},{$set:{
        deletedAt:Date.now(),
        // deletedBy:
        isDeleted:true
        }})
        
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
  