var mongoose = require('mongoose');

var roledb = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Deleted: {
        type: Boolean,
        default: false
    },
},{timestamps:true})

roledb.virtual('published',{
    ref:'staff',
    localField:'_id',
    foreignField :'RoleID'
})
roledb.set('toJSON',{virtuals:true});
roledb.set('toObject',{virtuals:true});

module.exports = new mongoose.model('role', roledb);