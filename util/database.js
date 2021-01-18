const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce','root','aman281198',{dialect:'mysql', host:'localhost'});


module.exports = sequelize;









// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database: 'ecommerce',
//     password:'aman281198'
// });

// module.exports = pool.promise();