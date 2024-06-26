var mongoose = require('mongoose');

var bookingdb = new mongoose.Schema({
    ClientID:{
        type: mongoose.Types.ObjectId,
        ref: 'client'
    },
    FullName:{
        type: String,
        requied:true
    },
    Date: {
        type: Date,
        requied: true
    },
    Time: {
        type: String,
        requied: true
    }
},{timestamps: true})

bookingdb.virtual('published',{
    ref:'bookingdetail',
    localField:'_id',
    foreignField :'BookingID'
})
bookingdb.set('toJSON',{virtuals:true});
bookingdb.set('toObject',{virtuals:true});

module.exports = new mongoose.model('booking', bookingdb);