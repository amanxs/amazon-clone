
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
    name: String,
    about: String,
    photot: String
});

module.exports = mongoose.model("Owner", OwnerSchema);

//mongoDB atlas(cloud) to connect to mongoDb