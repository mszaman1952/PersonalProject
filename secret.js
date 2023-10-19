const dotEnv = require('dotenv');
dotEnv.config();

const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;


module.exports = {
    port,
    databaseUrl,
    secretKey
}

