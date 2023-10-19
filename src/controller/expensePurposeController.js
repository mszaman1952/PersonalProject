// const createError = require("http-errors");
// const { ExpensePurpose } = require("../models/expensePurposeModle");

// const createExpensePurpose = async (req, res, next) => {
//     try {
//         const { options } = req.body;
//         const expensePurposeCreate = await ExpensePurpose.create(options); 

//         res.status(200).json({
//             status: "Success",
//             expensePurposeCreate
//         });
//     } catch (error) {
//         next(createError(401, "Something Wrong " + error));
//     }
// };

// module.exports = {
//     createExpensePurpose
// };
