const getAddIns = drink => drink.getAddIns()

const mapAddIns = addIns => addIns.map(addIn => {
  return {
    name: addIn.dataValues.name,
    price: addIn.dataValues.price,
  }
})

module.exports = {
  getAddIns,
  mapAddIns,
}
