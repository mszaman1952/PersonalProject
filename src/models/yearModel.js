const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const YearSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    yearType: { 
      type: String,
      required: true,
      // unique: true,
      default : getDefaultYear()
    },
  },
  { timestamps: true, versionKey: false }
);

// Define a separate function for the default value
function getDefaultYear() {
  const date = new Date();
  const year = date.getFullYear();
  return year;
}

const YearModel = model('Year', YearSchema);

module.exports = {
  YearModel,
};
