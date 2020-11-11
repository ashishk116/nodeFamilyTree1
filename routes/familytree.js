const express= require('express');
const router = express.Router();
const {getFamilyTreeById,createFamilyTree,getfamilytree,getallfamilytree}= require('../controllers/familytree')
const {isAuthenticated,isAdmin,isOwner,isSignedIn}= require('../controllers/auth')
const {getUserById}= require('../controllers/user')


router.param("userId",getUserById);
router.param("familytreeId",getFamilyTreeById);

//routes
router.post("/familytree/create/:userId",isSignedIn,isAuthenticated,isAdmin,createFamilyTree)

router.get("/familytree/:familytreeId",getfamilytree)
router.get("/familytrees",getallfamilytree)


module.exports=router;