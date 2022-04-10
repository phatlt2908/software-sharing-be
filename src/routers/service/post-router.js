const app = module.exports = require('express')();

const {
    loadDetail,
    getPopularCategoryPostList,
    getNewestCategoryPostList,
    getRelationCategoryPostList,
    updateReadNum,
    searchPostList,
    getPopularPostList,
    getNewestPostList
} = require('../../actions/service').post;

app.get('/detail', loadDetail);
app.get('/popular-category-post', getPopularCategoryPostList);
app.post('/newest-category-post', getNewestCategoryPostList);
app.get('/relation-category-post', getRelationCategoryPostList);
app.get('/update-read-num', updateReadNum);
app.post('/search-post', searchPostList);
app.post('/popular-post', getPopularPostList);
app.get('/newest-post', getNewestPostList);