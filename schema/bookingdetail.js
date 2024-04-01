var mongoose = require('mongoose');

var bookingdtdb = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        ref: 'booking'
    },
    ServiceID:{
        type: mongoose.Types.ObjectId,
        ref: 'service'
    },
    Price:{
        type: Number,
        requied:true
    }
},{timestamps: true})

module.exports = new mongoose.model('bookingdetail', bookingdtdb);