global.SRC_FILES = {};
global.FN_LOADING_SOURCE = function(path) {
    try{
        return require(path);
    }catch(err) {
        console.log(err)
    }
};
global.BASE_DIR = __dirname;
