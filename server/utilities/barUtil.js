const bars = [{
  name: 'yuriysbar',
  orders: ['order1', 'order2'],
}, {
  name: 'andrewsbar',
  orders: [],
}]

const getBar = name => bars.filter(bar => bar.name === name)[0]

module.exports = {
  getBar,
}
