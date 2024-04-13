var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jsonwebtoken = require("jsonwebtoken");
const config = require('../configs/config');
var crypto = require('crypto');

var clientdb = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    UserName:{
        type:String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    SDT:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        // required: true
    },
    Birthday: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExp: String
},{timestamps: true})

clientdb.pre('save', function () {
    if (this.isModified('Password')) {
        this.Password = bcrypt.hashSync(this.Password, 10);
    }
})
clientdb.methods.genTokenResetPassword = function () {
    let token = crypto.randomBytes(30).toString('hex');
    this.resetPasswordToken = token
    this.resetPasswordExp = Date.now() + 10 * 60 * 1000;
    return token;
}

clientdb.methods.getJWT = function () {
    var token = jsonwebtoken.sign({ id: this._id },
        config.SECRET_KEY, {
        expiresIn: config.EXPIRE_JWT
    });
    return token;
}

clientdb.statics.GetCre = async function (UserName, Password) {
    if (!UserName || !Password) {
        return { error: "phai dien day du username va password" };
    }
    var user = await this.findOne({ UserName: UserName });
    if (!user) {
        return { error: "user hoac password sai" };
    }
    if (bcrypt.compareSync(Password, user.Password)) {
        return user;
    } else {
        return { error: "user hoac password sai" };//user hoac password sai
    }
}

// clientdb.virtual('published',{
//     ref:'booking',
//     localField:'_id',
//     foreignField :'ClientID'
// })
// clientdb.set('toJSON',{virtuals:true});
// clientdb.set('toObject',{virtuals:true});

module.exports = new mongoose.model('Client', clientdb)