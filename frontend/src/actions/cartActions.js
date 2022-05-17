import axios from 'axios';
import {
  CART_REMOVE_ITEM,
  CART_ADD_ITEM
} from '../constants/cartConstants';


// getState allows us to get anything from store combine reducer tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty
    }
  })

  // save to LS
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

