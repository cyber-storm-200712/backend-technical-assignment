const mysql = require("mysql");

/**
 * 
 * @param {String} host Hostname | Address | Domain
 * @param {String} user DB username
 * @param {String} password Password
 * @param {String} database Database name to access
 * @description create mysql db connection
 * @returns {Object} Connection Object
 */
const createConnection = (host, user, password, database) => {
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    return connection;
}

module.exports = createConnection;