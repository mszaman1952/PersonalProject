const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const yearSummarySchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    monthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "months"
    },
    yearlyExpense : {
        type : String,
        default : "00"
    },
    yearlyRefundExpense : {
        type : String,
        default : "00"
    },
    yearlyTotalExpense : {
        type : String,
        default : "00"
    },
    yearlyEarning : {
        type : String,
        default : "00"
    },
    yearlyearningRefund : {
        type : String,
        default : "00"
    },
    yearlyTotalEarning : {
        type : String,
        default : "00"
    },
    yearlyInHand : {
        type : String,
        default : "00"
    },
    yearlyInCheque : {
        type : String,
        default : "00"
    },
    yearlyInHandTotal : {
        type : String,
        default : "00"
    }
}, {
    timestamps: true,
    versionKey: false
})

const YearSummaryModel = model('yearSummary', yearSummarySchema);

module.exports = {
    YearSummaryModel
};