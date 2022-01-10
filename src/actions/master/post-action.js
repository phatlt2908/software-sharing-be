const pool = require('../../../configs/psql-connect');
const postRepo = require('../../respository/master/post-repo');
const commonFunction = require('../../actions/common-action');
const linkDownloadFunction = require('../../actions/master/link-download-action');
const drive = require('../../actions/drive');

save = async function (req, res) {
    try {
        const request = req.body;
        request.code = commonFunction.toKebab(request.code);

        let post = await pool.query(postRepo.GET_BY_ID, [request.id]);

        // Save post and return id to save links and images
        let postId;
        let sqlRes
        if (post.rows.length) {
            sqlRes = await pool.query(postRepo.UPDATE, [request.code, request.categoryCode, request.title, request.description, new Date(), request.content, request.id]);
        } else {
            sqlRes = await pool.query(postRepo.INSERT, [request.code, request.categoryCode, request.title, request.description, request.content, new Date(), new Date()]);
        }
        postId = sqlRes.rows[0].id;

        // Save link by post id
        linkDownloadFunction.saveLinkDownloadByPostId(request.linkDownload, postId);

        res.status(200).send();
    } catch (err) {
        console.error("Save post failed: ", err);
        res.status(400).send({ mes: err });
    }
}

loadDetail = async function (req, res) {
    try {
        const postCode = req.body.postCode;

        const postSqlResult = await pool.query(postRepo.GET_BY_CODE, [postCode]);
        const rawPost = postSqlResult.rows[0];
        const post = {
            id: rawPost.id,
            code: rawPost.code,
            categoryCode: rawPost.category_code,
            title: rawPost.title,
            description: rawPost.description,
            content: rawPost.content,
            createdDate: rawPost.created_date,
            updatedDate: rawPost.updated_date,
            downloadNum: rawPost.download_num,
            readNum: rawPost.read_num,
        }

        let links = await linkDownloadFunction.getLinkDownloadByPostId(post.id);

        res.status(200).send({
            post: post,
            links: links
        });
    } catch (err) {
        console.error("Save post failed: ", err);
        res.status(400).send({ mes: err });
    }
}

uploadImage = async function (req, res) {
    try {
        drive.uploadFile(req.file, res, saveImage);
    } catch (err) {
        console.error("upload image failed: ", err);
        res.status(400).send({ mes: err });
    }
}

saveImage = function (res, file) {
    let imageUrl = "https://drive.google.com/uc?id=" + file.imageId;

    let result = {
        fileName: file.fileName,
        uploaded: 1,
        url: imageUrl
    }
    res.status(200).send(result);
}

module.exports = {
    save,
    uploadImage,
    loadDetail
}