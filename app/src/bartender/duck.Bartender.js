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
  completingOrders: ['test'],
}

export default (state = defaultProps, action) => {
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

const groupOrdersWithTab = orders => {
  const formattedTabs = []
  while (orders.length) {
    formattedTabs.push([orders.shift()])
    let i = 0
    while (i < orders.length) {
      if (formattedTabs[formattedTabs.length - 1][0].tabId === orders[i].tabId) {
        formattedTabs[formattedTabs.length - 1].push(orders[i])
        orders = orders.slice(0, i).concat(orders.slice(i + 1))
      }
      i++
    }
  }

  return formattedTabs
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
          return dispatch({ type: types.FETCH_ORDERS_COMPLETE, payload: groupOrdersWithTab(orders.data) })
        })
    }
  },
}
