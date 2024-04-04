var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var clientModel = require('../schema/client');

var checklogin = require('../middlewares/checklogin');
var clientValidator = require('../validators/user');
var { validationResult } = require('express-validator');

//dang nhap
// router.post('/login', async function(req,res,next){
//     var result = await clientModel.GetCre(req.body.Username, req.body.Password);
//     console.log(result);
//     if (result.error) {
//       ResHelper.RenderRes(res, false, result.error);
//     } else {
//       ResHelper.RenderRes(res, true, result.getJWT());
//     }
//   })
  
  //tạo tài khoản mới
  router.post('/register', clientValidator.checkEmail(), clientValidator.checkPassword(), clientValidator.checkUserName(), async function (req, res, next) {
      var result = validationResult(req);
      if(result.errors.length > 0) {
        ResHelper.RenderRes(res, false, result.error );
        return;
      }
      try {
        var newclient = new clientModel({
          FullName: req.body.FullName,
          UserName: req.body.UserName,
          Password: req.body.Password,
          SDT: req.body.SDT,
          Email: req.body.Email,
          Birthday:req.body.Birthday
        })
        await newclient.save();
        ResHelper.RenderRes(res, true, newclient.getJWT())
      } catch (error) {
        ResHelper.RenderRes(res, false, error)
      }
  });

router.get('/me', checklogin, async function(req,res,next){
  ResHelper.RenderRes(res, true, req.user);
})

router.post('/login', async function (req, res, next) {
  var result = await clientModel.GetCre(req.body.UserName, req.body.Password);
  console.log(result);
  if (result.error) {
    ResHelper.RenderRes(res, false, result.error);
  } else {
    res.status(200)
      .cookie('token', result.getJWT(), {
        expires: new Date(Date.now + 24 * 3600 * 1000),
        httpOnly: true
      })
      .send({
        success: true,
        data: result.getJWT()
      }
      );
    //ResHelper.RenderRes(res, true, result.getJWT());
  }
});

router.post('/logout', checklogin, function(req, res, next){
  if (req.cookies.token) {
    res.status(200)
      .cookie('token', "null", {
        expires: new Date(Date.now + 1000),
        httpOnly: true
      })
      .send({
        success: true,
        data: result.getJWT()
      }
      );
  }
})

module.exports = router;