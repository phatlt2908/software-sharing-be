const app = module.exports = require('express')();

const { loadDetail, getPopularCategoryPostList, getNewestCategoryPostList } = require('../../actions/service').post;

app.get('/detail', loadDetail);
app.get('/popular-category-post', getPopularCategoryPostList);
app.post('/newest-category-post', getNewestCategoryPostList);