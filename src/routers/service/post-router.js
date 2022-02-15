const app = module.exports = require('express')();

const { loadDetail, getPopularCategoryPostList } = require('../../actions/service').post;

app.get('/detail', loadDetail);
app.get('/popular-category-post', getPopularCategoryPostList);