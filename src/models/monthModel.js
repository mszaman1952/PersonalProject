const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const monthSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    monthType: { 
      type: String,
      required: true,
      unique: true,
      default : getDefaultMonth()
    },
  },
  { timestamps: true, versionKey: false }
);

// Define a separate function for the default value
function getDefaultMonth() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const date = new Date();
  const month = months[date.getMonth()];
  const formattedDate = `${month}-${date.getFullYear()}`;
  return formattedDate;
}

// Assign the default value using the default() function
// monthSchema.path('monthType').default(getDefaultMonth);

const MonthModel = model('Month', monthSchema);

module.exports = {
  MonthModel,
};
