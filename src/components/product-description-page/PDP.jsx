import React, { Component } from 'react'
import { apolloClient } from '../../App';
import { GET_PRODUCT } from '../../GraphQl/Queries';
import Loader from '../loader/Loader';
import "./pdp.css";
export default class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: "",
    };
  }
  // FUNCTIONS
  fetchProduct = async (productId) => {
       const { data, loading, error } = await apolloClient.query({
         query: GET_PRODUCT,
         variables : {productId}
       });
       console.log("🚀 ~ file: PDP.jsx ~ line 20 ~ PDP ~ fetchProduct= ~ data", data)

       this.setState({ data, loading, error });
  };
  // LIFE CYCLES
  componentDidMount() {
    const { id } = this.props;
    this.fetchProduct(id)
  }
  render() {
      const {data, loading, error} = this.state
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    /* Hello world*/
    if (data.length !== 0) {
      const {attributes, brand, description, gallery, insStock, name, prices} = data.product;
      return (
        <article className="product-grid-container">
          <div className="product__gallery-container">
            {gallery.map((photo,index) =>{
              return (<img key = {index} src = {photo} />)
            })}
            </div>
          <div className="product__selected-photo-container">
            <img
              className="product__selected-photo-container-img"
              src={gallery[0]}
              alt={name}
            />
          </div>
          <div className="product__details-container">
            <div className="product__details-container__title">
              <h2>{brand}</h2>
              <p>{name}</p>
              </div>
            <div className="product__details-container__attributes">2</div>
            <div className="product__details-container__price">3</div>
            <div className="product__details-container__call-to-action">4</div>
            <div className="product__details-container__description">5</div>
          </div>
        </article>
      );
    }
  }
  }

