import "./App.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import React, { Component } from "react";
import PLP from "./components/PLP";

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
  render() {
    return <ApolloProvider client={client}>
          <PLP/>
      </ApolloProvider>;
  }
}
