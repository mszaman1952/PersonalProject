// const mongoose = require('mongoose')
// const {Schema, model} = mongoose;

// const dateSchema = new Schema({
//     data : {
//         userId : {
//             type : mongoose.Schema.Types.ObjectId,
//             ref : "User"
//         },
//         type :  String,
//         required : true,
//         unique : true,
//         // default : `${new Date().getDate()}`  + "/" + `${new Date().getMonth() + 1}`  + "/" + new Date().getFullYear()
//         default : `${new Date().getDate() <= ${9}? "0" + new Date().getDate() : new Date().getDate() }`  + "/" + `${new Date().getMonth() + 1}`  + "/" + new Date().getFullYear()

//     }
// }, {timestamps : true, versionKey : false})

// const DateModel = model("dateModel", dateSchema)

// module.exports = {
//     DateModel,
// }

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const dateSchema = new Schema(
  {
    data: {
      type: String,
      required: true,
      unique: true,
      default: () => {
        const date = new Date();
        const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`;
        const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const formattedDate = `${day}/${month}/${date.getFullYear()}`;
        return formattedDate;
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    monthId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "month"
    }
  },
  { timestamps: true, versionKey: false }
);

const DateModel = model('dateModel', dateSchema);

module.exports = {
  DateModel,
};
