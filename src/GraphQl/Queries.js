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
        id
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

export const GET_CATEGORIES_AND_CURRENCIES = gql`
  query {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;
export const GET_ALL_DATA = gql`
  query categoryFilter($categoryName: CategoryInput ){
    categories {
      name
    }
    currencies {
      label
      symbol
    }
    category(input: $categoryName ) {
      name
      products {
        id
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
