const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const mongoose = require('mongoose');

const body_parser = require('body-parser');

const machining_controller=require('./machining_controller');

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended:true
})); // material/id

app.use(  (req, res, next)=>{
    console.log(req.method, ' ', req.path);
    next();
}); // GET /api/machinings

app.use("/", express.static("public"));

// CREATE
app.post("/api/machining", machining_controller.api_post_machining);

// READ
app.get("/api/machinings", machining_controller.api_get_machinings);

// UPDATE
// app.patch korvaa vain tietyt kentät
// app.put korvaa koko tiedon
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
