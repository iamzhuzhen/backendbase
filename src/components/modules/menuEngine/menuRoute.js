const express = require('express');
const router = express.Router();
const routesVersion = require('express-routes-versioning')();
const controller = require(SRC_FILES.components.modules.menuEngine.controller);

/* GET home page. */
router.get('/getMenus',
  routesVersion({
    '1.0.0': controller.getMenus
  }) 
);

module.exports = router;