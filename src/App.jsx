import "./normalize.css";
import "./root.css";
import "./app.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import React, { Component } from "react";
import PLP from "./components/Product-Listing-Page/PLP";
import Nav from "./components/nav/Nav";
import { GET_ALL_DATA, GET_PRODUCTS } from "./GraphQl/Queries";

const errorLink = onError((graphqlErrors, networkError) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message }) => {
      console.error("GraphQl error", message);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000" })]);
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: false,
      category: "all",
    };
  }
  fetchAllData = async (categoryName) => {
    const { data, loading, error } = await client.query({
      query: GET_ALL_DATA,
      variables: { categoryName },
    });

    console.log(
      "🚀 ~ file: PLP.jsx ~ line 25 ~ PLP ~ fetchProducts= ~ data, loading, error",
      data,
      loading,
      error
    );
    this.setState({ data, loading, error });
  };
  setCategory = (category) => {
    this.setState({ category });
  };

  componentDidMount() {
    this.fetchAllData({ title: this.state.category });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.category !== prevState.category) {
      this.fetchAllData({ title: this.state.category });
    }
  }
  render() {
    const { loading, error, data } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    if (data) {
      return (
        <ApolloProvider client={client}>
          <Nav
            categories={data.categories}
            currencies={data.currencies}
            setCategory={this.setCategory}
          />
          <PLP category={data.category} />
        </ApolloProvider>
      );
    }
  }
}
