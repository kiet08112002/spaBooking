var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jsonwebtoken = require("jsonwebtoken");
const config = require('../configs/config');
var crypto = require('crypto');

var staffdb = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    FullName: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    RoleID: {
        type: mongoose.Types.ObjectId,
        ref: 'role'
    },
    CCCD: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Deleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

staffdb.pre('save', function () {
    if (this.isModified('Password')) {
        this.Password = bcrypt.hashSync(this.Password, 10);
    }
})
staffdb.methods.genTokenResetPassword = function () {
    let token = crypto.randomBytes(30).toString('hex');
    this.resetPasswordToken = token
    this.resetPasswordExp = Date.now() + 10 * 60 * 1000;
    return token;
}

staffdb.methods.getJWT = function () {
    var token = jsonwebtoken.sign({ id: this._id },
        config.SECRET_KEY, {
        expiresIn: config.EXPIRE_JWT
    });
    return token;
}

staffdb.statics.GetCre = async function (UserName, Password) {
    if (!UserName || !Password) {
        return { error: "phai dien day du username va password" };
    }
    var user = await this.findOne({ UserName: UserName });
    if (!user) {
        return { error: "user sai" };
    }
    if (bcrypt.compareSync(Password, user.Password)) {
        return user;
    } else {
        return { error: "password sai" };//user hoac password sai
    }
}

// staffdb.virtual('published',{
//     ref:'service',
//     localField:'_id',
//     foreignField :'staff'
// })
// staffdb.set('toJSON',{virtuals:true});
// staffdb.set('toObject',{virtuals:true});

module.exports = new mongoose.model('Staff', staffdb)