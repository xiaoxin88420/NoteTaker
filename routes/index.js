
const router = require('express').Router()

router.use('/api', require('./apiRoutes.js'))
router.use('/', require('./viewRoutes.js'))

module.exports = router