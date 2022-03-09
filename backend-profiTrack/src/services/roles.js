const {RoleModel} = require('../models/role.js');

class RoleService{
    newRole(request)  {
        return new RoleModel(request);
    };

    getRole(request) {
        return RoleModel.findOne(request);
    }

    getRoles(){
        return RoleModel.find({});
    }

    updateRole(req, data){
        return RoleModel.findOneAndUpdate(req, data, { new: true });
    }

    deleteRole(){
        return RoleModel.findOneAndDelete(req);
    }
}

module.exports = new RoleService();
