const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const totalExpenseSchema = new Schema({
    totalExpense : {
        type : String,
        default : "00"
    },
    dateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dateModel"
    },
    expenseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ExpenseModel"
    },
    expenseRefundId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ExpenseRefundModel"
    }
}, {
    timestamps: true,
    versionKey: false
})

const TotalExpenseModel = model('totalExpense', totalExpenseSchema);

module.exports = {
    TotalExpenseModel
};