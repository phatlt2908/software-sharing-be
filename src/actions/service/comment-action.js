const format = require('pg-format');
const pool = require('../../../configs/psql-connect');
const commentRepo = require('../../respository/service/comment-repo');
const postRepo = require('../../respository/service/post-repo');

submitComment = async function (req, res) {
    try {
        const request = req.body;

        let postRes = await pool.query(postRepo.POST_DETAIL, [request.postCode]);
        let post = postRes.rows[0];
        
        let sqlRes = await pool.query(commentRepo.SUBMIT, [request.username, request.email, request.comment, post.id, request.parentId, new Date(), new Date(), request.avatar]);

        let commentId = sqlRes.rows[0].id;

        res.status(200).send(commentId);
    } catch (err) {
        console.error("Submit comment failed:", err);
        res.status(400).send({ mes: err });
    }
}

loadComment = async function (req, res) {
    try {
        const postCode = req.query.postCode;
        const parentId = req.query.parentId;
        const email = req.query.email;

        let commentRes = await pool.query(commentRepo.LOAD, [postCode, parentId, email]);
        let commentList = commentRes.rows;

        res.status(200).send(commentList);
    } catch (err) {
        console.error("Load comment failed:", err);
        res.status(400).send({ mes: err });
    }
}

deleteComment = async function (req, res) {
    try {
        const id = req.query.commentId;
        const email = req.query.email;

        let commentRes = await pool.query(commentRepo.DELETE, [id, email, new Date()]);

        if (!commentRes.rows || !commentRes.rows.length) {
            throw "Can not delete this comment";
        }

        let commentId = commentRes.rows[0].id;

        // Delete children
        await pool.query(commentRepo.DELETE_CHILDREN, [id, new Date()]);

        res.status(200).send(commentId);
    } catch (err) {
        console.error("Delete comment failed:", err);
        res.status(400).send({ mes: err });
    }
}

updateComment = async function (req, res) {
    try {
        const request = req.body;
        
        let sqlRes = await pool.query(commentRepo.UPDATE_CONTENT, [request.id, request.comment, request.email, new Date()]);

        let commentId = sqlRes.rows[0].id;

        res.status(200).send(commentId);
    } catch (err) {
        console.error("Update comment failed:", err);
        res.status(400).send({ mes: err });
    }
}

updateCommentLike = async function (req, res) {
    try {
        const id = req.query.id;
        const isIncrease = !!req.query.isIncrease;
        
        let sqlRes = await pool.query(commentRepo.UPDATE_LIKE, [id, isIncrease, new Date()]);

        let commentId = sqlRes.rows[0].id;

        res.status(200).send(commentId);
    } catch (err) {
        console.error("Update comment like failed:", err);
        res.status(400).send({ mes: err });
    }
}

module.exports = {
    submitComment,
    loadComment,
    deleteComment,
    updateComment,
    updateCommentLike
}