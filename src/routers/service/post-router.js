const app = module.exports = require('express')();

const { loadDetail } = require('../../actions/service').post;

app.get('/detail', loadDetail);