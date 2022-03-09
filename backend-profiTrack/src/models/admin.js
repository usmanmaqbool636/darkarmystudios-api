const mongoose = require("mongoose");
const crypto = require("crypto");

const adminSchema= new mongoose.Schema({
    adminId: {
        type: String,
    },
    fullname:{
        type:String,
        default:"",
        trim:true
    },
    username:{
        type:String,
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    // save in HASH
    password:{
        type:String,
        required:true,
        default:"123456"
    },
    imageUrl:{
        type:String,
        default:"",
    },
    lastLogin:{
        type:Date,
        default:Date.now()
    },
    fcmToken:{
        type:String,
        default:""
    },
    status:{
        type:Boolean,
        default:false
    },
    super_admin: {
        type: Boolean,
        default: false
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
    },
    approvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admins"
    },
    approveDate:{
        type:Date,
    }
},{
    timestamps:true
});

adminSchema.methods.genrateHash = async function (password) {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, process.env.TOKEN_KEY, 64, (err, derivedKey) => {
            if (err) reject(err);
            return resolve(derivedKey.toString('hex'))
        });
    })
}

adminSchema.methods.comparePassword = async function (password) {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, process.env.TOKEN_KEY, 64, (err, derivedKey) => {
            if (err) reject(err);
            return resolve(this.password == derivedKey.toString('hex'))
        });
    })
}

adminSchema.methods.resetPasswordCompare = async function (password) {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, process.env.TOKEN_KEY, 64, (err, derivedKey) => {
            if (err) reject(err);
            return resolve(this.resetPassword.password == derivedKey.toString('hex'))
        });
    })
}

module.exports = Admins = mongoose.model("admins", adminSchema);