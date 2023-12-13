const Pool = require('pg').Pool

const pool = new Pool({
    user:'postgres',
    password:'1080',
    host:'localhost',
    port:5432,
    database:'employeedatabase'
})

module.exports = pool


// const Pool = require("pg").Pool;

// // const pool = new Pool({
// //   user: "employeedatabase_hgzl_user",
// //   password: "Hjd9oTKygozWimWFc9LkoZn2i8S8ESSe",
// //   host: "dpg-cls77djip8as73a4eaog-a",
// //   port: 5432,
// //   database: "employeedatabase_hgzl",
// // });

// // module.exports = pool;