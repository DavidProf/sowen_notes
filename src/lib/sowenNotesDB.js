import DB from './sqlite';
import uuid from 'uuid-random';

let db = new DB({
    name: 'sowen_notes',
    tables: [
        {
            name: 'note',
            colls: [
                { name: 'id', properties: ['text', 'primary key', 'not null'] },
                { name: 'title', properties: ['text', 'not null'] },
                { name: 'content', properties: ['text', 'not null'] },
                { name: 'date', properties: ['text', 'not null'] },
                { name: 'mark', properties: ['integer', 'not null'] },
            ],
            indexes: [
                { colls: ['title'], unique: false },
                { colls: ['content'], unique: false },
                { colls: ['date'], unique: true },
                { colls: ['mark'], unique: false }
            ]
        }
    ]
});

let sowenNotesDB = {
    _db: db,
    /**
     * Insert a note
     * @param {String} title 
     * @param {String} content 
     * @param {Number=} mark 
     * @returns {String|Boolean} returns note id or false if can't insert the note
     */
    async insert(title, content, mark = 0) {
        if (typeof content != 'string' || !content)
            throw new Error('Invalid content');
        if (typeof mark != 'number')
            throw new Error('Invalid mark');

        let id = uuid();
        let sql =
            `insert into note (id, title, content, date, mark) values ('${id}', ?, ?, '${new Date().toISOString()}', ?);`;
        let [, { rowsAffected }] = await this._db.executeSql(sql, [title, content, mark]);

        return rowsAffected ? id : false;
    },
    /**
     * Update a note
     * @param {String} id 
     * @param {String=} title 
     * @param {String=} content 
     * @param {Number=} mark 
     * @returns {Boolean}
     */
    async update(id, title, content, mark = -1) {
        if (typeof id != 'string' || !id)
            throw new Error('Invalid id');

        if (typeof content != 'string' || !content)
            throw new Error('Invalid content');
        if (typeof mark != 'number')
            throw new Error('Invalid mark');

        let sql =
            `update note set date = '${new Date().toISOString()}', title = ?, content = ?, mark = ? where id = ?;`;
        let [, { rowsAffected }] = await this._db.executeSql(sql, [title, content, mark, id]);

        return !!rowsAffected;
    },
    /**
     * Delete notes
     * @param {String[]} ids
     * @returns {Boolean}
     */
    async delete(ids) {
        if (!Array.isArray(ids))
            throw new Error('Invalid ids');
        if (ids.length < 1) return true;

        let sql = `delete from note where id in (${'?,'.repeat(ids.length)}?)`;
        let [, { rowsAffected }] = await this._db.executeSql(sql, [...ids, '']);

        return !!rowsAffected;
    },
    /**
     * Select a note
     * @param {String} id
     * @returns {Object} note
     */
    async selectById(id) {
        if (typeof id != 'string')
            throw new Error(`Invalid id type ${id}`);
        if (!id) return {};

        let sql = `select * from note where id = ?`;
        let [, result] = await this._db.executeSql(sql, [id]);
        return result.rows.raw()[0];
    },
    /**
     * Select all notes
     * @returns {Object[]} notes array
     */
    async selectAll() {
        let sql = `select * from note`;
        let [, result] = await this._db.executeSql(sql);
        return result.rows.raw();
    }
};

export default sowenNotesDB;