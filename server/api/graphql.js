const router = require('express').Router()
const {getAllDbs, getAllTables} = require('../../graphql/db')
module.exports = router

router.get('/dbs', async (req, res, next) => {
  try {
    const dbs = await getAllDbs()
    res.send(dbs)
  } catch (error) {
    next(error)
  }
})

router.get('/dbs/:db', async (req, res, next) => {
  try {
    const tables = await getAllTables(req.params.db)
    res.send(tables)
  } catch (error) {
    next(error)
  }
})
