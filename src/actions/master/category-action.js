const pool = require('../../../configs/psql-connect');
const categoryRepo = require('../../respository/master/category-repo');

getCategoryPulldown = async function (req, res) {
    try {
        const categoryList = await pool.query(categoryRepo.GET_CATEGORY_PULLDOWN);
        res.status(200).send({
            categoryList: categoryList.rows
        });
    } catch (err) {
        console.error("load category pulldown failed:", err);
        res.status(400).send({ mes: err });
    }
}

module.exports = {
    getCategoryPulldown
}