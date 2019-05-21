
console.log('Initializing')

const searchForm = document.querySelector('#searchForm')
const searchQuery = document.querySelector('#searchQuery')
const errorMessage = document.querySelector('.error-message')
const forecastMessage = document.querySelector('.forecast')
const locationMessage = document.querySelector('.location')

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  errorMessage.textContent = ''
  forecastMessage.textContent = ''
  locationMessage.textContent = ''
  fetchWeather(searchQuery.value)
  searchQuery.value = ''
  searchQuery.focus()
})

const fetchWeather = (searchQuery) => {
  fetch(`http://localhost:9998/weather?address=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        errorMessage.textContent = data.error
      } else {
        forecastMessage.textContent = data.forecast
        locationMessage.textContent = data.location
      }
    })
    .catch(err => errorMessage.textContent = err.error)
}
