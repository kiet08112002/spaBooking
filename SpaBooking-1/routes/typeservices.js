var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var serviceModle = require('../schema/typeservice');


router.get('/',async function(req,res,next){
    let typeservices = await serviceModle.find({}).populate('published').exec();
    ResHelper.RenderRes(res,true,typeservices);
})

router.get('/:id', async function (req, res, next) {
  try {
    let typeservices = await serviceModle.find({ _id: req.params.id }).exec();
    ResHelper.RenderRes(res, true, typeservices)
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

router.post('/', async function (req, res, next) {
    try {
      var newtypeservice = new serviceModle({
        Name: req.body.Name
      })
      await newtypeservice.save();
      ResHelper.RenderRes(res, true, newtypeservice)
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
  });

router.put('/:id', async function (req, res, next) {
    try {
      let typeservices = await serviceModle.findByIdAndUpdate
        (req.params.id, req.body, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, typeservices);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});
  
  
router.delete('/:id', async function (req, res, next) {
    try {
      let typeservices = await serviceModle.findByIdAndUpdate
        (req.params.id, {
          isDeleted: true
        }, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, typeservices);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

module.exports = router;