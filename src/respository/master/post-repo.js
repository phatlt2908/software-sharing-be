module.exports = {
    GET_BY_ID: "SELECT post.* FROM post WHERE post.id = $1",
    GET_BY_CODE: "SELECT post.* FROM post WHERE post.code = $1",
    INSERT: `INSERT INTO post (code, name, category_code, title, description, content, created_date, updated_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id`,
    UPDATE: `UPDATE post
        SET code = $1, name = $2, category_code = $3, title = $4, description = $5, updated_date = $6, content = $7
        WHERE id = $8
        RETURNING id`,
    DELETE_BANNER_IMAGE: "DELETE FROM post_image WHERE post_image.post_id = $1",
    SAVE_BANNER_IMAGE: `INSERT INTO post_image (post_id, url, name)
        VALUES ($1, $2, $3)`
}