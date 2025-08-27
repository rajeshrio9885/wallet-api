const mongoose = require("mongoose");

const dbConnection = async () => {
  const dbcntd = await mongoose.connect(process.env.DBURI);
  console.log("db connect to the host " + dbcntd.connection.host);
};

module.exports = dbConnection;
