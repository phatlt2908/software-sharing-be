const app = module.exports = require('express')();

const {} = require('../../actions/service').comment;

app.post('/submit', submitComment);
app.get('/load', loadComment);
app.get('/delete', deleteComment);
app.post('/update', updateComment);
app.get('/update-like', updateCommentLike);