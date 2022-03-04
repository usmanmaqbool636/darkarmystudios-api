var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    Token: {
        type: String
    }
},{
    timestamps:true
}
)

module.exports = Users = mongoose.model("users", UserSchema);