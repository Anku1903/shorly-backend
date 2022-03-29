const express = require('express');
const router = express.Router();
const {registerController,loginrController,editController,getController,clickController,insertController} = require('../controllers/authcontroller');

router.post('/register',registerController);
router.post('/login',loginrController);
router.post('/insert',insertController);
router.post('/getdata',getController);
router.post("/click",clickController);
router.post("/edit",editController);




module.exports = router;










