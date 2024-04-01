var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var clientModel = require('../schema/client');

router.get('/',async function(req,res,next){
    let clients = await clientModel.find({}).exec();
    ResHelper.RenderRes(res,true,clients);
})

router.post('/', async function (req, res, next) {
    try {
      var newclient = new clientModel({
        _id: req.body._id,
        FullName: req.body.FullName,
        Username: req.body.Username,
        Pasword: req.body.Pasword,
        Email: req.body.Email,
        Birthday:req.body.Birthday
      })
      await newclient.save();
      ResHelper.RenderRes(res, true, newclient)
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

router.put('/:id', async function (req, res, next) {
    try {
      let clients = await clientModel.findByIdAndUpdate
        (req.params.id, req.body, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, clients);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});
  
  
router.delete('/:id', async function (req, res, next) {
    try {
      let cliens = await clientModel.findByIdAndUpdate
        (req.params.id, {
          isDeleted: true
        }, {
          new: true
        }).exec()
      ResHelper.RenderRes(res, true, cliens);
    } catch (error) {
      ResHelper.RenderRes(res, false, error)
    }
});

module.exports = router;