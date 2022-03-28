import React, { Component } from "react";
// import {useParams}  from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Cart, Category, Error, MiniCart, Nav, PDP } from "./components";
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
      cart: {},
      isCartOpen: false,
    };
  }
  // FUNCTIONS
  setCategory = (category) => {
    this.setState({ category });
  };
  setCurrency = (currency) => {
    this.setState({ currency });
  };
  createCartId = (productAttributeArray) => {
    return JSON.stringify(productAttributeArray);
  };
  getPriceBasedOnCurrency = (prices) => {
    return prices.find(
      (price) => price.currency.symbol === this.state.currency.symbol
    );
  };
  setCart = (productObj) => {
    const { id, selectedAttributes } = productObj;
    const productCartId = this.createCartId(selectedAttributes);
    const { cart } = this.state;
    if (cart.hasOwnProperty(id)) {
      if (cart[id].hasOwnProperty(productCartId)) {
        cart[id][productCartId].quantity++;
      } else {
        cart[id][productCartId] = productObj;
      }
    } else {
      cart[id] = {};
      cart[id][productCartId] = productObj;
    }
    this.setState({ cart });
    localStorage.setItem("cart",JSON.stringify(cart));
    // console.log("🚀 ~ file: App.jsx ~ line 72 ~ App ~ cart", cart)
  };

  handleIncrement = (parentId, childId) => {
    const { cart } = this.state;
    cart[parentId][childId].quantity++;
    this.setState({ cart: cart });
    localStorage.setItem("cart", JSON.stringify(cart));

  };

  handleDecrement = (parentId, childId) => {
    const { cart } = this.state;
    cart[parentId][childId].quantity--;
    if (cart[parentId][childId].quantity === 0) {
      delete cart[parentId][childId];
    }
    this.setState({ cart: cart });
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  toggleCart = (e) => {
    if (e.currentTarget === e.target) {
      const newValue = !this.state.isCartOpen;
      this.setState({ isCartOpen: newValue });
    }
  };
  getCartItemCount = ()=>{
    const {cart} = this.state;
    let totalQuantity = 0;
    for (const [parentId, mainProduct] of Object.entries(cart)) {
        for (const [childId, specificProduct] of Object.entries(mainProduct)) {
          const {
            quantity,
          } = specificProduct;
          totalQuantity += quantity;          
        }
      }
      return totalQuantity;
    }

  // LIFE CYCLES
  componentDidMount(){
    let cart = localStorage.getItem("cart");
    if(cart){
      cart = JSON.parse(cart);
      this.setState({cart});
    }

  }

  render() {
    const { category, currency, cart, isCartOpen } = this.state;
    const {
      setCategory,
      setCurrency,
      setCart,
      getPriceBasedOnCurrency,
      handleIncrement,
      handleDecrement,
      toggleCart,
      getCartItemCount,
    } = this; //* can't use this inside {}
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
            cart,
            handleIncrement,
            handleDecrement,
            toggleCart,
            isCartOpen,
            getCartItemCount,
          }}
        >
          <Router>
            <Nav />
            <MiniCart {...isCartOpen} />
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
