const {RolesModel} = require('../models');

class RoleService{
    newRole(request)  {
        return new RolesModel(request);
    };

    getRole(request) {
        return RolesModel.findOne(request);
    }

    getRoles(){
        return RolesModel.find({});
    }

    updateRole(req, data){
        return RolesModel.findOneAndUpdate(req, data, { new: true });
    }

    deleteRole(req){
        return RolesModel.findOneAndDelete(req);
    }
}

module.exports = new RoleService();
