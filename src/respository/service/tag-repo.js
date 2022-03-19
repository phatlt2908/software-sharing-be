module.exports = {
    UPDATE_COUNT:
        `INSERT INTO tag(value, tag_count) VALUES($1, 1)
        ON CONFLICT(value) DO UPDATE 
        SET tag_count = tag.tag_count + 1
        WHERE tag.value = $1`,
    GET_TAG_LIST:
        `SELECT value
        FROM tag
        WHERE tag.value <> '' AND tag.value IS NOT NULL
        ORDER BY tag_count DESC
        LIMIT 20`,
}