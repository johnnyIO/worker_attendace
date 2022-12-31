const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: "String",
    required: true,
  },
  last_name: {
    type: "String",
    required: true,
  },
  phone_number: {
    type: "String",
    required: true,
  },
  date_of_birth: {
    type: "String",
    required: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
