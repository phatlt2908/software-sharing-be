module.exports = {
    GET_LINK_DOWNLOAD_TYPE_PULLDOWN: "SELECT type.code, type.name FROM post_link_type type",
    SAVE_LINK_DOWNLOAD: "INSERT INTO post_link(post_id, type_code, url, name) VALUES %L",
    GET_LINK_DOWNLOAD: "SELECT link.type_code, link.url FROM post_link link WHERE link.post_id = $1",
    DELETE_LINK_DOWNLOAD: "DELETE FROM post_link WHERE post_link.post_id = $1"
}