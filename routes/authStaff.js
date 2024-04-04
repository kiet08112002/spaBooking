var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var staffModel = require('../schema/staff');

var checklogin = require('../middlewares/checklogin');
var staffValidator = require('../validators/user');
var { validationResult } = require('express-validator');

//tạo tài khoản mới
router.post('/register', staffValidator.checkEmail(), staffValidator.checkPassword(), staffValidator.checkUserName(), async function (req, res, next) {
  var result = validationResult(req);
  if (result.errors.length > 0) {
    ResHelper.RenderRes(res, false, result.error);
    return;
  }
  try {
    var newstaff = new staffModel({
      FullName: req.body.FullName,
      UserName: req.body.UserName,
      Password: req.body.Password,
      Email: req.body.Email,
      RoleID: req.body.RoleID,
      CCCD: req.body.CCCD,
      Address: req.body.Address
    })
    await newstaff.save();
    ResHelper.RenderRes(res, true, newstaff.getJWT())
  } catch (error) {
    ResHelper.RenderRes(res, false, error)
  }
});

router.get('/me', checklogin, async function (req, res, next) {
  ResHelper.RenderRes(res, true, req.user);
})

//dang nhap
// router.post('/login', async function (req, res, next) {
//   var result = await staffModel.GetCre(req.body.UserName, req.body.Password);
//   console.log(result);
//   if (result.error) {
//     ResHelper.RenderRes(res, false, result.error);
//   } else {
//     ResHelper.RenderRes(res, true, result.getJWT());
//   }
// });
router.post('/login', async function (req, res, next) {
  var result = await staffModel.GetCre(req.body.UserName, req.body.Password);
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

router.post('/logout', checklogin, function (req, res, next) {
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