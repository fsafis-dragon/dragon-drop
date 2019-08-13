import axios from 'axios'

const GET_DBS = 'GET_DBS'
const GET_TABLES = 'GET_TABLES'

const getDbs = dbs => ({
  type: GET_DBS,
  dbs
})

const getTables = tables => ({
  type: GET_TABLES,
  tables
})

export const getDbsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/graphql/dbs')
      dispatch(getDbs(data))
    } catch (error) {
      console.log('Could Not Get DBs', error)
    }
  }
}

export const getTablesThunk = db => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/graphql/dbs/${db}`)
      dispatch(getTables(data))
    } catch (error) {
      console.log('Could Not Get Tables', error)
    }
  }
}

const initialState = {
  dbs: null,
  tables: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DBS:
      return {
        ...state,
        dbs: action.dbs
      }
    case GET_TABLES:
      return {
        ...state,
        tables: action.tables
      }
    default:
      return state
  }
}
