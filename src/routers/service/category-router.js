const app = module.exports = require('express')();

const {} = require('../../actions/service').category;

app.get('/detail', getCategoryDetail);