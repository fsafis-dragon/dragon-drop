const {postgraphile} = require('postgraphile')
const pkg = require('../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

module.exports = postgraphile(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  'public',
  {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true
  }
)
