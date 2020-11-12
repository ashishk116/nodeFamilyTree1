const express = require("express");
const router = express.Router();

const {getMemberById}= require('../controllers/member')
const {isSignedIn,isAuthenticated,isAdmin}= require('../controllers/auth')
const {getUserById}= require('../controllers/user')


router.param("userId",getUserById);
router.param("memberId",getMemberById);



module.exports= router;