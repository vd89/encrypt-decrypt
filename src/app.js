import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.use(morgan('combined'))

app.get('/health-check', (req, res, next) => {
  try {
    const date = new Date()
    const testData = {
      testDetails: 'the Server is working',
      time: date.toUTCString(),
    }
    return res.json({ message: 'SUCCESS', data: testData })
  } catch (e) {
    // appLog(e.message)
    next(e)
  }
})
export default app
