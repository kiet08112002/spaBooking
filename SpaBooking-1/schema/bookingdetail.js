var mongoose = require('mongoose');

var bookingdtdb = new mongoose.Schema({
    BookingID:{
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
})

module.exports = new mongoose.model('bookingdetail', bookingdtdb);