const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//configuring database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connecting to the database 
mongoose.connect(dbConfig.url, {
    useNewUrlParser:true
})
.then(() =>{
    console.log('Successfully connected to database');
})
.catch( err => {
    console.log('error occured',err);
    process.exit();
});

//define a simple route
app.get('/', (req,res) =>{
res.json({ 
    "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
});
});

//Require Notes Routes
require('./app/routes/node.routes')(app);

//listen for requests
app.listen(3000, () => {
    console.log("Server is listening to port number: 3000");
});