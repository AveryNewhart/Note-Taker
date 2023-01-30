// require
const express = require('express')
const path = require('path')
const fs = require('fs')
const uniqid = require('uniqid')
let db = require('./db/db.json')

//port 
const PORT = process.env.PORT || 8888;

// calling express function
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Routes

// HTML GET route this is referencing the index.html file
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/public/index.html'))
});

// HTML GET route that is referencing the notes.html file
app.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// api GET route that is responding with the db.json file.
app.get('/api/notes', (req, res) => {
    res.json(db)
});


// POST Routes

app.post('/api/notes', (req, res) => {
 console.log(`${req.method} request recieved to add a note!`);
 
 // deconstructing the items in the body
 const { title, text } = req.body

if (title && text) {

const newNote = {
    title,
    text,
    id: uniqid()
};

// reading that database file
fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if(err){
    console.log(err);
    } else {
    const parNotes = JSON.parse(data);

    parNotes.push(newNote)
// writing to the database file
    fs.writeFile('./db/db.json', JSON.stringify(parNotes), null, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('write to file was successful!')
        }
    })
    }

    // ATTEMPTING TO DO DELETE BUTTON

    // app.get("/api/notes/:id", function(req,res) {
    //     // display json for the notes array indices of the provided id
    //     res.json(notes[req.params.id]);
    // });

    // app.delete("/api/notes/:id", function(req, res) {
    //     parNotes.splice(req.params.id, 1);
    //     updateDb();
    //     console.log("Deleted note with id "+req.params.id);
    // });
    
    // function updateDb() {
    //     fs.writeFile("db/db.json",JSON.stringify(parNotes,'\t'),err => {
    //         if (err) throw err;
    //         return true;
    //     });
    })

const response = {
    status: 'success',
    body: newNote
}

    console.log(response);
    res.status(201).json(response);
} else {
    res.status(500).json('Error in posting note!');
}

});

 
// ATTEMTING TO DO DELETE BUTTON

// app.get("/api/notes/:id", function(req,res) {
//     // display json for the notes array indices of the provided id
//     res.json(notes[req.params.id]);
// });

// app.delete("/api/notes/:id", function(req, res) {
//     parNotes.splice(req.params.id, 1);
//     updateDb();
//     console.log("Deleted note with id "+req.params.id);
// });

// function updateDb() {
//     fs.writeFile("db/db.json",JSON.stringify(parNotes,'\t'),err => {
//         if (err) throw err;
//         return true;
//     });
// }




// getting link to display server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});