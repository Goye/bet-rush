var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require("mongoose");
var routes = require('./routes');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var passport = require('passport');
var session = require('express-session');
var passportConfig = require('./config/passport');
var appConfig = require('./config/appConf');
var favicon = require('serve-favicon');
var multer  = require('multer');
var crypto  = require('crypto');
var mime  = require('mime');
var prefillData = require('./data/prefill');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage, fileFilter: fileFilter });

function fileFilter (req, file, cb) {
  if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('tipo de imagen no soportada'));
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.set('port', process.env.PORT || 3000);
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    //app.use(express.errorHandler());
}

//Config passport
app.use(session({
  secret: appConfig.variables.app.clientSecret,
  name: 'session_id',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/prodigi");
//mongoose.set('debug', true);
mongoose.connection.once('connected', function () {
    app.models = require('./models');
    for (var key in routes) {
        var controller = routes[key];
        app.all(key, controller(app, key));
    }
});

app.use(require('connect-livereload')());

app.post('/uploadImage', upload.single('filename'), function(req, res, next) {
  res.status(200).json({filename: '/images/' + req.file.filename});
});

app.use('/admin', function(req, res){
  res.sendFile(__dirname + '/public/views/admin/index.html');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

//Example using bearer
app.get('/profile',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    console.log('Hello!');
});

//Prefill user
var user = new prefillData.createUser();

app.post('/login', function(req, res){
  passport.authenticate('login', function(err, user, info){
    if (info && !user) {
      return res.status(400).json(info);
    } else {
      return res.status(200).json(user);
    }
  })(req, res);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
