import React, { Component } from "react";
import { PLP, Loader } from "..";
import { apolloClient } from "../../App";
import { GET_CATEGORY } from "../../GraphQl/Queries";
import ProductContext from "../../ProductContext";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: false,
      category: "all",
    };
  }
  // FUNCTIONS

  fetchCategory = async (category) => {
    const { data, loading, error } = await apolloClient.query({
      query: GET_CATEGORY,
      variables: { category },
    });

    this.setState({ data, loading, error, category: this.context.category });
    // console.log("🚀 ~ file: Category.jsx ~ line 28 ~ Category ~ fetchCategory= ~ data", data)
  };

  // LIFE CYCLES
  componentDidMount() {
    this.fetchCategory({ title: this.context.category });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.category !== this.state.category) {
      this.fetchCategory({ title: this.context.category });
    }
  }
  render() {
    const { loading, error, data } = this.state;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    if (data) {
      return <PLP category={data.category} />;
    }
  }
}
Category.contextType = ProductContext;
