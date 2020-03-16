import DB from './sqlite';

let sowenNotesDB = new DB({
    name: 'sowen_notes',
    tables: [
        {
            name: 'note',
            colls: [
                { name: 'id', properties: ['text', 'primary key', 'not null'] },
                { name: 'content', properties: ['text', 'not null'] },
                { name: 'date', properties: ['text', 'not null'] },
                { name: 'mark', properties: ['integer', 'not null'] },
            ]
        }
    ]
});

export default sowenNotesDB;