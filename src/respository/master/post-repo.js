module.exports = {
  GET_LIST: `SELECT 
      category.name as "categoryName",
      post.code as "postCode",
      post.name as "postName",
      post.title as "title",
      post.created_date as "createdDate",
      post.updated_date as "updatedDate",
      post.read_num as "readNum",
      post.download_num as "downloadNum"
    FROM post
    INNER JOIN category ON post.category_code = category.code
    WHERE $1::text IS NULL OR post.category_code = $1`,
  GET_BY_ID_AND_CODE:
    "SELECT post.* FROM post WHERE post.id = $1 AND post.code = $2",
  GET_BY_CODE: "SELECT post.* FROM post WHERE post.code = $1",
  INSERT: `INSERT INTO post (code, name, category_code, title, description,
      content, created_date, updated_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id`,
  UPDATE: `UPDATE post
    SET code = $1, name = $2, category_code = $3, title = $4, description = $5,
      updated_date = $6, content = $7, version = version + 1
    WHERE id = $8
    RETURNING id`,
  INSERT_BACKUP: `INSERT INTO post_backup (code, name, category_code, title,
      description, content, created_date, updated_date, version)
    SELECT code, name, category_code, title, description, content, created_date,
      updated_date, version
    FROM post
    WHERE post.id = $1`,
  DELETE_BANNER_IMAGE: "DELETE FROM post_image WHERE post_image.post_id = $1",
  SAVE_BANNER_IMAGE: `INSERT INTO post_image (post_id, url, name)
    VALUES ($1, $2, $3)`,
};
