import React, { Component } from "react";
// import {useParams}  from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import { Category, Error, PDP } from "./components";
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
  render() {
    //    const Wrapper = (props) => {
    //      const {id} = useParams();
    //      return (
    //        <PDP id = {id}
    //        />
    //      );
    //    };
    // ! NEED TO USE A WRAPPER WITH USEPARAMS IF REACT-ROUTER V6 IS USED
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <Route exact path="/" children={<Category />} />
            <Route
              path="/product/:id"
              render={(props) => <PDP id={props.match.params.id} />}
            />
            <Route path="*" children={<Error />} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}
