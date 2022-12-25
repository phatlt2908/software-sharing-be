const app = module.exports = require('express')();
const { checkToken } = require('../../actions/master').auth;
const {
    save,
    uploadImage,
    loadList,
    loadDetail
} = require('../../actions/master').post;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload-image', upload.single('upload'), uploadImage);

app.use(checkToken);

app.post('/save', save);
app.post('/list', loadList);
app.post('/detail', loadDetail);