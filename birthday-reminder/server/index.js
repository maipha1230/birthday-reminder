const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname,"/public")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to database(SQL)
const db = mysql.createConnection({
    user : 'root',
    password: '',
    host: 'localhost',
    database: 'birthday-reminder'
});


// use multer for create destination and file name for image
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null,  Date.now() + '.jpg' )
    }
})
const upload = multer({
    storage: storage
});



////////////////////////////////////////////////////

//homepage fetch birtdays list
app.get('/', (req, res) => {
    db.query("SELECT * FROM birthday ORDER BY id ASC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            result.forEach(element => {
                element.pic = `http://localhost:3001/images/${element.pic}`;
            });
            res.send(result)
        }
    })
});


//add more birthday to list(database)
app.post('/add', upload.single('file'), (req, res) => {
    const name = req.body.name;
    const bday = req.body.bday;
    const img = req.file
    const buff = img.filename
    db.query('INSERT INTO birthday (name, Bday, pic) VALUES(?,?,?)', [name, bday, buff], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200)
            res.send('inserted ' + result)
        }
    })
});

//update birthday person from database
app.put('/update/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const bday = req.body.bday
    db.query('UPDATE birthday SET name = ?, Bday = ? WHERE id = ?', [name, bday, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send('update success')
        }
    } )
    
})


//delete birthday person from databaes
app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    const id = req.params.id
    db.query('DELETE FROM birthday WHERE id = ? ', id, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send('deleted success')
        }
    })
})

app.delete('/clear', (req, res) => {
    db.query('DELETE FROM birthday', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200)
            res.send('clear all list' + result)
        }
    })
})



//Server running on port 3001
app.listen(3001, () => {
    console.log('server running on port : 3001');
})



