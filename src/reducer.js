export const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    // case 'INCREASE_AMOUNT':
    //   let tempCart = state.cart.map((item) => {
    //     if (item.id === action.payload) {
    //       return { ...item, amount: item.amount + 1 }
    //     }
    //     return item
    //   })
    //   return {
    //     ...state,
    //     cart: tempCart,
    //   }
    // case 'DECREASE_AMOUNT':
    //   let newCart = state.cart
    //     .map((item) => {
    //       if (item.id === action.payload) {
    //         return { ...item, amount: item.amount - 1 }
    //       }
    //       return item
    //     })
    //     .filter((item) => item.amount > 0)
    //   return {
    //     ...state,
    //     cart: newCart,
    //   }
    case 'TOGGLE_AMOUNT':
      const { id, type } = action.payload
      let tempCart2 = state.cart
        .map((item) => {
          if (item.id === id) {
            if (type === 'plus') {
              return { ...item, amount: item.amount + 1 }
            }
            if (type === 'minus') {
              return { ...item, amount: item.amount - 1 }
            }
          }
          return item
        })
        .filter((item) => item.amount > 0)

      return {
        ...state,
        cart: tempCart2,
      }
    case 'GET_TOTALS':
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem
          cartTotal.total += price * amount
          cartTotal.amount += amount
          return cartTotal
        },
        { total: 0, amount: 0 }
      )
      // solution but writes 6699,90 as 6699,9 because it is parsed to float
      total = parseFloat(total.toFixed(2))
      // writes it correctly but as a string
      // total = total.toFixed(2)
      return {
        ...state,
        total,
        amount,
      }
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'DISPLAY_ITEMS':
      return {
        ...state,
        loading: false,
        cart: action.payload,
      }
    default:
      throw new Error('No matching action type')
  }

  // if (action.type === 'CLEAR_CART') {
  //   return {
  //     ...state,
  //     loading: false,
  //     cart: [],
  //     total: 0,
  //     amount: 0,
  //   }
  // }
  // throw new Error('No matching action type')
}

export default reducer
