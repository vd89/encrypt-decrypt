import debug from 'debug'

const appLog = debug('app:controller ->')

export const healthCheck = (req, res, next) => {
  try {
    const date = new Date()
    const testData = {
      testDetails: 'the Server is working',
      timeStamp: { date: date.toLocaleDateString(), time: date.toLocaleTimeString() },
    }
    return res.json({ message: 'SUCCESS', data: testData })
  } catch (e) {
    appLog(e.message)
    next(e)
  }
}
