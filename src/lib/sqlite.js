import * as SQLite from 'expo-sqlite';

/**
 * Init database
 * @param {Object} databaseStructure
 * @param {String} databaseStructure.name
 * @param {Object[]} databaseStructure.tables
 * @param {String} databaseStructure.tables.name
 * @param {Object[]} databaseStructure.tables.colls
 * @param {String} databaseStructure.tables.colls.name
 * @param {String[]} databaseStructure.tables.colls.properties
 * @param {Object[]} databaseStructure.tables.indexes
 * @param {String[]} databaseStructure.tables.indexes.colls
 * @param {Boolean=} databaseStructure.tables.indexes.unique
 */
function DB(databaseStructure) {
    if (typeof databaseStructure != 'object') throw new Error('Invalid database structure');
    if (typeof databaseStructure.name != 'string') throw new Error('Invalid database name');
    if (!Array.isArray(databaseStructure.tables)) throw new Error('Invalid database tables');

    this._db = SQLite.openDatabase(`${databaseStructure.name}.db`);

    for (let table of databaseStructure.tables) this.createTable(table);

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
 * @param {Object[]} tableStructure.indexes
 * @param {String[]} tableStructure.indexes.colls
 * @param {Boolean} tableStructure.indexes.unique
 * @returns {Boolean}
 */
DB.prototype.createTable = async function (tableStructure) {
    if (typeof tableStructure != 'object') throw new Error(`Invalid table tableStructure`);

    let error;
    let sqlCommand = `create table if not exists '${
        tableStructure.name || (error = `Invalid table name`)
        }' (${
        Array.isArray(tableStructure.colls)
            ? tableStructure.colls.map(coll => `${
                coll.name || (error = 'Invalid')
                } ${coll.properties.join(' ')}`)
            : (error = 'Invalid colls')
        })`;

    if (error) throw new Error(error);

    let [{ _complete }] = await this.executeSql(sqlCommand);

    for (let { colls, unique } in tableStructure.indexes) await this.createIndex(tableStructure.name, colls, unique);

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
 * Create an index on table
 * @param {String} tableName table name
 * @param {String[]} colls colls to create the index
 * @param {Boolean=} unique default is false
 * @returns {Boolean}
 */
DB.prototype.createIndex = async function (tableName, colls = [], unique = false) {
    if (!tableName) throw new Error(`Invalid table name ${tableName}`);
    if (!Array.isArray(colls)) throw new Error(`Invalid colls, must be array`);
    if (colls.length < 1) return true;

    let [{ _complete }] = await this.executeSql(
        `CREATE ${Boolean(unique) ? 'UNIQUE' : ''} INDEX 'index_${colls.join('_')}' ON '${tableName}' ('${colls.join("','")}')`
    );
    return _complete;
}
/**
 * insert
 * update
 * delete
 * select
 * BASE ON expo-sqlite-orm
 */

export default DB;
