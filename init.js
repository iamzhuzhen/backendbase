const fs = require('fs-extra')
const path = require('path');
require(path.join(__dirname,'/config/globalVariable.js'));

//init global variable
// const global_variable = require(path.join(__dirname,'/components/config/global-variable.js'));
//init components
// const module_path = path.join(__dirname,'/components/modules')
const self = {
    init:(app) => {
        registerAppSrc();
        registerRoutes(app);
        registerGlobal();
    }
}

function registerAppSrc() {
    const srcFilesPath = path.join(__dirname,'/src')
    readDirSync(srcFilesPath,SRC_FILES)
}

function registerRoutes(app) {
    let modules = SRC_FILES.components.modules;
    for(let module_name in modules) {
        const config_dir = SRC_FILES['components']['modules'][module_name]['config'];
        const config = FN_LOADING_SOURCE(config_dir);
        const route_dir = SRC_FILES['components']['modules'][module_name][config.route];
        app.use('/'+ config.root,FN_LOADING_SOURCE(route_dir));
    }
}

function registerGlobal() {
    const handler_dir = SRC_FILES['handler'];
    for(let handler in handler_dir) {
        global[handler] = FN_LOADING_SOURCE(handler_dir[handler]);
    }
}

function readDirSync(path,dirObject) {
    let srcFiles = fs.readdirSync(path);
    for(let dir of srcFiles) {  
        let dirPath = `${path}/${dir}`
        const info = fs.statSync(dirPath)	
        if(info.isDirectory()) {
            dirObject[dir]= {};  
            readDirSync(dirPath,dirObject[dir]);
        } else {
            let fileName = dir.slice(0,dir.lastIndexOf('.'));
            dirObject[fileName] = dirPath;
        }
    }
}
module.exports = self;
