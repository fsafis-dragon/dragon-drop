import axios from 'axios'
import React, {Component} from 'react'
import {Chart} from './index'

export default class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      dbs: [],
      selectedDb: '',
      tables: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/graphql/dbs')
    this.setState({
      dbs: data.sort()
    })
  }

  async handleChange(e) {
    const db = e.target.value
    const {data} = await axios.get(`/api/graphql/dbs/${db}`)
    this.setState({
      selectedDb: db,
      tables: data
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome To Dragon-Drop</h1>
        <select onChange={this.handleChange}>
          <option value="" disabled>
            Select A Database...
          </option>
          {this.state.dbs.map(db => <option value={db}>{db}</option>)}
        </select>
        {this.state.tables ? (
          <div>
            <p>Showing Tables From {this.state.selectedDb}</p>
            <ul>{this.state.tables.map(table => <li>{table}</li>)}</ul>
          </div>
        ) : null}
        <Chart />
      </div>
    )
  }
}
