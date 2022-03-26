module.exports = {
    POST_DETAIL: "SELECT post.* FROM post WHERE post.code = $1",
    POPULAR_CATEGORY_POST:
        `SELECT post.id as id, post.code as "code", post.title as "title", post.description as "description", 
            post.created_date as "createdDate", post.read_num as "readNum", image.url as "imageUrl", image.name as "imageAlt"
        FROM post
        LEFT JOIN post_image image 
            ON image.post_id = post.id 
        WHERE post.category_code = $1
        ORDER BY read_num DESC
        LIMIT 10`,
    NEW_CATEGORY_POST:
        `SELECT post.id as id, post.code as "code", post.title as "title", post.description as "description", 
            post.created_date as "createdDate", post.read_num as "readNum", image.url as "imageUrl", image.name as "imageAlt"
        FROM post
        LEFT JOIN post_image image 
            ON image.post_id = post.id 
        WHERE post.category_code = $1
        ORDER BY created_date DESC
        LIMIT $2 OFFSET $3`,
    RELATION_CATEGORY_POST:
        `SELECT post.id as id, post.code as "code", post.title as "title", post.description as "description", 
            post.created_date as "createdDate", post.read_num as "readNum", image.url as "imageUrl", image.name as "imageAlt"
        FROM post
        LEFT JOIN post_image image 
            ON image.post_id = post.id 
        WHERE post.category_code = $1
            AND post.code <> $2
        LIMIT 10`,
    COUNT_CATEGORY_POST:
        `SELECT COUNT(post.id) as count
        FROM post
        WHERE post.category_code = $1`,
    UPDATE_READ_NUM:
        `UPDATE post
        SET read_num = read_num + 1
        WHERE post.code = $1`,
    SEARCH_POST:
        `SELECT post.id as id, post.code as "code", post.title as "title", post.description as "description", 
            post.created_date as "createdDate", post.read_num as "readNum", image.url as "imageUrl", image.name as "imageAlt"
        FROM post
        LEFT JOIN post_image image 
            ON image.post_id = post.id 
        WHERE LOWER(post.title) LIKE '%' || LOWER($1) || '%'
            OR LOWER(post.description) LIKE '%' || LOWER($1) || '%'
            OR LOWER(post.name) LIKE '%' || LOWER($1) || '%'
            OR LOWER(post.content) LIKE '%' || LOWER($1) || '%'
        ORDER BY read_num DESC, created_date DESC
        LIMIT $2 OFFSET $3`,
    COUNT_SEARCH_POST:
        `SELECT COUNT(post.id) as count
        FROM post
        WHERE LOWER(post.title) LIKE '%' || LOWER($1) || '%'
            OR LOWER(post.description) LIKE '%' || LOWER($1) || '%'
            OR LOWER(post.name) LIKE '%' || LOWER($1) || '%'
            OR LOWER(post.content) LIKE '%' || LOWER($1) || '%'`
}