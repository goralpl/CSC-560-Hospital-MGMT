var mongoose = require ('mongoose');


mongoose.Promise = global.Promise;

//change the database with yours
mongoose.connect("mongodb://nhs-admin:xyz123@localhost:27017/nhs-app-db");

module.exports = {mongoose};
