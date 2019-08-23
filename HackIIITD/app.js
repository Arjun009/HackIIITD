const express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
const say = require('say')
const path = require('path');
var mongoose = require('mongoose');
var Users = require('./models/users');

mongoose.connect('mongodb+srv://sadh:sarthak01@blog-5pgkg.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});



app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'public')));


console.log(`app running on port ${port}`);

app.get("/save/:name", (req, res) => {
    var name = req.params.name;
    var _user = new Users({
        "name": name,
        "time": String(new Date())
    });
    _user.save((err) => {
        console.log(`saved`);

res.send(name);
    });

});

app.get("/camera",(req,res)=>{
    res.sendFile(path.join(__dirname ,'public','camera.html'));
});
app.get("/results",(req,res)=>{
    res.sendFile(path.join(__dirname ,'public','lb.html'));
});
app.get("/ppt",(req,res)=>{
    res.sendFile(path.join(__dirname ,'public','ppt.html'));
});

app.listen(port);