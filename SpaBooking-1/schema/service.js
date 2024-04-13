var mongoose = require('mongoose');

var servicedb = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    TypeID: {
        type: mongoose.Types.ObjectId,
        ref: 'typeservice'
    },
    Description: String,
    Price: Number  ,
    Delete: {
        type: Boolean,
        default: false
    },
    // staffID:{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'staff'
    // }
},{timestamps: true})

servicedb.virtual('published',{
    ref:'bookingdetail',
    localField:'_id',
    foreignField :'ServiceID'
})
servicedb.set('toJSON',{virtuals:true});
servicedb.set('toObject',{virtuals:true});

module.exports = new mongoose.model('service', servicedb);