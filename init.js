var fs = require('fs');
var path = require('path');
var app_config = require(path.join(__dirname,'/components/config/app-config.js'))
//init global variable
var global_variable = require(path.join(__dirname,'/components/config/global-variable.js'));
//init components
const module_path = path.join(__dirname,'/components/modules')
var self = {
    init:() => {
        self.loadingModules();
    },
    loadingModules:() => {
        let modules_names = app_config['modules'];
        for(let index in modules_names) {
            self.loadingModulesDir(modules_names[index]);
            
        }
    },
    loadingModulesDir:(module_dir) => {
        let module_config = self.loadingModuleConfig(module_dir);
        let module_files = fs.readdirSync(path.join(module_path, module_dir), 'utf-8');
        self.loadingModuleIncludeFiles(module_config);
    },
    loadingModuleConfig:(module_dir) => {
        return require(path.join(module_path, module_dir, 'config.js'))
    },
    loadingModuleIncludeFiles:(module_config) => {
        global.app_files[module_config.name] = {};
        for(let index in module_config.include) {
            if('models' == index) {
                global.app_files[module_config.name][index] = {};
                for(let model in module_config.include.models) {
                    global.app_files[module_config.name][index][module_config.include.models[model]] = path.join(module_path, module_config.name, index, module_config.include[index][model])
                }
            } else {
                global.app_files[module_config.name][index] = path.join(module_path, module_config.name, module_config.include[index]);
            } 
        }
    },
    loadingRoutes:(app) => {
        for(let module_name in global.app_files) {
            app.use('/'+ module_name.toLowerCase(),require(global.app_files[module_name]['route']));
        }
    }
}

self.init();
module.exports = self;
