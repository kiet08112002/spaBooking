var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var bookingModel = require('../schema/bookingdetail');


router.get('/',async function(req,res,next){
    let bookings = await bookingModel.find({}).exec();
    ResHelper.RenderRes(res,true,bookings);
})

router.post('/', async function (req, res, next) {
    try {
      var newbooking = new bookingModel({
        BookingID: req.body.BookingID,
        ServiceID: req.body.ServiceID,
        Price: req.body.Price
      })
      await newbooking.save();
      ResHelper.RenderRes(res, true, newbooking)
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

// router.put('/:id', async function (req, res, next) {
//     try {
//       let bookings = await bookingModel.findByIdAndUpdate
//         (req.params.id, req.body, {
//           new: true
//         }).exec()
//       ResHelper.RenderRes(res, true, bookings);
//     } catch (error) {
//       ResHelper.RenderRes(res, false, error)
//     }
// });
  
  
// router.delete('/:id', async function (req, res, next) {
//     try {
//       let bookings = await bookingModel.findByIdAndUpdate
//         (req.params.id, {
//           isDeleted: true
//         }, {
//           new: true
//         }).exec()
//       ResHelper.RenderRes(res, true, bookings);
//     } catch (error) {
//       ResHelper.RenderRes(res, false, error)
//     }
// });

module.exports = router;