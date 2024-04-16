var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var roleModel = require('../schema/role');


router.get('/',async function(req,res,next){
    let roles = await roleModel.find({}).exec();
    ResHelper.RenderRes(res,true,roles);
})

router.post('/', async function (req, res, next) {
    try {
      var newrole = new roleModel({
        Name: req.body.Name
      })
      await newrole.save();
      ResHelper.RenderRes(res, true, newrole)
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

router.put('/:id', async function (req, res, next) {
    try {
      let roles = await roleModel.findByIdAndUpdate
        (req.params.id, req.body, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, roles);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});
  
router.delete('/:id', async function (req, res, next) {
    try {
      let roles = await roleModel.findByIdAndUpdate
        (req.params.id, {
          isDeleted: true
        }, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, roles);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

module.exports = router;