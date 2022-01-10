module.exports = {
    GET_BY_ID: "SELECT post.* FROM post WHERE post.id = $1",
    GET_BY_CODE: "SELECT post.* FROM post WHERE post.code = $1",
    INSERT: "INSERT INTO post (code, category_code, title, description, content, created_date, updated_date) "
        + "VALUES ($1, $2, $3, $4, $5, $6, $7) "
        + "RETURNING id",
    UPDATE: "UPDATE post "
        + "SET code = $1, category_code = $2, title = $3, description = $4, updated_date = $5, content = $6 "
        + "WHERE id = $7 "
        + "RETURNING id"
}