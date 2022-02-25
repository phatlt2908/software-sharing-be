module.exports = {
    POST_DETAIL: "SELECT post.* FROM post WHERE post.code = $1",
    POPULAR_CATEGORY_POST:
        `SELECT post.id as id, post.code as "code", post.title as "title", post.description as "description", 
            post.created_date as "createdDate", image.url as "imageUrl", image.name as "imageAlt"
        FROM post
        LEFT JOIN post_image image 
            ON image.post_code = post.code 
        WHERE post.category_code = $1
        ORDER BY read_num DESC
        LIMIT 20`,
    NEW_CATEGORY_POST:
        `SELECT post.id as id, post.code as "code", post.title as "title", post.description as "description", 
            post.created_date as "createdDate", image.url as "imageUrl", image.name as "imageAlt"
        FROM post
        LEFT JOIN post_image image 
            ON image.post_code = post.code 
        WHERE post.category_code = $1
        ORDER BY created_date DESC
        LIMIT $2 OFFSET $3`,
    COUNT_CATEGORY_POST:
        `SELECT COUNT(post.id) as count
        FROM post
        WHERE post.category_code = $1`
}