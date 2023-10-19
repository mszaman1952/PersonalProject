const createError = require("http-errors")
const { YearModel } = require("../models/yearModel");

const createYear = async (req, res, next) => {
    try {
        const {year} = req.body;
        const yearCreate = await YearModel.create({year, userId : req.userId});
        res.status(200).json({
            status : "Success",
            yearCreate
        });
    } catch (error) {
        next(createError(404, "Something Wrong " + error))
    }
}

const getYear = async (req, res, next) => {
    try {
    const yearGet = await YearModel.find({})
    res.status(200).json({
        status : "success",
        yearGet
    });
    } catch (error) {
        next(createError(401, "Something Wrong"));
    }
}

module.exports = {
    createYear,
    getYear
}
