module.exports = {
    GET_LINK_DOWNLOAD: `SELECT link.id, link.type_code, type.name AS type_name, link.url, link.name, link.is_waiting
            FROM post_link link
            INNER JOIN post_link_type type ON link.type_code = type.code
            WHERE link.post_id = $1
            ORDER BY link.id ASC`,
}