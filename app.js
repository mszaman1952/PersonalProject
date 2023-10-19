const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const createError = require('http-errors');
const { errorResponse, successResponse } = require("./src/controller/responseController");
const router = require('./src/routes/api');

// express instance create 
const app = express(); 

// implement built/application/security/thirdparty middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(morgan('dev'));
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());

// simple api test 
app.get('/', (req, res, next) => {
    try {
        successResponse(res, {
            statusCode : 200,
            message : res.message,
            payload : { },
        }); 
    } catch (error) {
        next(error);
    }
});

// router implement 
app.use('/api/v1', router)

// client error handling 
app.use((req, res, next) => {
    next(createError(404, "Route Not Found"));
});

// server side/all error handling 
app.use((err, req, res, next) => {
    errorResponse(res, {
        statusCode : err.status,
        message : err.message
    });
});


// export app
module.exports = {
    app
}
