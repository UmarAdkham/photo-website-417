// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "yupiter",
//   password: "1234",
//   port: 5400,
// });

// module.exports = pool;

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://toshmat:yYPBJGCrWZPFxW0R6O3AULcKCg4HZbQn@dpg-cv4pnaan91rc73e4kfo0-a.oregon-postgres.render.com/yupiter_yq3w",
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
});

module.exports = pool;
