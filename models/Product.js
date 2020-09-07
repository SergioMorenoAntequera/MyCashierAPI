// MODELO
const dbConnection = require("./DBConnection");
const Model = require("./Model");

var sql = require('sql-query'),
sqlQuery = sql.Query('mysql');

module.exports = class Product {

    // Inherit in js work like shit
    static table = "products";
    static model = new Model(Product.table);

    ///////////////////////////////////////////////////////////////////////
    // Constructors ///////////////////////////////////////////////////////
    constructor(barcode, name, price) {
        this.id = null;
        this.barcode = barcode;
        this.name = name;
        this.price = price;
    }

    static newProductWithQuery(query){
        return new Product(query.barcode, query.name, query.price);
    }

    ///////////////////////////////////////////////////////////////////////
    // Methods ////////////////////////////////////////////////////////////
    // Create in database
    static create(product){
        return this.model.create(product, this.table);
    }
    
    
    static all(){
        return this.model.all();
    }

    // Get with filters
    static get(filter){
        return this.model.get(filter);
    }

    

    // Create json query
    getJson(){
        return {
            'id': this.id,
            "barcode" : this.barcode,
            "name" : this.name,
            "price" : this.price,
        };
    }
}