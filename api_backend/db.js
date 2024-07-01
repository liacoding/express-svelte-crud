const { Pool } = require('your_database_type_here'); //install and then write your database type here

const pool = new Pool({
    user: 'your_username_here',
    host: 'host_of_the_database_here',
    database: 'database_name_here',
    password: 'database_password_here',
    port: 1000, // write database port number here
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;


