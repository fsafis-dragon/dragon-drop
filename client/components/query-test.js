import React, {Component} from 'react'
import QueryComponent from './query-component'

export default class QueryTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null
    }
  }

  render() {
    return (
      <div>
        <h2>Select User To Query</h2>
        <select onChange={e => this.setState({id: Number(e.target.value)})}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <QueryComponent userId={this.state.id} />
      </div>
    )
  }
}
