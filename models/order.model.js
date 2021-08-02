const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'Order',
  Schema({
    _id: Schema.Types.ObjectId,
    phone: {
      type: String,
      required: true,
    },
  })
);
