const mongoose = require('mongoose');
const { databaseUrl } = require('../../secret');

const databaseConnect = async () => {
    try {
        mongoose.connect(databaseUrl);
        console.log('Database are connected');
    } catch (error) {
        console.log(error.mongoose)
    }
}

module.exports = {
    databaseConnect
}

