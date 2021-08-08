import { gql } from "@apollo/client";

export const NEW_FORM_FRAGMENT = gql`
  fragment NewForm on Form {
    _id
    name
    total_response
    slug
    createdAt
  }
`;