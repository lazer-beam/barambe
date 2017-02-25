import axios from 'axios'
// ========================================
//            ACTIONS
// ========================================
export const types = {
  REMOVE_ORDER: 'BAR/REMOVE_ORDER',
  FETCH_ORDERS_START: 'BAR/FETCH_ORDERS_START',
  FETCH_ORDERS_COMPLETE: 'BAR/FETCH_ORDERS_COMPLETE',
  COMPLETE_TABLE_ORDERS: 'BAR/COMPLETE_TABLE_ORDERS',
  COMPLETE_PICKUP_ORDERS: 'BAR/COMPLETE_PICKUP_ORDERS',
  REMOVE_TAB_FROM_PENDING: 'BAR/REMOVE_TAB_FROM_PENDING',
  ADD_ORDER: 'BAR/ADD_ORDER',
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

const addOrderToUnfufilledOrders = (order, unfufilledOrders) => {
  let tabAlreadyExists = false
  const newUnfufilledOrders = unfufilledOrders.map(tab => {
    if (tab[0].tabId === order.tabId) {
      tabAlreadyExists = true
      return tab.concat(order)
    }
    return tab
  })

  if (!tabAlreadyExists) {
    newUnfufilledOrders.push([order])
  }

  return newUnfufilledOrders
}

// ========================================
//            REDUCERS
// ========================================
const defaultProps = {
  unfufilledOrders: [],
  fetchingOrders: false,
  fetchedOrders: false,
  donePickupOrders: [],
  doneTableOrders: [],
}

export default (state = defaultProps, action) => {
  switch (action.type) {
    case types.REMOVE_ORDER:
      return { ...state, unfufilledOrders: action.payload }
    case types.FETCH_ORDERS_START:
      return { ...state, fetchingOrders: true }
    case types.FETCH_ORDERS_COMPLETE:
      return { ...state, fetchingOrders: false, fetchedOrders: true, unfufilledOrders: action.payload }
    case types.ORDER_TO_COMPLETE:
      return { ...state, completingOrders: state.completingOrders.concat(action.payload) }
    case types.COMPLETE_PICKUP_ORDERS:
      return { ...state, donePickupOrders: state.donePickupOrders.concat(action.payload) }
    case types.COMPLETE_TABLE_ORDERS:
      return { ...state, doneTableOrders: state.doneTableOrders.concat(action.payload) }
    case types.REMOVE_TAB_FROM_PENDING:
      return { ...state, unfufilledOrders: action.payload }
    case types.ADD_ORDER:
      return { ...state, unfufilledOrders: addOrderToUnfufilledOrders(action.payload, state.unfufilledOrders) }
    default:
      return state
  }
}


// ========================================
//           ACTION CREATORS
// ========================================
export const actions = {
  resetOrders: tab => ({ type: types.REMOVE_ORDER, payload: tab }),
  fetchOrders: () => {
    return dispatch => {
      dispatch({ type: types.FETCH_ORDERS_START })
      return axios.get('/orders/getallpending')
        .then(orders => {
          return dispatch({ type: types.FETCH_ORDERS_COMPLETE, payload: groupOrdersWithTab(orders.data) })
        })
    }
  },
  addOrder: order => ({ type: types.ADD_ORDER, payload: order }),
  setDonePickupOrders: tab => ({ type: types.COMPLETE_PICKUP_ORDERS, payload: tab }),
  setDoneTableOrders: tab => ({ type: types.COMPLETE_TABLE_ORDERS, payload: tab }),
  resetRemainingTabs: remainingTabs => ({ type: types.REMOVE_TAB_FROM_PENDING, payload: remainingTabs }),
}
