const express = require('express');
const router = express.Router();
const routesVersion = require('express-routes-versioning')();
const controller = require(SRC_FILES.components.modules.loginEngine.loginController);

router.get('/login', 
  routesVersion({
    '1.0.0': controller.login
  })
);

router.post('/post', 
  routesVersion({
    '1.0.0': controller.post
  })
);

module.exports = router;