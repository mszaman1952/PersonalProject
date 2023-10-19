const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const totalExpenseSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    monthId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "monthModel"
    },
    dateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dateModel"
    },
    expensePurpose : {
        type : String,
        enum : ["Salary","Rent","Business","Others"],
    },
    expenseMode : {
        type : String,
        enum : ["Cheque","Cash"]
    },
    expenseField : {
        type : String,
        default : "00",
        trim : true
    },
    expenseRefundField : {
        type : String,
        default : "00",
        trim : true
    },
    totalExpense : {
        type : String,
        default : "00",
        trim : true
    },
    earningPurpose : {
        type : String,
        enum : ["Salary","Rent","Business","Others"]
    },
    earningMode : {
        type : String,
        enum : ["Cheque","Cash"]
    },
    earningField : {
        type : String,
        default : "00",
        trim : true
    },
    earningRefundField : {
        type : String,
        default : "00",
        trim : true
    },
    totalEarning : {
        type : String,
        default : "00",
        trim : true
    },
    inHand : {
        type : String,
        default : "00",
        trim : true
    },
    inCheque : {
        type : String,
        default : "00",
        trim : true
    },
    totalInHand : {
        type : String,
        default : "00",
        trim : true
    }
}, {
    timestamps: true,
    versionKey: false
})

const TotalExpenseModel = model('totalExpense', totalExpenseSchema);

module.exports = {
    TotalExpenseModel
};