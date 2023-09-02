import config from "./config/config";
import connect from "./db/connect";
import app from "./server";

const PORT: string | number = config.app.PORT;



//first connect to db and then start the server, since 
//connect() is an async function

connect().then(async function onServerStart() {
    console.log("Connected to database");

    app.listen(PORT, () => {
        console.log(`Server is litening on port ${PORT}`);
    })

})