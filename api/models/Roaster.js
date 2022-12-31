const mongoose = require("mongoose");

const RoasterSchema = new mongoose.Schema({
  arrived_at: {
    type: "String",
    required: true,
  },

  left_at: {
    type: "String",
    required: false,
  },

  user_id: {
    type: "String",
    required: true,
  },

  first_name: {
    type: "String",
    required: true,
  },

  last_name: {
    type: "String",
    required: true,
  },

  roaster_date: {
    type: "String",
    required: true,
  },
});

const RoasterModel = mongoose.model("roaster", RoasterSchema);
module.exports = RoasterModel;
