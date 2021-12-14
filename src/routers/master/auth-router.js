const app = module.exports = require('express')();

const {} = require('../../actions/master').auth;

app.post('/login', login);

app.post('/register', register);

app.get('/check-username', checkUsername);

app.get('/check-email', checkEmail);