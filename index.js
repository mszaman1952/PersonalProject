const { app } = require("./app");
const { port } = require("./secret");
const { databaseConnect } = require("./src/config/db");

app.listen(port, async () => {
    console.log(`Server is Running Successfully at http://localhost:${port}`);
    await databaseConnect();
})


