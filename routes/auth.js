var express = require('express')
const { check } = require('express-validator');
var router = express.Router()
const {signout,signup} =require('../controllers/auth')




router.post("/signup",
[
check("email","email si required").isEmail(),
check("password","password should be 3char").isLength({min:3}),
]

,signup),

router.get("/signout",signout)

module.exports=router;