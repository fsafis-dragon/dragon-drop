const router = require('express').Router()
const {getAllDbs} = require('../../graphql/db')
module.exports = router

router.get('/dbs', async (req, res, next) => {
  try {
    const dbs = await getAllDbs()
    res.send(dbs)
  } catch (error) {
    next(error)
  }
})
