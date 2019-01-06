const fs = require('fs');
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

    static requireDir(dir = './') {
        let result = {};
        let files = fs.readdirSync(dir);
        files.forEach((file) => {
            result[file.slice(0, -3)] = require(path.join(dir, file))
        });
        return result;
    }

    static async failActionHandler(request, h, err) {
        let message = err.message.substring(err.message.indexOf('['));
        message = message.replace(/"/g, '');
        message = message.replace('[', '');
        message = message.replace(']', '');
        err.output.payload.message = message;
        delete err.output.payload.validation;
        throw err;
    }

}

module.exports = Util;
