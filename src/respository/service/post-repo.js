module.exports = {
    POST_DETAIL: "SELECT post.* FROM post INNER JOIN category ON category.code = post.category_code WHERE category.code = $1 AND post.code = $2"
}