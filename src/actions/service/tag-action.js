const format = require('pg-format');
const pool = require('../../../configs/psql-connect');
const tagRepo = require('../../respository/service/tag-repo');

getTagList = async function (req, res) {
    try {
        const sqlTagList = await pool.query(tagRepo.GET_TAG_LIST);

        res.status(200).send(sqlTagList.rows);
    } catch (err) {
        console.error("load tag list failed:", err);
    }
}

module.exports = {
    getTagList
}