const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'Items',
  Schema({
    _id: Schema.Types.ObjectId,
    product: [String],
    quantity: Number,
    phone: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  })
);
