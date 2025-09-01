import express from 'express'
import env from 'dotenv'
const app=express()
import userRouter from './routes/userRouter'
import lawyerRouter from './routes/lawyerRouter'
import adminRouter from './routes/adminRouter'
import commonRouter from './routes/commonRouter'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import http from 'http'
import { initSocket } from './config/socketIo'

env.config()

export const server=http.createServer(app)

initSocket(server)

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true   
}));

app.use(cookieParser());

app.use(express.json());

app.use(morgan('dev'))

app.use('/api/user',userRouter)
app.use('/api/lawyer',lawyerRouter)
app.use('/api/admin',adminRouter)
app.use('/api/common',commonRouter)

export default app;