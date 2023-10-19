const createError = require("http-errors")
const { MonthModel } = require("../models/monthModel");

const createMonth = async (req, res, next) => {
    try {
        const {month} = req.body;
        const monthCreate = await MonthModel.create({month, userId : req.userId});
        res.status(200).json({
            status : "Success",
            monthCreate
        });
    } catch (error) {
        next(createError(404, "Something Wrong " + error))
    }
}

const getMonth = async (req, res, next) => {
    try {
    const getMont = await MonthModel.find({})
    res.status(200).json({
        status : "success",
        getMont
    });
    } catch (error) {
        next(createError(401, "Something Wrong"));
    }
}

module.exports = {
    createMonth,
    getMonth
}
