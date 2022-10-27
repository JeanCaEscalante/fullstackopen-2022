import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthor {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query  {
    allBooks {
      title
      published
      author
      genres
      id
    }
  }
`
export const CREATE_BOOKS = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author
      genres
      id
    }
  }
`

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`