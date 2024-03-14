import { Router } from 'express'
import { healthCheck } from '../controller/index.js'

const apiRouters = new Router()

apiRouters.get('/v1/health-check', healthCheck)

export default apiRouters
