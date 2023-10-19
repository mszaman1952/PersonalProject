const express = require('express');
const router = express.Router();

const { userRegister, usreLogin } = require('../controller/userController');
const { createDate, getDate } = require('../controller/dateController');

const { createMonth, getMonth } = require('../controller/monthController');
const { authMiddleware } = require('../middlewares/userVerify');

const { totalExpenseCreate } = require('../controller/totalExpenseController');
const { calculateTotalSummaryAndSaveToFooter } = require('../controller/totalFooterController');
const { createYear, getYear } = require('../controller/yearController');
const { yearSummary } = require('../controller/yearSummaryController');

router.post("/userRegister", userRegister);
router.post("/userLogin", usreLogin);

router.post('/createYear/:id',authMiddleware, createYear);
router.get('/getYear/:id', authMiddleware, getYear);

router.post('/createMonth/:id',authMiddleware, createMonth);
router.get('/getMonth/:id',authMiddleware, getMonth);

router.post('/createDate/:id',authMiddleware, createDate);
router.get('/getDate/:id',authMiddleware, getDate);  

router.post('/totalExpense/:id',authMiddleware, totalExpenseCreate);
router.post('/totalFooter/:id',authMiddleware, calculateTotalSummaryAndSaveToFooter);

router.get('/yearSummary/:id', yearSummary)

module.exports = router;