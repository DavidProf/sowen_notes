import * as SQLite from 'expo-sqlite';
import uuid from 'uuid-random';

/**
 * Init database
 * @param {Object} databaseStructure
 * @param {String} databaseStructure.name
 * @param {Object[]} databaseStructure.tables
 * @param {String} databaseStructure.tables.name
 * @param {Object[]} databaseStructure.tables.colls
 * @param {String} databaseStructure.tables.colls.name
 * @param {String[]} databaseStructure.tables.colls.properties
 */
function DB(databaseStructure) {
    if (typeof databaseStructure != 'object') throw new Error('Invalid database structure');
    if (typeof databaseStructure.name != 'string') throw new Error('Invalid database name');
    if (!Array.isArray(databaseStructure.tables)) throw new Error('Invalid database tables');

    this._db = SQLite.openDatabase(`${databaseStructure.name}.db`);

    for (let table of databaseStructure.tables) {
        this.createTable(table);
    }

    this._databseStructure = databaseStructure;
    return this;
};

/**
 * Executes a sql querry
 * @param {String} sql 
 * @param {String[]|Number[]} params 
 */
DB.prototype.executeSql = function (sql, params = []) {
    if (typeof sql != 'string') throw new Error('Invalid sql command');
    if (!Array.isArray(params)) throw new Error('Invalid params');

    return new Promise((resolve, reject) => {
        this._db.transaction(tx => {
            tx.executeSql(
                sql,
                params,
                (...result) => resolve(result), (...error) => reject(error));
        });
    });
}
/**
 * Create one table
 * @param {Object} tableStructure 
 * @param {String} tableStructure.name
 * @param {Object[]} tableStructure.colls
 * @param {String} tableStructure.colls.name
 * @param {String[]} tableStructure.colls.properties
 * @returns {Boolean}
 */
DB.prototype.createTable = async function (structure) {
    if (typeof structure != 'object') throw new Error(`Invalid table structure`);

    let error;
    let sqlCommand = `create table if not exists '${
        structure.name || (error = `Invalid table name`)
        }' (${
        Array.isArray(structure.colls)
            ? structure.colls.map(coll => `${
                coll.name || (error = 'Invalid')
                } ${coll.properties.join(' ')}`)
            : (error = 'Invalid colls')
        })`;

    if (error) throw new Error(error);

    let [{ _complete }] = await this.executeSql(sqlCommand);

    return _complete;
};

/**
 * Drops a table
 * @param {String} name table name
 * @returns {Boolean}
 */
DB.prototype.dropTable = async function (name) {
    let [{ _complete }] = await this.executeSql(`drop table if exists '${name}'`);
    return _complete;
}

/**
 * insert
 * update
 * delete
 * select
 */

export default DB;
