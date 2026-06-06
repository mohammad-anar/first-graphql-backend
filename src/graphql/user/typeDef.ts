export const typeDef = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    salt: String
    profileImageURL: String
  }
`

export default typeDef;
