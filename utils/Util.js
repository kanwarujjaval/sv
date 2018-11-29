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
    static hotRequire (filePath) {
        delete require.cache[require.resolve(filePath)];
        return require(filePath);
    }

}

module.exports = Util;
