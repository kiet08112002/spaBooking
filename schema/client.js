var mongoose = require('mongoose');

var clientdb = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    FullName: {
        type: String,
        required: true
    },
    Username:{
        type:String,
        required: true
    },
    Pasword: {
        type: String,
        required: true
    },
    Email:{
        type:   String,
        required: true
    },
    Birthday: {
        type: String,
        required: true
    }
},{timestamps: true})

clientdb.virtual('published',{
    ref:'booking',
    localField:'_id',
    foreignField :'ClientID'
})
clientdb.set('toJSON',{virtuals:true});
clientdb.set('toObject',{virtuals:true});

module.exports = new mongoose.model('Client', clientdb)