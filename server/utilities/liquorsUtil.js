const getLiquors = drink => drink.getLiquors()

const mapLiquors = liquors => liquors.map(liquor => liquor.dataValues.name)

module.exports = {
  getLiquors,
  mapLiquors,
}
