var ResHelper = require('../helper/ResponseHelper');

module.exports = function (...checkrole) {
    return function (req, res, next) {
        let userRole = req.user.RoleID;
        let matchArray = checkrole.filter(e => e == userRole);
        if (matchArray.length > 0) {
            next();
        } else {
            ResHelper.RenderRes(res, false, "Bạn không có quyền truy cập")
        }
    }
}