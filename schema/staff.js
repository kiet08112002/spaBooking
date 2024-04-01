var mongoose = require('mongoose');

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
    Pasword: {
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

// staffdb.virtual('published',{
//     ref:'service',
//     localField:'_id',
//     foreignField :'staff'
// })
// staffdb.set('toJSON',{virtuals:true});
// staffdb.set('toObject',{virtuals:true});

module.exports = new mongoose.model('Staff', staffdb)