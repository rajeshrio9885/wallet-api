const mongoose = require("mongoose");

const transcationSchema = new mongoose.Schema({
  user_id: String,
  title: String,
  amount: Number,
  category: String,
  created_At: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transcationSchema);

module.exports = Transaction;
