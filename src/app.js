import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import apiRouters from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.use(morgan('combined'))
app.use(apiRouters)

export default app
