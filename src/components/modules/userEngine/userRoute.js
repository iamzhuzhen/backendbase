const express = require('express');
const router = express.Router();
const routesVersion = require('express-routes-versioning')();
const controller = require(SRC_FILES.components.modules.userEngine.userController);
router.get('/getRequest',
  routesVersion({
    '1.0.0': controller.getRequest
  }) 
);
router.post('/postRequest',
  routesVersion({
    '1.0.0': controller.postRequest
  }) 
);
module.exports = router;