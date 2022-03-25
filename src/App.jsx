import React, { Component } from "react";
// import {useParams}  from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Cart, Category, Error, Nav, PDP } from "./components";
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
      cart : {}
    };
  }
  // FUNCTIONS
  setCategory = (category) => {
    this.setState({ category });
  };
  setCurrency = (currency) => {
    this.setState({ currency });
  };
  createCartId = (productAttributeArray) =>{
    return JSON.stringify(productAttributeArray);
  }
  getPriceBasedOnCurrency = (prices) =>{
    return prices.find((price) => price.currency.symbol === this.state.currency.symbol);
  }
  setCart = (productObj)=>{
    console.log(productObj)
     const {
       id,
       selectedAttributes,
     } = productObj;
     const productCartId = this.createCartId(selectedAttributes);
      const {cart} = this.state;
      if(cart.hasOwnProperty(id)){
        if(cart[id].hasOwnProperty(productCartId)){
          cart[id][productCartId].quantity++;
        }
        else{
        cart[id][productCartId] = productObj;
        }
      }
      else{
        cart[id] = {};
        cart[id][productCartId] = productObj;
      }
      this.setState({cart})
      // console.log("🚀 ~ file: App.jsx ~ line 72 ~ App ~ cart", cart)
  }
  // LIFE CYCLES
  render() {
    const { category, currency,cart } = this.state;
    const { setCategory, setCurrency, setCart, getPriceBasedOnCurrency } = this; //* can't use this inside {}
    return (
      <ApolloProvider client={apolloClient}>
        <ProductContext.Provider
          value={{
            category,
            currency,
            setCategory,
            setCurrency,
            setCart,
            getPriceBasedOnCurrency,
            cart
          }}
        >
          <Router>
            <Nav />
            <Switch>
              <Route exact path="/" children={<Category />} />
              <Route
                path="/product/:id"
                render={(props) => <PDP id={props.match.params.id} />}
              />
              <Route path="/cart" children={<Cart />} />
              <Route path="*" children={<Error />} />
            </Switch>
          </Router>
        </ProductContext.Provider>
      </ApolloProvider>
    );
  }
}
