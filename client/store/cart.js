/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

/**
 //* ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const UPDATED_CART = 'UPDATED_CART'
const SUBMITTED_ORDER = 'SUBMITTED_ORDER'
const REMOVE_CART = 'REMOVE_CART'
// const CREATED_CART = 'CREATED_CART'

/**
 //* ACTION CREATORS
 */
export const gotCart = cart => ({type: GOT_CART, cart})
export const addedToCart = mask => ({type: ADDED_TO_CART, mask})
export const updatedCart = (maskId, cart) => ({
  type: UPDATED_CART,
  maskId,
  cart
})
export const submittedOrder = cart => ({type: SUBMITTED_ORDER, cart})
export const removeCart = cart => ({type: REMOVE_CART, cart})
// export const createdCart = cart => ({type: CREATED_CART, cart})

/**
 //* THUNK CREATORS
 */
export const getCart = userId => {
  return async dispatch => {
    try {
      if (userId !== 0) {
        const {data} = await axios.get(`/api/cart/${userId}`)
        dispatch(gotCart(data))
      } else {
        //TODO: if user is not logged in, create user ("isGuest = true"), create cart
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
      dispatch(addedToCart({...mask, ...cart}))
      // dispatch(gotCart(userId))
      // history.push('/cart')
    } catch (error) {
      console.log('Whoops, trouble adding to cart!', error)
    }
  }
}
export const updateCart = (orderId, maskId, update) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/cart/${orderId}/update/${maskId}`,
        update
      )
      dispatch(updatedCart(maskId, data))
    } catch (error) {
      console.log('Whoops, trouble updating your cart!', error)
    }
  }
}

// export const createCart = userId => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.post(`/api/cart/${userId}`)
//       dispatch(createdCart(data))
//       console.log('DATA IN CREATECART THUNK -->', data)
//     } catch (error) {
//       console.log('Something went wrong in createCart Thunk', error)
//     }
//   }
// }

export const submitOrder = userId => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/${userId}/submit`)
      // await dispatch(createCart(userId))
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
  subtotal: 0,
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
      return {
        ...state,
        masks: [...state.masks, action.mask],
        subtotal: 999999999999,
        loading: false
      }
    case UPDATED_CART:
      return {
        ...state,
        masks: state.masks.map(mask => {
          if (mask.id === action.maskId) {
            mask.cart = action.cart
          }
          return mask
        }),
        loading: false
      }
    case REMOVE_CART:
      return initialState
    default:
      return state
  }
}
