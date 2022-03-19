const app = module.exports = require('express')();

const {} = require('../../actions/service').tag;

app.get('/list', getTagList);