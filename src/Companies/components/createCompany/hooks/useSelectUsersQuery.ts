import gql from "graphql-tag";

export const selectUsersGql = gql`
  query UsersSelect(
    $filter: UserFilter!
    $sorting: [UserSort!]
    $paging: OffsetPaging!
  ) {
    # Get all users
    users(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of users
      # Get specific fields for each user
      nodes {
        id
        name
        avatarUrl
      }
    }
  }
`;