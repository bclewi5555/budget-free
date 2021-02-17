module.exports = {
    HOST: process.env.PGHOST,
    USER: process.env.PGUSER,
    PASSWORD: process.env.PGPASSWORD,
    DB: process.env.PGDATABASE,
    dialect: "postgres",
    pool: {
        max: 5, // max number of connections
        min: 0, // min number of connections
        acquire: 30000, // max connection attempt time (ms) before error
        idle: 10000 // max idle connection time (ms) before release
    }
};