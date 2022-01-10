const pool = require('../../../configs/psql-connect');
const postRepo = require('../../respository/service/post-repo');
const linkDownloadFunction = require('../../actions/service/link-download-action');

loadDetail = async function (req, res) {
    const postCode = req.query.postCode;

    // check required
    if (!postCode) {
        return res.status(400).send({ mes: 'Input invalid' });
    }

    try {
        const postSqlResult = await pool.query(postRepo.POST_DETAIL, [postCode]);

        // Check exist post
        if (!postSqlResult.rows.length) {
            throw "Post not exist";
        }

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

        const rawLinks = await linkDownloadFunction.getLinkDownloadByPostId(post.id);
        let links = [];
        rawLinks.forEach(rawLink => {
            links.push({
                id: rawLink.id,
                typeCode: rawLink.type_code,
                typeName: rawLink.type_name,
                url: rawLink.url,
                isWaiting: rawLink.is_wating
            })
        });

        res.status(200).send({
            post: post,
            links: links
        });
    } catch (err) {
        console.error("Load post detail fail: ", err);
        res.status(400).send({ mes: err });
    }
}

module.exports = {
    loadDetail
}