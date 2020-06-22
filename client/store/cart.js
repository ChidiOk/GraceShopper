import axios from 'axios'
import history from '../history'

/**
 //* ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
// const UPDATED_CART = 'UPDATED_CART'
const SUBMITTED_ORDER = 'SUBMITTED_ORDER'
const REMOVE_CART = 'REMOVE_CART'

/**
 //* ACTION CREATORS
 */
export const gotCart = cart => ({type: GOT_CART, cart})
export const addedToCart = mask => ({type: ADDED_TO_CART, mask})
// export const updatedCart = (cart) => ({type: UPDATED_CART, cart})
export const submittedOrder = cart => ({type: SUBMITTED_ORDER, cart})
export const removeCart = cart => ({type: REMOVE_CART, cart})

/**
 //* THUNK CREATORS
 */
export const getCart = userId => {
  return async dispatch => {
    try {
      //TODO: create route - all masks connected to userId with status "inCart"
      if (userId !== 0) {
        const {data} = await axios.get(`/api/cart/${userId}`)
        console.log('getCart thunk data: ', data)
        dispatch(gotCart(data))
      } else {
        console.log('Create a guest user & cart!')
      }
    } catch (error) {
      console.log('Whoops, trouble fetching desired cart!', error)
    }
  }
}
export const addToCart = (userId, mask) => {
  return async dispatch => {
    try {
      const {cart} = await axios.post(
        `/api/cart/${userId}/addToCart/${mask.id}`
      )
      console.log('Add to cart DATA: ', cart)
      // console.log("Mask + cart DATA: ", {...mask, ...cart[0]})
      // dispatch(addedToCart({...mask, ...cart[0]}))
      dispatch(addedToCart({...mask, ...cart}))
      // history.push('/cart')
    } catch (error) {
      console.log('Whoops, trouble adding to cart!', error)
    }
  }
}
export const updateCart = (userId, update) => {
  return async dispatch => {
    try {
      //TODO: create route - all "orders" (in Order table) connected to userId with status "inCart" => change status to "purchased"
      // const {data} = await axios.put(`/api/cart/${userId}/update`, cart)
      // for (let i = 0; )
      const {data} = await axios.post(`/api/cart/${userId}/update`, update)
      // dispatch(updatedCart(data))
      dispatch(gotCart(data))
    } catch (error) {
      console.log('Whoops, trouble updating your cart!', error)
    }
  }
}
export const submitOrder = userId => {
  return async dispatch => {
    try {
      //TODO: create route - all "orders" (in Order table) connected to userId with status "inCart" => change status to "purchased"
      await axios.put(`/api/cart/${userId}/submit`)
      // dispatch(submittedOrder(data))
      await dispatch(getCart(userId))
      await dispatch(removeCart())
      //TODO: page with "Thank you your order was submitted!"

      // history.push('/thanks')
    } catch (error) {
      console.log('Whoops, trouble submitting order or redirecting!', error)
    }
  }
}

/**
 //* INITIAL STATE
 */
const initialState = {
  masks: [],
  loading: true
}

/**
 //* REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, ...action.cart, loading: false}
    case ADDED_TO_CART:
      return {...state, masks: [...state.masks, action.mask], loading: false}
    // case UPDATED_CART:
    //     return {...state, ...action.cart, loading: false}
    case REMOVE_CART:
      return initialState
    default:
      return state
  }
}
