// POSTMAN komennot löytyy app.js:n alhaalta

const machining_model = require('./machining_model');

// HELPERS
const machining_data = (req) => {
    let data = {
        name: req.body.name,
        material: req.body.material,
        cutting_speed: req.body.cutting_speed,
        feed_rate: req.body.feed_rate
    };
    return data;
}

// CREATE
const api_post_machining = (req, res, next) => {
    console.log('api_post_machining');
    let data = machining_data(req);

    let new_machining = machining_model(data);

    new_machining.save().then(()=>{
        console.log(new_machining);
        res.send(JSON.stringify(new_machining)); 
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// READ
const api_get_machinings = (req, res, next) => {
    console.log('api_get_machinings');

    machining_model.find({})
    .lean()
    .then(machinings => {
        res.send(JSON.stringify(machinings));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};
// FIND ONE
const api_get_machining = (req, res, next) => {
    console.log('api_get_machining');
    let id = req.params.id;
 
    machining_model.findById(id)
        .lean()
        .then(machinings => {
            res.send(JSON.stringify(machinings));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};

// PUT 
const api_put_machining = (req, res, next) => {
    console.log('api_put_machining');
    let id = req.params.id;
    let data = machining_data(req);

    machining_model.findByIdAndUpdate(id, data, {
        new:true
    }).then((machining)=>{
        res.send(machining);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// DELETE
const api_delete_machining = (req, res, next) => {
    let id = req.params.id;
    machining_model.findByIdAndRemove(id).then(() =>{
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

// EXPORTS
module.exports.api_get_machinings = api_get_machinings;
module.exports.api_post_machining = api_post_machining;
module.exports.api_delete_machining = api_delete_machining;
module.exports.api_put_machining = api_put_machining;
module.exports.api_get_machining = api_get_machining;