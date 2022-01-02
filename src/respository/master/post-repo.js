module.exports = {
    GET_BY_CODE: "SELECT post.* FROM post WHERE post.code = $1",
    INSERT: "INSERT INTO post (code, category_code, title, description, content, created_date, updated_date) "
        + "VALUES ($1, $2, $3, $4, $5, $6, $7)",
    UPDATE: ""
}