const createError = require("http-errors")
const { DateModel } = require("../models/dateModel");
const { MonthModel } = require("../models/monthModel");

const createDate = async (req, res, next) => {
    try {
        const monthId = req.params.id;

        const month = await MonthModel.findById(monthId);
        if(!month){
            throw(createError(404, "Month Not Found!!!"));
        }

        const {date} = req.body;
        const dateCreate = await DateModel.create({date, userId : req.userId, monthId : monthId});
        res.status(200).json({
            status : "Success",
            dateCreate
        });
    } catch (error) {
        next(createError(401, "Something Wrong " + error))
    }
}

const getDate = async (req, res, next) => {
    try {
    const getDat = await DateModel.find({})
    res.status(200).json({
        status : "success",
        getDat
    });
    } catch (error) {
        next(createError(401, "Something Wrong"));
    }
}

module.exports = {
    createDate,
    getDate
}