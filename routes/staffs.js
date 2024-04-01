var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var staffModel = require('../schema//staff');


router.get('/',async function(req,res,next){
    let staffs = await staffModel.find({}).exec();
    ResHelper.RenderRes(res,true,staffs);
})

router.post('/', async function (req, res, next) {
    try {
      var newstaff = new staffModel({
        Name: req.body.Name,
        UserName: req.body.UserName,
        Pasword: req.body.Pasword,
        Email: req.body.Email,
        RoleID: req.body.RoleID,
        CCCD: req.body.CCCD,
        Address: req.body.Address
      })
      await newstaff.save();
      ResHelper.RenderRes(res, true, newstaff)
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

router.put('/:id', async function (req, res, next) {
    try {
      let staffs = await staffModel.findByIdAndUpdate
        (req.params.id, req.body, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, staffs);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});
  
  
router.delete('/:id', async function (req, res, next) {
    try {
      let staffs = await staffModel.findByIdAndUpdate
        (req.params.id, {
          isDeleted: true
        }, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, staffs);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

module.exports = router;