var mongoose = require('mongoose');

var typeservicedb = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    // StaffID:{
    //     type: mongoose.Types.ObjectId,
    //     ref: Staff
    // }
},{timestamps: true})

typeservicedb.virtual('published',{
    ref:'service',
    localField:'_id',
    foreignField :'TypeID'
})
typeservicedb.set('toJSON',{virtuals:true});
typeservicedb.set('toObject',{virtuals:true});

module.exports = new mongoose.model('typeservice', typeservicedb);