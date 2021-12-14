const app = module.exports = require('express')();

const {} = require('../../actions/service').post;

app.get('/detail', getPostDetail);