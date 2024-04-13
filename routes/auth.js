var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var clientModel = require('../schema/client');
var checklogin = require('../middlewares/checklogin');
var { validationResult } = require('express-validator');
var clientValidator = require('../validators/user');
var sendmail = require('../helper/sendMail');
const config = require('../configs/config');
  
  //tạo tài khoản mới
  router.post('/register', clientValidator.checkEmail(), clientValidator.checkPassword(), clientValidator.checkUserName(), async function (req, res, next) {
    var result = validationResult(req);
    if (result.errors.length > 0) {
      ResHelper.RenderRes(res, false, result.error);
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

//Reset Password!!!!!!!!
router.post("/forgotPassword", async function (req, res, next) {
  var client = await clientModel.findOne({
    Email: req.body.Email
  })
  if (client) {
    let token = client.genTokenResetPassword();
    await client.save();
    try {
      let url = `http://${config.hostName}/auth/ResetPassword/${token}`;
      let message = `click zo url de reset passs: ${url}`
      sendmail(message, client.Email);
      ResHelper.RenderRes(res, true, "Thanh cong");

    } catch (error) {
      client.resetPasswordToken = undefined;
      client.resetPasswordExp = undefined;
      await client.save();
      ResHelper.RenderRes(res, false, error);
    }
  } else {
    ResHelper.RenderRes(res, false, "email khong ton tai");
  }
})

router.post("/ResetPassword/:token", clientValidator.checkPassword(), async function (req, res, next) {
  var result = validationResult(req);
  if (result.errors.length > 0) {
    ResHelper.RenderRes(res, false, result.errors);
    return;
  }
  var client = await clientModel.findOne({
    resetPasswordToken: req.params.token
  })
  if (client) {
    if (client.resetPasswordExp > Date.now()) {
      client.Password = req.body.Password;
      client.resetPasswordToken = undefined;
      client.resetPasswordExp = undefined;
      await client.save();
      ResHelper.RenderRes(res, true, "Reset thanh cong");
    } else {
      ResHelper.RenderRes(res, false, "URL het han");
    }
  } else {
    ResHelper.RenderRes(res, false, "URL khong hop le");
  }
})

module.exports = router;