import React, { Component } from "react";
// import {useParams}  from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Category, Error, Nav, PDP } from "./components";
import ProductContext from "./ProductContext";
import "./normalize.css";
import "./app.css";

// APOLLO INITIALIZATION
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
const errorLink = onError((graphqlErrors, networkError) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message }) => {
      console.error("GraphQl error", message);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000" })]);
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
// END APOLLO INITIALIZATION

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "all",
      currency: { label: "USD", symbol: "$" },
    };
  }
  setCategory = (category) => {
    this.setState({ category });
  };
  setCurrency = (currency) => {
    this.setState({ currency });
  };
  render() {
    const { category, currency } = this.state;
    const { setCategory, setCurrency } = this; //* can't use this inside {}
    return (
      <ApolloProvider client={apolloClient}>
        <ProductContext.Provider
          value={{ category, currency, setCategory, setCurrency }}
        >
          <Router>
            <Nav />
            <Switch>
              <Route exact path="/" children={<Category />} />
              <Route
                path="/product/:id"
                render={(props) => <PDP id={props.match.params.id} />}
              />
              <Route path="*" children={<Error />} />
            </Switch>
          </Router>
        </ProductContext.Provider>
      </ApolloProvider>
    );
  }
}
