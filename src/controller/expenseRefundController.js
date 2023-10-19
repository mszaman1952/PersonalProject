const createError = require("http-errors");
const { DateModel } = require("../models/dateModel");
const { ExpenseRefundModel } = require("../models/expenceRefundModel");
const { ExpenseModel } = require("../models/expenseModel");

const expenseRefundCreate = async (req, res, next) => {
    try {
        const dateId = req.params.id;

        const date = await DateModel.findById(dateId);
        if (!date) {
            throw createError(404, "Date Not Found!!!");
        }

        const expenseId = await ExpenseModel.findById()

        const { expenseRefundField } = req.body;

        // Check if an expense already exists for the given dateId
        let expense = await ExpenseRefundModel.findOne({ dateId: dateId });

        // If expense doesn't exist for this dateId, create a new expense
        if (!expense) {
            expense = new ExpenseRefundModel({
                expenseRefundField,
                userId: req.userId,
                dateId: dateId
            });
        } else {
            // If expense already exists, update the existing expense
            expense.expenseRefundField = expenseRefundField;
            expense.userId = req.userId;
        }

        // Save the expense
        const expenseRefundCreate = await expense.save();

        res.status(200).json({
            status: "Success",
            expenseRefundCreate
        });
    } catch (error) {
        next(createError(401, "Something Wrong " + error));
    }
}

module.exports = {
    expenseRefundCreate
}