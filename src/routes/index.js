import { Router } from 'express'
import ApiController from '../controller/index.js'

const apiRouters = new Router()
const apiCtrl = new ApiController()

apiRouters.get('/v1/health-check', apiCtrl.healthCheck)

export default apiRouters
