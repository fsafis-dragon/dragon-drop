import {gql} from 'apollo-boost'

export const getUserQuery = gql`
  query($id: Int!) {
    userById(id: $id) {
      email
    }
  }
`
