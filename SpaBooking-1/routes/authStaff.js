var express = require('express');
var router = express.Router();
var ResHelper = require('../helper/ResponseHelper');
var staffModel = require('../schema/staff');
var checklogin = require('../middlewares/checklogin');
var { validationResult } = require('express-validator');
var staffValidator = require('../validators/user');
var sendmail = require('../helper/sendMail');
const config = require('../configs/config');

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
        data: "đã đăng xuất" //result.getJWT()
      }
      );
  }
})

//Reset Password!!!!!!!!
router.post("/forgotPassword", async function (req, res, next) {
  var staff = await staffModel.findOne({
    Email: req.body.Email
  })
  if (staff) {
    let token = staff.genTokenResetPassword();
    await staff.save();
    try {
      let url = `http://localhost:4200/resetpassword/${token}`;
      let message = `click zo url de reset passs: ${url}`
      sendmail(message, staff.Email);
      ResHelper.RenderRes(res, true, "Thanh cong");

    } catch (error) {
      staff.resetPasswordToken = undefined;
      staff.resetPasswordExp = undefined;
      await staff.save();
      ResHelper.RenderRes(res, false, error);
    }
  } else {
    ResHelper.RenderRes(res, false, "email khong ton tai");
  }
})

router.post("/ResetPassword/:token", staffValidator.checkPassword(), async function (req, res, next) {
  var result = validationResult(req);
  if (result.errors.length > 0) {
    ResHelper.RenderRes(res, false, result.errors);
    return;
  }
  var staff = await staffModel.findOne({
    resetPasswordToken: req.params.token
  })
  if (staff) {
    if (staff.resetPasswordExp > Date.now()) {
      staff.Password = req.body.Password;
      staff.resetPasswordToken = undefined;
      staff.resetPasswordExp = undefined;
      await staff.save();
      ResHelper.RenderRes(res, true, "Reset thanh cong");
    } else {
      ResHelper.RenderRes(res, false, "URL het han");
    }
  } else {
    ResHelper.RenderRes(res, false, "URL khong hop le");
  }
})

module.exports = router;