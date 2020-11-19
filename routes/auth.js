var express = require('express')
const { check } = require('express-validator');
var router = express.Router()
const {signout,signup,signin,getAllUsers, isSignedIn} =require('../controllers/auth')




router.post("/signup",
[check("name","name should be atleast 3char").isLength({min:3}),
check("email","email si required").isEmail(),
check("password","password should be 3char").isLength({min:3}),
]
,signup),



router.post("/signin",
[
check("email","email is required").isEmail(),
check("password","password field is required").isLength({min:3}),
]
,signin),



router.get("/users",getAllUsers)

router.get("/signout",signout)

router.get("/testroute",isSignedIn,(req,res)=>{
 res.json(req.auth);
})



module.exports=router;