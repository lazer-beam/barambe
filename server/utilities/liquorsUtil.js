const getLiquors = drink => drink.getLiquors()

const mapLiquors = liquors => liquors.map(liquor => {
  return {
    name: liquor.dataValues.name,
    price: liquor.dataValues.price,
  }
})

module.exports = {
  getLiquors,
  mapLiquors,
}
