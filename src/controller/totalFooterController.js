const { TotalExpenseModel } = require('../models/totalExpenseModel');
const { TotalFooterModel } = require('../models/totalFooterModel');

const calculateTotalSummaryAndSaveToFooter = async (req, res, next) => {
  try {
    const monthId = req.params.id;

    // Find all TotalExpenseModel records for the given monthId
    const expenses = await TotalExpenseModel.find({ monthId });

    // Initialize total fields outside the loop
    let expenseFieldTotal = 0,
      expenseRefundFieldTotal = 0,
      totalExpenseTotal = 0,
      earningFieldTotal = 0,
      earningRefundFieldTotal = 0,
      totalEarningTotal = 0,
      inHandTotal = 0,
      inChequeTotal = 0,
      totalInHandTotal = 0;

    for (const expense of expenses) {
      // Update the total fields in each iteration
      expenseFieldTotal += parseFloat(expense.expenseField);
      expenseRefundFieldTotal += parseFloat(expense.expenseRefundField);
      totalExpenseTotal += parseFloat(expense.totalExpense);
      earningFieldTotal += parseFloat(expense.earningField);
      earningRefundFieldTotal += parseFloat(expense.earningRefundField);
      totalEarningTotal += parseFloat(expense.totalEarning);
      inHandTotal += parseFloat(expense.inHand);
      inChequeTotal += parseFloat(expense.inCheque);
      totalInHandTotal += parseFloat(expense.totalInHand);
    }

    // Create or update the TotalFooterModel record
    const totalFooterRecord = await TotalFooterModel.findOneAndUpdate(
      { monthId },
      {
        $set: {
          expenseFieldTotal,
          expenseRefundFieldTotal,
          totalExpenseTotal,
          earningFieldTotal,
          earningRefundFieldTotal,
          totalEarningTotal,
          inHandTotal,
          inChequeTotal,
          totalInHandTotal
        }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ status: 'Success', totalFooterRecord });
  } catch (error) {
    next(new Error('Error calculating total summary and updating footer: ' + error.message));
  }
};

module.exports = {
  calculateTotalSummaryAndSaveToFooter
};
