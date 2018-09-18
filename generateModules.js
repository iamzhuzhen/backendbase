
const fs = require('fs-extra')
const path = require('path');
const key = 'roleMatrix'
const configContent = `
const config  = {
    name:'${key}Engine',
    root:'${key}',
    route:'${key}Route',
    models:[]
}
module.exports  = config;`;
const routeContent = `const express = require('express');
const router = express.Router();
const routesVersion = require('express-routes-versioning')();
const controller = require(SRC_FILES.components.modules.${key}Engine.controller);
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
module.exports = router;`;
const controllerContent =`
module.exports.getRequest = function (req,res) {
    res.send('getRequest')
}
module.exports.postRequest = function (req,res) {
    res.send('postRequest')
}`;
const config = {
    dir:`${key}Engine`,
    files:{
        config:{
            name:'config.js',
            content:configContent
        },
        route:{
            name:`${key}Route.js`,
            content:routeContent
        },
        controller:{
            name:`${key}Controller.js`,
            content:controllerContent
        },
        service:{
            name:`${key}Service.js`,
            content:''
        },
        dao:{
            name:`${key}Dao.js`,
            content:''
        }
    },
    dirs:{
        models:'models'
    }
}
let files = config.files;
let dirs = config.dirs;
for(let file in files) {
    const filePath = path.join(__dirname,`/src/components/modules/${config.dir}/${files[file]['name']}`)
    console.log(filePath)
    fs.outputFileSync(filePath,files[file]['content']);
}

for(let dir in dirs) {
    const dirPath = path.join(__dirname,`/src/components/modules/${config.dir}/${dirs[dir]}`)
    console.log(dirPath)
    fs.ensureDirSync(dirPath);
}

