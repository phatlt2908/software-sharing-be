const app = module.exports = require('express')();

const { changePassword } = require('../../actions/master').user;
const { checkToken } = require('../../actions/master').auth;

app.use(checkToken);

app.post('/change-password', changePassword);