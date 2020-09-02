// MODELO
const dbConnection = require("./DBConnection");
const Model = require("./Model");
 
module.exports = class Product extends Model {

    static tableName = "products";

    constructor(barcode, name, price) {
        super();
        this.barcode = barcode;
        this.name = name;
        this.price = price;
    }

    static async all(callbackGiveData) {
        let sqlQuery = 'SELECT * FROM ' + this.tableName;

        dbConnection.query(sqlQuery, function(err, rows) {
            if (err) throw err;

            callbackGiveData(rows);
        });
    }
}