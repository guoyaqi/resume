var express = require("express");
var app = express();
var bodyParser     =        require("body-parser");
var path = require("path");
var fs = require('fs');
var pdf = require('html-pdf');
var swig  = require('swig');
var jsonfile = require('jsonfile');
var baseUrl = "http://localhost:3000";
var autoreload = require('connect-autoreload');





app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var config = {
    watch_dirs: 'views/demo.html',
    ignore_regex: /\.sw[poax]$/,
    delay: 150  // wait 150ms before reloading
};

app.use(autoreload(config));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));



var options = {
    format: 'Letter'
};

app.get('/', function (req, res) {
    res.render('index');
//    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/resume-t1', function (req, res) {
    var file = 'public/resume.json';
    jsonfile.readFile(file, function(err, obj) {
        obj.baseUrl = baseUrl;
        var swightml = swig.renderFile('views/demo.html', obj);
        pdf.create(swightml, options).toFile('./resume.pdf', function(err, resInner) {
            if (err) return console.log(err);
            console.log(resInner); // { filename: '/app/businesscard.pdf' }
            res.sendFile(path.join(__dirname + '/resume.pdf'));
        });

//        res.render('demo', obj);
    })

    //__dirname : It will resolve to your project folder.
});

app.get('/resume', function (req, res) {

    res.sendFile(path.join(__dirname + '/resume.html'));
});

app.get('/sitemap', function (req, res) {
    res.sendFile(path.join(__dirname + '/sitemap.html'));
});

app.post('/resume',function(req,res){
//    var user_name=req.body.name;
//    var position=req.body.position;
    fs.writeFile('public/resume.json', JSON.stringify(req.body));
    res.end("yes");
});



app.listen(3000);

console.log("Running at Port 3000");
