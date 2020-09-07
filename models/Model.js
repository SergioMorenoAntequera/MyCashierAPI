// MODELO
const dbConnection = require("./DBConnection");

var sql = require('sql-query'),
sqlQuery = sql.Query('mysql');
 
module.exports = class Model {

    constructor(table) {
        this.table = table;
    }

    ////////////////////////////////////////////////////////
    // CREATE //////////////////////////////////////////////
    create(product) {
        // console.log(product.table);
        return new Promise((resolve, reject) => {
            var sqlInsert = sqlQuery.insert();
            var sqlInsert = sqlInsert
                .into(this.table)
                .set(product.getJson())
                .build();

            dbConnection.query(sqlInsert, function(err, rows) {
                if (err) reject(err);
    
                resolve(rows);
            });
        });
    }
    
    ////////////////////////////////////////////////////////
    // READ ////////////////////////////////////////////////
    // Get all
    all() {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM ' + this.table;

            dbConnection.query(sqlQuery, function(err, rows) {
                if(err) reject(err);
                
                resolve(rows);
            });
        });
    }

    // Filter by json object
    get(filter){
        return new Promise((resolve, reject) => {
            var sqlSelect = sqlQuery.select();
            var sqlSelect = sqlSelect
                .from(table)
                .where(filter)
                .build();
            
            dbConnection.query(sqlSelect, function(err, rows) {
                if (err) reject(err);

                resolve(rows);
            });
        });
    }
}