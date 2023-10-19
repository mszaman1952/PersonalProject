const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const expenseSchema = new Schema({
    expenseField : {
        type : String,
        default : "00"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dateModel"
    }
}, {
    timestamps: true,
    versionKey: false
})

const ExpenseModel = model('createExpense', expenseSchema);

module.exports = {
    ExpenseModel,
};