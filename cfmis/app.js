'use strict';
var debug = require('debug')('my express app');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const sequelize = require('./config/database');

var routes = require('./routes/index');
var users = require('./routes/users');
var cases = require('./routes/cases');

var app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/register-user', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register-user.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/register-case', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register-case.html'));
});

app.get('/assign-date', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'assign-date.html'));
});

app.get('/update-stage', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'update-stage.html'));
});

app.get('/view-cases', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'view-cases.html'));
});

app.get('/generate-report', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'generate-report.html'));
});

// Routes
app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/cases', cases);

// Sync Database
sequelize.sync({ alter: true })
    .then(() => console.log('Database & tables synced'))
    .catch(err => console.log('Error syncing database:', err));

// Handle 404 errors
app.use(function (req, res, next) {
    res.status(404).send('Page Not Found');
});

// Global error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log('Server running on http://localhost:' + app.get('port'));
});