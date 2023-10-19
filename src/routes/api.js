const express = require('express');
const router = express.Router();

const { userRegister, usreLogin } = require('../controller/userController');
const { createDate, getDate } = require('../controller/dateController');
// const { createExpensePurpose } = require('../controller/expensePurposeController');
const { createMonth, getMonth } = require('../controller/monthController');
const { authMiddleware } = require('../middlewares/userVerify');
const { expenseCreate } = require('../controller/expenseController');
const { expenseRefundCreate } = require('../controller/expenseRefundController');
const { totalExpenseCreate } = require('../controller/totalExpenseController');
const { autoBatchEnhancer } = require('@reduxjs/toolkit');

router.post("/userRegister", userRegister);
router.post("/userLogin", usreLogin);
router.post('/createDate/:id',authMiddleware, createDate);
router.get('/getDate',authMiddleware, getDate);  

router.post('/createMonth',authMiddleware, createMonth);
router.get('/getMonth',authMiddleware, getMonth);

router.post('/expenseCreate/:id',authMiddleware, expenseCreate);
router.post('/expenseRefundCreate/:id',authMiddleware, expenseRefundCreate);
router.post('/totalExpense/:id',authMiddleware, totalExpenseCreate)

// router.post('/createExpensePurpose', createExpensePurpose);

module.exports = router;