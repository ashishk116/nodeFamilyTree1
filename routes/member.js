const express = require("express");
const router = express.Router();

const {getMemberById,createMember}= require('../controllers/member')
const {isSignedIn,isAuthenticated,isAdmin}= require('../controllers/auth')
const {getUserById}= require('../controllers/user')

//all of param
router.param("userId",getUserById);
router.param("memberId",getMemberById);


//actual routes
router.post("/member/create/:userId",isSignedIn,isAuthenticated,isAdmin,createMember);


module.exports= router;