const format = require('pg-format');
const pool = require('../../../configs/psql-connect');
const linkDownloadRepo = require('../../respository/master/link-download-repo');

getLinkDownloadTypePulldown = async function (req, res) {
    try {
        const typeList = await pool.query(linkDownloadRepo.GET_LINK_DOWNLOAD_TYPE_PULLDOWN);
        res.status(200).send({
            linkDownloadTypeList: typeList.rows
        });
    } catch (err) {
        console.error("Load link download type pulldown failed:", err);
        res.status(400).send({ mes: err });
    }
}

saveLinkDownloadByPostId = async function (links, postId) {
    // Get all link existed before register new
    await pool.query(linkDownloadRepo.DELETE_LINK_DOWNLOAD, [postId]);

    let values = [];
    links.forEach(link => {
        values.push([postId, link.type, link.url, link.name]);
    });
    try {
        await pool.query(format(linkDownloadRepo.SAVE_LINK_DOWNLOAD, values));
    } catch (err) {
        console.error("Save download link failed:", err);
    }
}

getLinkDownloadByPostId = async function (postId) {
    try {
        const links = await pool.query(linkDownloadRepo.GET_LINK_DOWNLOAD, [postId]);
        return links.rows;
    } catch (err) {
        console.error("Save download link failed:", err);
    }
}

module.exports = {
    getLinkDownloadTypePulldown,
    saveLinkDownloadByPostId,
    getLinkDownloadByPostId
}