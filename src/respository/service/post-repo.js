module.exports = {
    POST_DETAIL: "SELECT post.* FROM post WHERE post.code = $1",
    POPULAR_CATEGORY_POST:
        `SELECT post.id as id, post.code as "code", post.title as "title", post.description as "description", 
            post.created_date as "createdDate", image.url as "imageUrl", image.name as "imageAlt"
        FROM post
        LEFT JOIN post_image image 
            ON image.post_code = post.code 
        WHERE post.category_code = $1`
}