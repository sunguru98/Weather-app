const axios = require('axios')

const DARK_SKY_API_KEY = '812f6d4e1bf4951f606fef14aef85036'
const darkSkyEndPointAddress = 'https://api.darksky.net'

const getWeather = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    axios.get(`${darkSkyEndPointAddress}/forecast/${DARK_SKY_API_KEY}/${latitude},${longitude}`, {
      params: { units: 'si', exclude: 'minutely,hourly' }
    })
    .then(response => {
      resolve(`${response.data.daily.data[0].summary} It is currently ${response.data.currently.temperature} degrees out. There is ${response.data.currently.precipProbability*100}% chance of rain`)
    })
    .catch(err => {
      if (err.code === 'ENOTFOUND') {
        reject('There seems to be a problem with your internet connection. Please try again.')
      } else if (err.response.data.code === 400) {
        reject(err.response.data.error)
      } else {
        reject('Unable to fetch weather information. Please try again.')
      }
    })
  })
}

module.exports = getWeather