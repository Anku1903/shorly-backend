const mongoose = require("mongoose");
const shortId = require("shortid");


const URLSchema = mongoose.Schema({
    email: {
        type: String,
        default: "noemail"
    },
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
},{timestamps:true})

module.exports = mongoose.model("urls", URLSchema);
