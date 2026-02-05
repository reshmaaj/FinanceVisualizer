const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Income", incomeSchema);
