class Logger {

    static log(message = null) {
        console.log(message);
    }

    static error(message = null) {
        console.error(message)
    }
}

module.exports = Logger;