// MODELO
const dbConnection = require("./DBConnection");
const { tableJavi } = require("./Product");

var sql = require('sql-query'),
sqlQuery = sql.Query('mysql');
 
module.exports = class Model {

    ////////////////////////////////////////////////////////
    // CREATE //////////////////////////////////////////////
    create(childModel) {
        console.log(childModel.getJson());

        return new Promise((resolve, reject) => {
            var sqlInsert = sqlQuery.insert();
            var sqlInsert = sqlInsert
                .into(this.table)
                .set(childModel.getJson())
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
    static all() {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM ' + "HERE I NEED THE TABLE";

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
                .from(this.table)
                .where(filter)
                .build();
            
            dbConnection.query(sqlSelect, function(err, rows) {
                if (err) reject(err);

                resolve(rows);
            });
        });
    }

    getJson(childModel){
        console.log("dentro de Product");
        console.log(childModel);
        // return {
        //     'id': this.id,
        //     "barcode" : this.barcode,
        //     "name" : this.name,
        //     "price" : this.price,
        // };
    }
}