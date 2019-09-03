// const { encrypt } = require('../server/util');
const pg = require('pg')

const DB_CONNECTION = {
  user: '',
  database: '',
  password: '',
  host: 'localhost', // Server hosting the postgres database
  port: 5432,
  idleTimeoutMillis: 300, // how long a client is allowed to remain idle before being closed
  ssl: false
}

// Helper Functions
const setDatabase = dbName => {
  DB_CONNECTION.database = dbName
}

const setUserProvidedDbConnection = userConnection => {
  const {user, password, host, ssl, databaseName, port} = userConnection
  DB_CONNECTION.user = user
  DB_CONNECTION.password = encrypt(password, 'decrypt')
  DB_CONNECTION.host = host
  DB_CONNECTION.ssl = ssl
  DB_CONNECTION.database = databaseName
  DB_CONNECTION.port = port
}

const getAllDbs = async () => {
  const {database} = DB_CONNECTION

  const pool = new pg.Pool(DB_CONNECTION)
  try {
    // If user config specified a specifc DB to connect to, we don't need to worry
    // about filtering/finding and error checking from the pg response as the
    // pg connection will automatically throw an error if anything is wrong with the config,
    // such as an invalid db name. This query still needs to run though in order for an error
    // to be thrown or else app crashes for SSL connections.
    const response = await pool.query(
      'SELECT datname FROM pg_database WHERE datistemplate = false'
    )
    // If user config specifies a db to connect to, simply return the db name as an
    // array. If this code even runs, then that means the db connection didn't error out and
    // the db name provided is valid.
    if (database !== '') return [database]
    const arrayOfDbNames = response.rows.map(({datname}) => {
      return datname
    })
    return arrayOfDbNames
  } catch (error) {
    console.error(error)
    return error.message
  }
}

// Error handling thanks to pool.query throwing errors on bad connections relieves the stress
// of having to reaload any queries after CRUD operations - if they succeed we just have the front end
// proceed to add the values to the GUI itself.. But we let the front end if anything fails here so it
// doesn't reflect inaccurate information.

const getAllTables = async database => {
  setDatabase(database)
  const pool = new pg.Pool(DB_CONNECTION)
  try {
    const response = await pool.query(
      `SELECT table_name FROM  information_schema.tables
      WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema', 'management','postgraphile_watch') and table_name != '_Migration'`
    )
    return response.rows.map(({table_name: tableName}) => tableName)
  } catch (error) {
    console.error(error)
    return error.message
  }
}

const getTableData = async (table, database) => {
  setDatabase(database)
  const pool = new pg.Pool(DB_CONNECTION)
  try {
    const response = await pool.query(`SELECT * from "${table}"`)
    return response.rows
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAllTables,
  getAllDbs,
  getTableData,
  setUserProvidedDbConnection,
  DB_CONNECTION
}
