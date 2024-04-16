var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var serviceModle = require('../schema/service');


router.get('/',async function(req,res,next){
    let services = await serviceModle.find({}).exec();
    ResHelper.RenderRes(res,true,services);
})
router.get('/:id',async function(req,res,next){
  let services = await serviceModle.find({ _id: req.params.id}).exec();
  ResHelper.RenderRes(res,true,services);
})
router.post('/', async function (req, res, next) {
    try {
      var newservice = new serviceModle({
        Name: req.body.Name,
        TypeID: req.body.TypeID,
        Description: req.body.Description,
        Price: req.body.Price
      })
      await newservice.save();
      ResHelper.RenderRes(res, true, newservice)
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

router.put('/:id', async function (req, res, next) {
    try {
      let services = await serviceModle.findByIdAndUpdate
        (req.params.id, req.body, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, services);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});
  
  
router.delete('/:id', async function (req, res, next) {
    try {
      let services = await serviceModle.findByIdAndUpdate
        (req.params.id, {
          isDeleted: true
        }, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, services);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

module.exports = router;