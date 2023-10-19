const createError = require("http-errors");
const { ExpenseModel } = require("../models/expenseModel");
const { DateModel } = require("../models/dateModel");

const expenseCreate = async (req, res, next) => {
    try {
        const dateId = req.params.id;

        const date = await DateModel.findById(dateId);
        if (!date) {
            throw createError(404, "Date Not Found!!!");
        }

        const { expenseField } = req.body;

        // Check if an expense already exists for the given dateId
        let expense = await ExpenseModel.findOne({ dateId: dateId });

        // If expense doesn't exist for this dateId, create a new expense
        if (!expense) {
            expense = new ExpenseModel({
                expenseField,
                userId: req.userId,
                dateId: dateId
            });
        } else {
            // If expense already exists, update the existing expense
            expense.expenseField = expenseField;
            expense.userId = req.userId;
        }

        // Save the expense
        const expenseCreate = await expense.save();

        res.status(200).json({
            status: "Success",
            expenseCreate
        });
    } catch (error) {
        next(createError(401, "Something Wrong " + error));
    }
}

module.exports = {
    expenseCreate
}