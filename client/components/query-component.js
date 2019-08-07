import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {getUserQuery} from '../queries'

class QueryComponent extends Component {
  render() {
    return (
      <div>
        {this.props.data.userById ? (
          <h1>{this.props.data.userById.email}</h1>
        ) : (
          <h1>loading</h1>
        )}
      </div>
    )
  }
}

export default graphql(getUserQuery, {
  options: props => {
    return {
      variables: {
        id: props.userId
      }
    }
  }
})(QueryComponent)
