const Pool = require('pg').Pool

const pool = new Pool({
    user:'postgres',
    password:'1080',
    host:'localhost',
    port:5432,
    database:'employeedatabase'
})

module.exports = pool