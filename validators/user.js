let { check } = require('express-validator');
let util = require('node:util');
let option = {
    password:{
        minLength: 6,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    },
    username:{
        max: 42,
        min: 6
    }
}

module.exports = {
    checkChain: function () {
        return [
            check("password", util.format("password phải ít nhất %d kí tự, %d chữ in hoa, %d chữ thường,%d số",
            option.password.minLength, option.password.minSymbols, option.password.minUppercase, option.password.minLowercase, option.password.minNumbers
            )).isStrongPassword(option.password),
            check('email',"email đúng định dạng").isEmail(),
            check('username',"user phải từ %d đến %d kí tự").isLength(option.username),
            check('role',"role không hợp lệ").isIn(["user","admin","publisher"])
        ]
    }
}