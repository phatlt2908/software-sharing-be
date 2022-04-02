module.exports = {
    SUBMIT:
        `INSERT INTO comment(username, email, content, post_id, parent_id, created_date, updated_date, avatar)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id`,
    LOAD:
        `SELECT parent.id as "id", parent.username as "username", parent.content as "content",
        parent.parent_id as "parentId", parent.like_num as "likeNum", parent.created_date as "createdDate",
        parent.is_admin as "isAdmin", COUNT(child.id) as "childCount", parent.is_approved as "isApproved",
        CASE WHEN parent.email = $3 THEN TRUE ELSE FALSE END "canEdit", parent.avatar as "avatar"
        FROM comment parent
        INNER JOIN post
            ON post.id = parent.post_id
        LEFT JOIN comment child
            ON (child.parent_id = parent.id AND (child.email = $3 OR child.is_approved = TRUE))
        WHERE post.code = $1
            AND (($2::int8 IS NULL AND parent.parent_id IS NULL) OR parent.parent_id = $2)
            AND (parent.email = $3 OR parent.is_approved = TRUE)
            AND parent.is_deleted = FALSE
        GROUP BY parent.id
        ORDER BY parent.created_date ASC`,
    DELETE:
        `UPDATE comment
        SET is_deleted = true,
            is_approved = false,
            updated_date = $3
        WHERE id = $1
            AND email = $2
        RETURNING id`,
    DELETE_CHILDREN:
        `UPDATE comment
        SET is_deleted = true,
            is_approved = false,
            updated_date = $2
        WHERE parent_id = $1
        RETURNING id`,
    UPDATE_CONTENT:
        `UPDATE comment
        SET is_approved = false,
            content = $2,
            updated_date = $4
        WHERE id = $1
            AND email = $3
        RETURNING id`,
    UPDATE_LIKE:
        `UPDATE comment
        SET like_num = (CASE WHEN $2 = TRUE THEN (like_num + 1) ELSE (like_num - 1) END),
            updated_date = $3
        WHERE id = $1
        RETURNING id`,
}