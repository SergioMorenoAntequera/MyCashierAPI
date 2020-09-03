// MODELO
const dbConnection = require("./DBConnection");
const Model = require("./Model");

var sql = require('sql-query'),
sqlQuery = sql.Query('mysql');

module.exports = class Product extends Model {

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
    static async all(callbackGiveData) {
        let sqlQuery = 'SELECT * FROM ' + this.tableName;

        dbConnection.query(sqlQuery, function(err, rows) {
            if (err) throw err;

            callbackGiveData(rows);
        });
    }

    // Create in database
    async create(callback){
        var sqlInsert = sqlQuery.insert();
        var sqlInsert = sqlInsert
            .into(this.table)
            .set(this.getJson())
            .build();

        dbConnection.query(sqlInsert, function(err, rows) {
            if (err) throw err;

            callback();
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