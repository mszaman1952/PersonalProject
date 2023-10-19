const createError = require("http-errors");
const { ExpenseModel } = require("../models/expenseModel");
const { DateModel } = require("../models/dateModel");
const { ExpenseRefundModel } = require("../models/expenceRefundModel");
const { TotalExpenseModel } = require("../models/totalExpenseModel");

const totalExpenseCreate = async (req, res, next) => {
    try {
        const dateId = req.params.id;

        const date = await DateModel.findById(dateId);
        if (!date) {
            throw createError(404, "Date Not Found!!!");
        }

        // Find all expenses for the given dateId
        const expenses = await ExpenseModel.find({ dateId: dateId });

        // Calculate the total expense by summing up the expense amounts
        let totalExpense = 0;
        for (const expense of expenses) {
            totalExpense += expense.expenseField;
        }

        // Find all refunds for the given dateId
        const refunds = await ExpenseRefundModel.find({ dateId: dateId });

        // Subtract the refund amounts from the total expense
        for (const refund of refunds) {
            totalExpense -= refund.expenseRefundField;
        }

        // Create or update the total expense record
        const totalExpenseRecord = await TotalExpenseModel.findOneAndUpdate(
            { dateId: dateId },
            { totalExpense: totalExpense.toLocaleString()},
            { upsert: true, new: true }
        );

        res.status(200).json({  
            status: "Success", 
            totalExpense: totalExpenseRecord.totalExpense
        });
    } catch (error) {
        next(createError(401, "Something Wrong " + error));
    }
}

module.exports = {
    totalExpenseCreate
}