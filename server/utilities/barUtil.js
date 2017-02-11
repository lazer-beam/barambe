var bars = [{
  name: 'yuriysbar',
  orders: [
    'order1', 'order2'
  ]
}, {
  name: 'andrewsbar',
  orders: []
}]

var getBar = name => {
  return bars.filter(bar => bar.name === name)[0];
}

module.exports = {
  getBar: getBar
}