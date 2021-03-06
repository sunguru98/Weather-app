const path = require('path')
const express = require('express')
const hbs = require('hbs')

// PORT FOR HEROKU
const port = process.env.PORT || 9998

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// Setting view engine
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

// Handlebars registering partials
hbs.registerPartials(path.join(__dirname, '../views/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Welcome to the app',
    title: 'Home',
    url: req.originalUrl
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    url: req.originalUrl
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    url: req.originalUrl
  })
})

app.get('/weather', (req, res) => {
  if (req.query.address) {
    const searchQuery = req.query.address
    // Fetch latitude and longitude
    return geocode(searchQuery)
    .then(({ latitude, longitude, location }) => {
      // Fetch forecast with the received latitude and longitude.
      weather(latitude, longitude)
        // Successful received data sending
        .then(response => res.send({ forecast: response, location, address: searchQuery }))
        .catch(error => res.status(404).send({ error }))
    })
    .catch(error => res.status(404).send({ error }))
  } 
  res.status(404).send({
    error: 'No address given'
  })
})

app.get('/help/*', (req, res) => {
  res.render('pagenotfound', {
    message: 'Help article not found',
    title: '404 - Not found'
  })
})

app.get('*', (req, res) => {
  res.render('pagenotfound', {
    message: 'Page not found',
    title: '404 - Not found'
  })
})

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})