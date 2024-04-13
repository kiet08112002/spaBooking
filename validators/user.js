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
    checkEmail: function() {
        return check('Email',"email đúng định dạng").isEmail()
    },
    checkPassword: function() {
        return check('Password', util.format("password phải ít nhất %d kí tự, % kí tự đặc biệt, %d chữ in hoa, %d chữ thường,%d số",
                option.password.minLength, option.password.minSymbols, option.password.minUppercase, option.password.minLowercase, option.password.minNumbers
                )).isStrongPassword(option.password)
    },
    checkUserName: function() {
        return check('UserName', util.format("user phải từ %d đến %d kí tự", option.username.min, option.username.max)).isLength(option.username)
    },
    // checkSDT: function(){
    //     return check('SDT', util.format("SDT không hợp lệ")).isMobilePhone()
    //     // SDT, "vi-VN"
    // }
}