const AdminModel = require('./../models/admins');

class AdminService{
    newAdmin(request)  {
        return new AdminModel(request);
    };

    getAdmin(req, res) {
        res.send('200', {"news": "Hi there"})
        return AdminModel.findOne(req);
    }
}

module.exports = new AdminService();
