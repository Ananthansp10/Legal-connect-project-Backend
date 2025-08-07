import app from './app'
const port=process.env.PORT
import db from '../Backend/config/dbConfig'
import logger from './logger';

db();

app.listen(port,()=>{
    //console.log(`server running in http://localhost:${port}`)
    logger.info(`server running in http://localhost:${port}`)
})