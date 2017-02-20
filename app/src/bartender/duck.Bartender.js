import axios from 'axios'
// ========================================
//            ACTIONS
// ========================================
export const types = {
  REMOVE_ORDER: 'BAR/REMOVE_ORDER',
  FETCH_ORDERS_START: 'BAR/FETCH_ORDERS_START',
  FETCH_ORDERS_COMPLETE: 'BAR/FETCH_ORDERS_COMPLETE',
}

// ========================================
//            REDUCERS
// ========================================
const defaultProps = {
  unfufilledOrders: [],
  fetchingOrders: false,
  fetchedOrders: false,
}

export default (state = defaultProps, action) => {
  console.log('action', action)
  switch (action.type) {
    case types.REMOVE_ORDER:
      return { ...state, unfufilledOrders: action.payload }
    case types.FETCH_ORDERS_START:
      return { ...state, fetchingOrders: true }
    case types.FETCH_ORDERS_COMPLETE:
      return { ...state, fetchingOrders: false, fetchedOrders: true, unfufilledOrders: action.payload }
    default:
      return state
  }
}

// ========================================
//            SELECTORS
// ========================================

const formatOrders = orders => {
  const formattedOrders = []
  console.log('orders tab ids', orders.map(order => order.tabId))
  while (orders.length) {
    formattedOrders.push([orders.shift()])
    let i = 0
    while (i < orders.length) {
      if (formattedOrders[formattedOrders.length - 1][0].tabId === orders[i].tabId) {
        console.log('TRUEEEEEEEEE')
        formattedOrders[formattedOrders.length - 1].push(orders[i])
      }
      i++
    }
  }

  return formattedOrders
}

// ========================================
//           ACTION CREATORS
// ========================================
export const actions = {
  removeOrder: orders => ({ type: types.REMOVE_ORDER, payload: orders }),
  fetchOrders: () => {
    return dispatch => {
      dispatch({ type: types.FETCH_ORDERS_START })
      return axios.get('/orders/getallpending')
        .then(orders => {
          return dispatch({ type: types.FETCH_ORDERS_COMPLETE, payload: formatOrders(orders.data) })
        })
    }
  },
}
