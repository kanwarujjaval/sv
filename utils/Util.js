const promisify = require('util').promisify;
const fs = require('fs');
const readdir = promisify(fs.readdir);
const path = require('path');

/**
 * The Utility Class
 * All methods are static
 * */
class Util {
    /**
     * hot require a file by removing cached version
     * @param {String} filePath - Path of file to require.
     * @returns {require} Required File
     */
    static hotRequire(filePath) {
        delete require.cache[require.resolve(filePath)];
        return require(filePath);
    }

    static async requireDir(dir = './') {
        let result = {};
        console.log('here');
        let files = await readdir(dir);
        // console.log(files);
        // console.log(fs.statSync(path.join(dir, files[0])).isDirectory());
        // let requirePaths = files.filter(file => fs.statSync(path.join(dir, file)).isDirectory());
        // console.log(requirePaths);
        files.forEach((file) => {
            // console.log(require(path.join('./../', dir, file)));
            result[file.slice(0, -3)] = require(path.join('./../', dir, file))
            // result[file.slice(0, -3)] = 1
        });
        console.log(result.user.login);
        return;
        return result;
    }

}

module.exports = Util;
