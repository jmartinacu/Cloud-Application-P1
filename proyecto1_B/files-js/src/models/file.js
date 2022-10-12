const mariadb = require("mariadb");

var Schema = mariadb.Schema({
    date: {type:Date, default: Date.now},
    description: String,
    image: String
});

module.exports = mariadb.model('File', FileSchema);