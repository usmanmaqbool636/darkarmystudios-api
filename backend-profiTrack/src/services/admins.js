const {AdminModel} = require('../models/admin');

class AdminService{
    newAdmin(request)  {
        return new AdminModel(request);
    };

    getAdmin(request) {
        return AdminModel.findOne(request);
    }

    getAdmins(){
        return AdminModel.find({});
    }

    updateAdmin(req, data){
        return AdminModel.findOneAndUpdate(req, data, { new: true });
    }

    deleteAdmin(){
        return AdminModel.findOneAndDelete(req);
    }
}

module.exports = new AdminService();
