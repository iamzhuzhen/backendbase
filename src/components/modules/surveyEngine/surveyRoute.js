const express = require('express');
const router = express.Router();
const routesVersion = require('express-routes-versioning')();
const controller = require(SRC_FILES.components.modules.surveyEngine.controller);

/* GET home page. */
router.get('/getSurveys',
  routesVersion({
    '1.0.0': controller.getSurveys
  }) 
);

module.exports = router;