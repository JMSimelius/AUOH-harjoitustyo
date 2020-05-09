// POSTMAN komennot löytyy app.js:n alhaalta
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const mongoose = require('mongoose');

const body_parser = require('body-parser');

const machining_controller=require('./machining_controller');

app.use(body_parser.json()); 
app.use(body_parser.urlencoded({
    extended:true
})); 

app.use(  (req, res, next)=>{
    console.log(req.method, ' ', req.path);
    next();
});

app.use("/", express.static("public"));

// CREATE
app.post("/api/postmachining", machining_controller.api_post_machining);
// FIND ONE
app.get("/api/machining/:id", machining_controller.api_get_machining);
// READ
app.get("/api/machinings", machining_controller.api_get_machinings);
// UPDATE
app.put("/api/machining/:id", machining_controller.api_put_machining);
// DELETE
app.delete("/api/machining/:id", machining_controller.api_delete_machining);

const database_uri = "mongodb+srv://testi:testi123@cluster0-490tp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(()=> {
    console.log("Database connected");
    app.listen(port);
}).catch(err => {
    console.log(err);
});

// HAE YKSI:
//GET localhost:8080/api/machining/5eb659ab862271759c8158ca

// HAE KAIKKI:
// GET localhost:8080/api/machinings

// LISÄÄ YKSI:
// POST localhost:8080/api/postmachining

// MUUTA YHTÄ:
// PUT localhost:8080/api/machining/5eb659ab862271759c8158ca

// POISTA YKSI:
// DELETE localhost:8080/api/machining/5eb659ab862271759c8158ca

