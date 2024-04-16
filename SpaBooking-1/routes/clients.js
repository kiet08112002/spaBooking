var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var clientModel = require('../schema/client');

var clientValidator = require('../validators/user');
var { validationResult } = require('express-validator');
var checklogin = require('../middlewares/checklogin');
var checkAuthorize = require('../middlewares/checkauthorize');

//async hàm bất đồng bộ

router.get('/', async function(req,res,next){
    let clients = await clientModel.find({}).exec();
    ResHelper.RenderRes(res,true,clients);
})

router.get('/:phone', async function (req, res, next) {
  try {
    let clients = await clientModel.find({ SDT: req.params.phone }).exec();
    if(clients[0]){
      ResHelper.RenderRes(res, true, clients)
    }else{
      ResHelper.RenderRes(res, false, clients)
    }
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});
// router.post('/register', async function (req, res, next) {
//     try {
//       var newclient = new clientModel({
//         FullName: req.body.FullName,
//         Username: req.body.Username,
//         Password: req.body.Password,
//         SDT: req.body.SDT,
//         Email: req.body.Email,
//         Birthday:req.body.Birthday
//       })
//       await newclient.save();
//       ResHelper.RenderRes(res, true, newclient)
//     } catch (error) {
//       ResHelper.RenderRes(res, false, error)
//     }
// });

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