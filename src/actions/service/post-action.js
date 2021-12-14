const pool = require('../../../configs/psql-connect');
const postRepo = require('../../respository/service/post-repo');

getPostDetail = async function (req, res) {
    const postCode = req.query.postCode;
    const categoryCode = req.query.categoryCode;

    // check required
    if (!postCode || !categoryCode) {
        return res.status(400).send({ mes: 'Input invalid' });
    }

    try {
        const sqlResult = await pool.query(postRepo.POST_DETAIL, [categoryCode, postCode]);

        // Check exist post
        if (!sqlResult.rows.length) {
            throw "Post not exist";
        }

        const post = sqlResult.rows[0];

        res.status(200).send(post);
    } catch (err) {
        console.error("Load post detail fail: ", err);
        res.status(400).send({ mes: err });
    }
}

module.exports = {
    getPostDetail
}