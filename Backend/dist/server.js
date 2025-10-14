"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT;
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
//import logger from './logger';
(0, dbConfig_1.default)();
app_1.server.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
  //logger.info(`server running in http://localhost:${port}`)
});
