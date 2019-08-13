import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDbsThunk, getTablesThunk} from '../store'
import {Chart} from './index'

class DisconnectedHomePage extends Component {
  constructor() {
    super()
    this.state = {
      selectedDb: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getDbs()
  }

  async handleChange(e) {
    const db = e.target.value
    await this.props.getTables(db)
    this.setState({
      selectedDb: db
    })
  }

  render() {
    const {dbs, tables} = this.props
    return (
      <div>
        <h1>Welcome To Dragon-Drop</h1>
        <select onChange={this.handleChange}>
          <option value="" disabled>
            Select A Database...
          </option>
          {dbs ? (
            dbs.map(db => <option value={db}>{db}</option>)
          ) : (
            <option>DBs Not Found</option>
          )}
        </select>
        {tables ? (
          <div>
            <p>Showing Tables From {this.state.selectedDb}</p>
            <ul>{tables.map(table => <li>{table}</li>)}</ul>
          </div>
        ) : null}
        <Chart />
      </div>
    )
  }
}

const mapState = state => ({
  dbs: state.db.dbs,
  tables: state.db.tables
})

const mapDispatch = dispatch => ({
  getDbs: () => dispatch(getDbsThunk()),
  getTables: db => dispatch(getTablesThunk(db))
})

export default connect(mapState, mapDispatch)(DisconnectedHomePage)
