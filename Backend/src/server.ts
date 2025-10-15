import { server } from "./app";
const port = Number(process.env.PORT);
import db from "./config/dbConfig";

db();

server.listen(port, "0.0.0.0", () => {
  console.log(`server running in ${port}`);
});
