const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const totalFooterSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    monthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "months"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    expenseFieldTotal : {
        type : String,
        default : "00"
    },
    expenseRefundFieldTotal : {
        type : String,
        default : "00"
    },
    totalExpenseTotal : {
        type : String,
        default : "00"
    },
    earningFieldTotal : {
        type : String,
        default : "00"
    },
    earningRefundFieldTotal : {
        type : String,
        default : "00"
    },
    totalEarningTotal : {
        type : String,
        default : "00"
    },
    inHandTotal : {
        type : String,
        default : "00"
    },
    inChequeTotal : {
        type : String,
        default : "00"
    },
    totalInHandTotal : {
        type : String,
        default : "00"
    }
}, {
    timestamps: true,
    versionKey: false
})

const TotalFooterModel = model('totalFooter', totalFooterSchema);

module.exports = {
    TotalFooterModel
};