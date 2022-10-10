const app = module.exports = require('express')();
const { checkToken } = require('../../actions/master').auth;
const { getLinkDownloadTypePulldown } = require('../../actions/master').linkDownload;

app.use(checkToken);

app.post('/type/pulldown', getLinkDownloadTypePulldown);