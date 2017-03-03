import auth0 from 'auth0-js'

console.log('process.env', process.env)
const authManager = auth0.Management({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
})

export const patchBartenderMetadata = (barInfo, userId) => {
  const userMetadata = {
    businessInfo: {
      fullName: barInfo.fullName,
      businessName: barInfo.businessName,
      address: barInfo.address,
      city: barInfo.city,
      state: barInfo.state,
    },
    location: { locationInfo: { latitude: barInfo.latitude, longitude: barInfo.longitude } },
  }
  return authManager.patchUserMetadata(userId, userMetadata)
}

export const checkForBarNameCollisions = barname => {
  // this will be used for adding bar username
  console.log(barname)
}
