module.exports = {
    REGISTER_NEW_USER: `INSERT INTO "user" (username, password, name, email) VALUES ($1, $2, $3, $4)`,
    GET_USER_BY_USERNAME: `SELECT "user".* FROM "user" WHERE "user".username = $1`,
    GET_USER_BY_EMAIL: `SELECT "user".* FROM "user" WHERE "user".email = $1`,
    GET_USER_BY_USERNAME_OR_EMAIL: `SELECT "user".* FROM "user" WHERE "user".username = $1 OR "user".email = $2`,
    UPDATE_PASSWORD: `UPDATE "user" SET password = $2 WHERE username = $1`
}