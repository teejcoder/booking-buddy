const mongoose = require("mongoose");

const BandNameSchema = new mongoose.Schema({
    BandName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("BandName", BandNameSchema);