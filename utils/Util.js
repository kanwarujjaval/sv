const fs = require('fs');
const path = require('path');
const SqlString = require('sqlstring');

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

    /**
     *
     * Query parser to user template literal with mysql module
     * forked from https://github.com/christianmalek/node-mysql-es6-query
     * pass mysql.escape or pool.escape for escaperFn
     *
     * @param escaperFn mysql.escape or pool.escape
     * @returns formatted and escaped query
     *
     * usage mysql.query(queryParser`select * from users`)
     */
    static queryParser(escaperFn) {
        return function (parts) {
            let props = [];
            for (let _len = arguments.length, _key = 1; _key < _len; _key++) {
                //values[_key - 1] = arguments[_key];
                props.push(arguments[_key]);
            }
            return parts.reduce(function (prev, curr, i) {
                return prev + escaperFn(props[i - 1]) + curr;
            });
        };
    }

    /**
     * @param table table name
     * @param data json object to insert
     * create insert query from json for mysql
     */
    static insertQuery(table, data) {
        return `INSERT INTO ${table} (${Object.keys(data).map(col => `${col}`).join(',')}) VALUES (${Object.values(data).map(col => `${SqlString.escape(col) + ''}`).join(',')})`;
    }

}

module.exports = Util;
