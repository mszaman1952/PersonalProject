const { TotalExpenseModel } = require('../models/totalExpenseModel');
const { YearSummaryModel } = require('../models/yearSummaryModel'); 

const yearSummary = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find all TotalExpenseModel records for the given monthId
    const expenses = await TotalExpenseModel.find({ userId });

    // Initialize total fields outside the loop
    let yearlyExpense = 0,
      yearlyRefundExpense = 0,
      yearlyTotalExpense = 0,
      yearlyEarning = 0,
      yearlyearningRefund = 0,
      yearlyTotalEarning = 0,
      yearlyInHand = 0,
      yearlyInCheque = 0,
      yearlyInHandTotal = 0;

    for (const expense of expenses) {
      // Update the total fields in each iteration
      yearlyExpense += parseFloat(expense.expenseField);
      yearlyRefundExpense += parseFloat(expense.expenseRefundField);
      yearlyTotalExpense += parseFloat(expense.totalExpense);
      yearlyEarning += parseFloat(expense.earningField);
      yearlyearningRefund += parseFloat(expense.earningRefundField);
      yearlyTotalEarning += parseFloat(expense.totalEarning);
      yearlyInHand += parseFloat(expense.inHand);
      yearlyInCheque += parseFloat(expense.inCheque);
      yearlyInHandTotal += parseFloat(expense.totalInHand);
    }

    // Create or update the YearSummaryModel record
    const yearSummaryRecord = await YearSummaryModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          yearlyExpense,
          yearlyRefundExpense,
          yearlyTotalExpense,
          yearlyEarning,
          yearlyearningRefund,
          yearlyTotalEarning,
          yearlyInHand,
          yearlyInCheque,
          yearlyInHandTotal
        }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ status: 'Success', yearSummaryRecord });
  } catch (error) {
    next(new Error('Error calculating total summary and updating footer: ' + error.message));
  }
};

module.exports = {
  yearSummary
};
