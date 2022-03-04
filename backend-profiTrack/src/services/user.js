const UserModel = require('../../models/users');

class UserService{
    newUser(request)  {
        return new UserModel(request);
    };
    getSingleUser(query) {
        return UserModel.findOne(query);
    }

}

module.exports = new UserService();
