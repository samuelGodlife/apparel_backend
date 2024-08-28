const { default: mongoose } = require("mongoose");
const dbconfig = require("../config/database");
const Mongoose = require("mongoose");

module.exports = {
    mongoose,
    url: dbconfig.url,
    mahasiswa: require('./mahasiswa,model.js')(mongoose),
    pesanan: require('./pesanan,model.js')(mongoose),
    produk: require('./produk.model.js')(mongoose)
}