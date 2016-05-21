var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require("mongoose");
var routes = require('./routes');
var bodyParser = require('body-parser');
var app = express();
var passport = require('passport');
var appConfig = require('./config');


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
// app.use(session({
//   secret: appConfig.variables.app.clientSecret,
//   name: 'session_id',
//   saveUninitialized: true,
//   resave: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/betrush");
//mongoose.set('debug', true);
mongoose.connection.once('connected', function () {
    app.models = require('./models');
});

routes.init(app);
// app.get('/', function(req, res) {
//   res.json({test: ''});
// });

http.createServer(app).listen(app.get('port'), function () {
    console.log(
    '+============================================================+\n' +
    '|                      Bet Rush                              |\n' +
    '+============================================================+\n' +
    'Listening on :' + app.get('port')
);
});