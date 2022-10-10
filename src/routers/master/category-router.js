const app = module.exports = require('express')();
const { checkToken } = require('../../actions/master').auth;
const { getCategoryPulldown } = require('../../actions/master').category;

app.use(checkToken);

app.post('/pulldown', getCategoryPulldown);