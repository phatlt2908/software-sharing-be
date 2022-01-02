const app = module.exports = require('express')();
// const { checkToken } = require('../../actions/master').auth;
const { save, uploadImage } = require('../../actions/master').post;

// app.use(checkToken);

app.post('/save', save);
app.post('/upload-image', uploadImage);