var AdminService = require('../services/admins.js') 
// import { nanoid } from 'nanoid'

exports.addAdmin = async (req, res, next) => {
    try {
      const { body } = req;
      // body.adminId = nanoid()
      const Admin = AdminService.newAdmin(body);

      await Admin.save();
  
      return res.status(200).json({
        success: true,
        data: {
          Admin
        },
        message: "Admin Created Successfully",
        status: 200,
      });
    } catch (error) {
      return next(error);
    }
};

exports.getAllAdmins = async (req, res, next) => {
    try {
      const Admins = await AdminService.getAdmins({});
      return res.status(200).json({
        success: true,
        data: {
          Admins
        },
        message: "ok",
        status: 200,
      });
    } catch (error) {
      return next(error);
    }
};
  
exports.getSingleAdmin = async (req, res, next) => {
    try {
      const Admin = await AdminService.getAdmin({_id:req.params.id});
      console.log(Admin)
      return res.status(200).json({
        success: true,
        data: {
          Admin
        },
        message: "ok",
        status: 200,
      });
    } catch (error) {
      return next(error);
    }
};
  
exports.updateAdmin = async (req, res, next) => {
    try {
        const Admin = await AdminService.updateAdmin({_id:req.params.id},req.body);
        return res.status(200).json({
        success: true,
        data: {
            Admin
        },
        message: "ok",
        status: 200,
        });
    } catch (error) {
        return next(error);
    }
};
  
exports.deleteAdmin = async (req, res, next) => {
    try {
        const Admin = await AdminService.deleteAdmin({_id:req.params.id},{$set:{
        deletedAt:Date.now(),
        // deletedBy:
        isDeleted:true
        }})
        
        return res.status(200).json({
        success: true,
        data: {
            Admin
        },
        message: "ok",
        status: 200,
        });
    } catch (error) {
        return next(error);
    }
};
  