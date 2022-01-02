const pool = require('../../../configs/psql-connect');
const postRepo = require('../../respository/master/post-repo');
const commonFunction = require('../../actions/common-action');
const drive = require('../../actions/drive');

save = async function (req, res) {
    try {
        const request = req.body;
        request.code = commonFunction.toKebab(request.code);

        let post = await pool.query(postRepo.GET_BY_CODE, [request.code]);

        if (post.rows.length) {
            await pool.query(postRepo.UPDATE);
        } else {
            console.log("request >>> ", request);
            await pool.query(postRepo.INSERT, [request.code, request.categoryCode, request.title, request.description, request.content, new Date(), new Date()]);
        }
        res.status(200).send();
    } catch (err) {
        console.error("Save post failed: ", err);
        res.status(400).send({ mes: err });
    }
}

uploadImage = async function (req, res) {
    try {
        const request = req.body;
        drive.listFiles();
        res.status(200).send();
    } catch (err) {
        console.error("upload image failed: ", err);
        res.status(400).send({ mes: err });
    }
}

module.exports = {
    save,
    uploadImage
}