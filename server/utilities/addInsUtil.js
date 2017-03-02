const getAddIns = drink => drink.getAddIns()

const mapAddIns = addIns => addIns.map(addIn => addIn.dataValues.name)

module.exports = {
  getAddIns,
  mapAddIns,
}
