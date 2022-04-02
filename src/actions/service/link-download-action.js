const format = require('pg-format');
const pool = require('../../../configs/psql-connect');
const linkDownloadRepo = require('../../respository/service/link-download-repo');

getLinkDownloadByPostId = async function (postId) {
    try {
        const links = await pool.query(linkDownloadRepo.GET_LINK_DOWNLOAD, [postId]);
        return links.rows;
    } catch (err) {
        console.error("load download link failed:", err);
    }
}

module.exports = {
    getLinkDownloadByPostId
}