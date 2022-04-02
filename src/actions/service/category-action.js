const pool = require('../../../configs/psql-connect');
const categoryRepo = require('../../respository/service/category-repo');

getCategoryDetail = async function (req, res) {
    const categoryCode = req.query.categoryCode;

    // check required
    if (!categoryCode) {
        return res.status(400).send({ mes: 'Input invalid' });
    }

    try {
        const sqlResult = await pool.query(categoryRepo.CATEGORY_DETAIL, [categoryCode]);

        // Check exist category
        if (!sqlResult.rows.length) {
            throw "Category not exist";
        }

        const category = sqlResult.rows[0];

        res.status(200).send(category);
    } catch (err) {
        console.error("Load category detail fail:", err);
        res.status(400).send({ mes: err });
    }
}

module.exports = {
    getCategoryDetail
}