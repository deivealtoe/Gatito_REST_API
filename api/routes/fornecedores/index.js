const router = require('express').Router()

router.use('/', (request, response) => {
  response.send('Ok')
})

module.exports = router