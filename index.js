const db = require('./queries')

const { request } = require('express');
const express = require('express'); //allows me to use it
const path    = require('path');
const server  = express();
const port    = 3000;//port the server will run on
server.use(express.json()); //allows for parsing into jason
app.use(express.urlencoded({extended: false}));


app.get('/food', db.getFood)
app.get('/food/:id', db.getFoodById)
app.post('/food', db.createFood)
app.put('/food/:id', db.updateFood)
app.delete('/food/:id', db.deleteFood)


server.listen (port, () => console.log ('server is now listening on port '+ port)); 