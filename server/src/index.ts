import config from "./config/config";
import app from "./server";

const PORT: string | number = config.app.PORT;

console.log(PORT);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})