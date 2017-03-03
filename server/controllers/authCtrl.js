const authUtil = require('../utilities/authUtil')
const co = require('co')

const onError = err => console.log(err)

module.exports.default = (req, res) => {  // this is the auth token info: req.user
  res.status(200).send('Hello Auth!')
}

module.exports.setBarUsername = (req, res) => {
  const id = req.user.sub.slice(req.user.sub.indexOf('|') + 1)
  const barname = req.body.barName
  co(function* () {
    const bars = yield authUtil.checkBars(barname)
    if (bars !== '[]') {
      res.status(422).send('Name Already Taken')
    } else {
      const name = yield authUtil.addBarUniqueName(id, barname)
      res.status(200).send(name)
    }
  }).catch(onError)
}

module.exports.setUserMetadata = (req, res) => {
  const id = req.user.sub.slice(req.user.sub.indexOf('|') + 1)
  console.log(req.body)
  const metadata = req.body

  authUtil.editUserMetadata(id, metadata).then(mData => {
    res.status(200).send(mData)
  }).catch(err => {
    res.status(404).send(err)
  })
}

module.exports.setAppMetadata = (req, res) => {
  const id = req.user.sub.slice(req.user.sub.indexOf('|') + 1)
  console.log(req.body)
  const metadata = req.body

  authUtil.editUserMetadata(id, metadata).then(mData => {
    res.status(200).send(mData)
  }).catch(err => {
    res.status(404).send(err)
  })
}
