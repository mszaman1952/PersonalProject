const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const expenseRefundSchema = new Schema({
    expenseRefundField : {
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

const ExpenseRefundModel = model('createRefundExpense', expenseRefundSchema);

module.exports = {
    ExpenseRefundModel,
};