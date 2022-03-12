import { gql } from "@apollo/client";

export const GET_CATEGORIES_NAME = gql`
  query {
    categories {
      name
    }
  }
`;
 // TODO fetch data based on category selection

export const GET_PRODUCTS = gql`
  query {
    category(input: { title: "all" }) {
      name
      products {
        name
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        inStock
        gallery
      }
    }
  }
`;