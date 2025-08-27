const mongoose = require("mongoose")

exports.isObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id) && 
         (String(new mongoose.Types.ObjectId(id)) === id);
}