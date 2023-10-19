const createError = require("http-errors");
const { DateModel } = require("../models/dateModel");
const { TotalExpenseModel } = require("../models/totalExpenseModel");

const totalExpenseCreate = async (req, res, next) => {
    try {
        const {monthId} = req.body;
        const dateId = req.params.id;
        const { 
            expenseRefundField,
            expenseField,
            expenseMode,
            expensePurpose,
            earningField,
            earningRefundField,
            earningMode,
            earningPurpose
        } = req.body;

        const date = await DateModel.findById(dateId);
        if (!date) {
            throw createError(404, "Date Not Found!!!"); 
        }

        // total Expense area
        // Find all expenses for the given dateId
        const expenses = await TotalExpenseModel.find({ dateId: dateId });

        // Calculate the total expense by summing up the expense amounts
        let totalExpense = 0;
        for (const expense of expenses) {
            totalExpense += parseFloat(expense.expenseField);
        }

        // Find all refunds for the given dateId
        const refunds = await TotalExpenseModel.find({ dateId: dateId });

        // Subtract the refund amounts from the total expense
        for (const refund of refunds) {
            totalExpense -= parseFloat(refund.expenseRefundField);
        }

        // total earning area 
        const earnings = await TotalExpenseModel.find({ dateId: dateId });

        let totalEarning = 0;
        for (const earn of earnings) {
            totalEarning += parseFloat(earn.earningField);
        }

        // earning refund 
        const refundsEarn = await TotalExpenseModel.find({ dateId: dateId });

        // Subtract the refund amounts from the total expense
        for (const refundEarn of refundsEarn) {
            totalEarning -= parseFloat(refundEarn.earningRefundField);
        }

        // in hand cash amount
        let inHandCash = (30 / 100) * totalEarning;

        // in hand cheque amount
        let inChequeAmount = (totalEarning - inHandCash) - totalExpense;

        // in hand total amount 
        let inHandTotalAmount = totalEarning - totalExpense;

        // Create or update the total expense record
        const totalExpenseRecord = await TotalExpenseModel.findOneAndUpdate(
            { dateId: dateId,monthId : monthId, userId : req.userId },
            { $set :{ 
                uniqueDate : date,
                expensePurpose : expensePurpose,
                expenseMode : expenseMode,
                expenseField: expenseField,
                expenseRefundField: expenseRefundField,
                totalExpense: totalExpense,
                earningPurpose : earningPurpose,
                earningMode : earningMode,
                earningField: earningField,
                earningRefundField: earningRefundField,
                totalEarning: totalEarning, 
                inHand : inHandCash,
                inCheque : inChequeAmount,
                totalInHand : inHandTotalAmount
            }},
            { 
                upsert: true, 
                // new: true, 
            }
        );

        res.status(200).json({  
            status: "Success", 
            totalExpenseRecord
        });
    } catch (error) {
        next(createError(401, "Something Wrong " + error));
    }
}

module.exports = {
    totalExpenseCreate
};
