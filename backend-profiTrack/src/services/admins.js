const {AdminsModel} = require('../models/admin');

class AdminService{
    newAdmin(request)  {
        return new AdminsModel(request);
    };

    getAdmin(request) {
        return AdminsModel.findOne(request);
    }

    getAdmins(){
        return AdminsModel.find({});
    }

    updateAdmin(req, data){
        return AdminsModel.findOneAndUpdate(req, data, { new: true });
    }

    deleteAdmin(){
        return AdminsModel.findOneAndDelete(req);
    }
}

module.exports = new AdminService();
