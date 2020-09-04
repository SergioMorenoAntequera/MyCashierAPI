// MODELO
const dbConnection = require("./DBConnection");
const Model = require("./Model");

var sql = require('sql-query'),
sqlQuery = sql.Query('mysql');

module.exports = class Product extends Model {

    static table = "products";

    // Constructores
    constructor(barcode, name, price) {
        super("products");
        this.id = null;
        this.barcode = barcode;
        this.name = name;
        this.price = price;
    }

    static newProductWithQuery(query){
        return new Product(query.barcode, query.name, query.price);
    }

    // Get everything
    static all() {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM ' + this.table;

            dbConnection.query(sqlQuery, function(err, rows) {
                if(err) reject(err);
                
                resolve(rows);
            });
        });
    }

    // Get with filters
    static get(filter){
        return new Promise((resolve, reject) => {
            var sqlSelect = sqlQuery.select();
            var sqlSelect = sqlSelect
                .from(this.table)
                .where(filter)
                .build();
            console.log(sqlSelect);
            
            dbConnection.query(sqlSelect, function(err, rows) {
                if (err) reject(err);

                resolve(rows);
            });
        });
    }

    // Create in database
    async create(callback){
        var sqlInsert = sqlQuery.insert();
        var sqlInsert = sqlInsert
            .into(this.table)
            .set(this.getJson())
            .build();

        // Check that the barcode is not taken
        Product.get({'barcode' : this.barcode}, (result) => {
            // if(result.length == 0){
                dbConnection.query(sqlInsert, function(err, rows) {
                    if (err) throw err;
        
                    callback(rows);
                });
            // } else {
            //     callback(false);
            // }
        });
    }

    

    // Create json query
    getJson(){
        return {
            'id': null,
            "barcode" : this.barcode,
            "name" : this.name,
            "price" : this.price,
        };
    }
}