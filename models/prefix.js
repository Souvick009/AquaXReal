const mongoose = require("mongoose");

const prefixSchema = new mongoose.Schema({
    serverId: { type: String },
    prefix: {type: String, default: ">>"}
})

module.exports = mongoose.model("Prefix", prefixSchema)