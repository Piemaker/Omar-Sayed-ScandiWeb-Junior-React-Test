import React, { Component } from "react";
import { GET_CATEGORIES_NAME } from "../GraphQl/Queries";
import {client} from "../App"
export default class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: false,
    };
  }
  fetchCategory = async () => {
    const { data, loading, error } = await client.query({
      query: GET_CATEGORIES_NAME,
    });
    // console.log("🚀 ~ file: PLP.jsx ~ line 18 ~ PLP ~ fetchCategory= ~ data, loading, error", data, loading, error)
    this.setState({ data, loading, error });
  };

  componentDidMount() {
    this.fetchCategory();
  }
  render() {
    const { loading, error, data } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    if (data.categories) {
      return data.categories.map((category,index) => {
        return <div key = {index}>{category.name}</div>;
      });
    }
  }

}   
