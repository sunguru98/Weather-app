const axios = require('axios')

const MAPBOX_API_KEY = 'pk.eyJ1Ijoic3VuZ3VydTk4IiwiYSI6ImNqdnUyM3AycjNnOGg0OXBiYmxmNDR6eTkifQ.YS380Sg1jrdPT-S5Qw4UgQ'
const mapBoxEndPointAddress = 'https://api.mapbox.com'

const getGeocode = (searchQuery) => {
  return new Promise ((resolve, reject) => {
    axios.get(`${mapBoxEndPointAddress}/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`, {
      params: {
        access_token: MAPBOX_API_KEY,
        limit: 1
      }
    })
    .then(response => {
      if (response.data.features.length > 0) {
        resolve({
          longitude: response.data.features[0].center[0],
          latitude: response.data.features[0].center[1],
          location: response.data.features[0].place_name
        })
      } else {
        reject(`No results for ${searchQuery}`)
      }
    })
    .catch(err => {
      if (err.code === 'ENOTFOUND') {
        reject('There seems to be a problem with your internet connection. Please try again.')
      } else {
        reject(`Unable to fetch location. Please try again.`)
      }
    })
  })
}
module.exports = getGeocode