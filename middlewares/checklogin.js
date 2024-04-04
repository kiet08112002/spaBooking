var jwt = require("jsonwebtoken");
const config = require('../configs/config');
var clientModel = require('../schema/client')
var staffModel = require('../schema/staff');
var ResHelper = require('../helper/ResponseHelper');

module.exports = async function (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else {
        if (req.cookies.token) {
            token = req.cookies.token
        }
    }
    if (!token) {
        ResHelper.RenderRes(res, false, "vui long dang nhap");
        return;
    }
    try {
        let data = jwt.verify(token, config.SECRET_KEY);
        if (data.exp * 1000 > Date.now()) {
            let user = await clientModel.findById(data.id);
            if(!user){
                user = await staffModel.findById(data.id);
            }
            req.user = user;
            next();
        }else {
            ResHelper.RenderRes(res, false, "vui long dang nhap");
        }
    } catch (error) {
        ResHelper.RenderRes(res, false, "vui long dang nhap");
    }
}