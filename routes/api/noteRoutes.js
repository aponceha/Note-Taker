

const router  = require("express").Router();
const uniqid = require('uniqid'); 
const { readFromFile, readAndAppend, writeToFile } = require('../../helpers/fsUtils');

// Get /api/notes will read db.son and return ALL saved notes as JSON
router.get('/', (req, res) => readFromFile('./db/db.json')
.then((data) => 
res.json(JSON.parse(data)))
);

// POST /api/notes will recieve a new note to 
// save on the request body, add it to the 
// db.json file, and then return the new note 
// to the client. Assign unique ID when saved

router.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uniqid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

// Delete /api/notes/:id will recieve a query

router.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((data) => {
            const result = data.filter((data) => data.note_id !== noteId);
            console.log(result);

            writeToFile('./db/db.json', result);

            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

module.exports = router