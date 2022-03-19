const pool = require('../../../configs/psql-connect');
const postRepo = require('../../respository/service/post-repo');
const tagRepo = require('../../respository/service/tag-repo');
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
            name: rawPost.name,
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

getPopularCategoryPostList = async function (req, res) {
    const categoryCode = req.query.categoryCode;

    // check required
    if (!categoryCode) {
        return res.status(400).send({ mes: 'Input invalid' });
    }

    try {
        const sqlResult = await pool.query(postRepo.POPULAR_CATEGORY_POST, [categoryCode]);
        const postList = sqlResult.rows;

        res.status(200).send({
            postList: postList
        });
    } catch (err) {
        console.error("Load popular post list fail: ", err);
        res.status(400).send({ mes: err });
    }
}

getNewestCategoryPostList = async function (req, res) {
    const categoryCode = req.body.categoryCode;
    const itemsPerPage = req.body.itemsPerPage || 10;
    const page = req.body.page || 1;

    // check required
    if (!categoryCode) {
        return res.status(400).send({ mes: 'Input invalid' });
    }

    try {
        const sqlPostListResult = await pool.query(postRepo.NEW_CATEGORY_POST, [categoryCode, itemsPerPage, (page - 1) * itemsPerPage]);
        const postList = sqlPostListResult.rows;

        const sqlCount = await pool.query(postRepo.COUNT_CATEGORY_POST, [categoryCode]);
        const count = sqlCount.rows[0].count;

        res.status(200).send({
            postList: postList,
            itemsPerPage: itemsPerPage,
            page: page,
            totalPost: count
        });
    } catch (err) {
        console.error("Load newest post list fail: ", err);
        res.status(400).send({ mes: err });
    }
}

updateReadNum = async function (req, res) {
    const postCode = req.query.postCode;

    try {
        await pool.query(postRepo.UPDATE_READ_NUM, [postCode]);

        res.status(200).send({
            mes: "Update success!"
        });
    } catch (err) {
        console.error("Update read num fail: ", err);
        res.status(400).send({ mes: err });
    }
}

searchPostList = async function (req, res) {
    const keyword = req.body.keyword;
    const itemsPerPage = req.body.itemsPerPage || 10;
    const page = req.body.page || 1;

    try {
        const sqlPostListResult = await pool.query(postRepo.SEARCH_POST, [keyword, itemsPerPage, (page - 1) * itemsPerPage]);
        const postList = sqlPostListResult.rows;

        const sqlCount = await pool.query(postRepo.COUNT_SEARCH_POST, [keyword]);
        const count = sqlCount.rows[0].count;

        try {
            await pool.query(tagRepo.UPDATE_COUNT, [keyword]);
        } catch (error) {
            console.log("update tag count error: ", error);
        }

        res.status(200).send({
            postList: postList,
            itemsPerPage: itemsPerPage,
            page: page,
            totalPost: count
        });
    } catch (err) {
        console.error("Search post list fail: ", err);
        res.status(400).send({ mes: err });
    }
}

module.exports = {
    loadDetail,
    getPopularCategoryPostList,
    getNewestCategoryPostList,
    updateReadNum,
    searchPostList
}