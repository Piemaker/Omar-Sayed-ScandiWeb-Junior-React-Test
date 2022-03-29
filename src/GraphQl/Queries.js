import { gql } from "@apollo/client";

export const GET_CATEGORIES_NAME = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_CATEGORY = gql`
  query categoryFilter($category: CategoryInput) {
    category(input: $category) {
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
        brand
        attributes {
          # Disable Apollo caching for this attribute
          __typename @skip(if: true)
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
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
  query categoryFilter($categoryName: CategoryInput) {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
    category(input: $categoryName) {
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

export const GET_PRODUCT = gql`
  query productFilter($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        # Disable Apollo caching for this attribute
        __typename @skip(if: true)
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;
