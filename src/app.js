const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Initialize Segment Analytics Client
var Analytics = require('analytics-node')
var analytics = new Analytics('')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', '/public')
const partialsPath = path.join(__dirname, '..', 'templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Larry June'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Larry June'
    })
    analytics.page({
        userId: 'lj123456',
        category: 'Weather App',
        name: 'About Page',
        properties: {
            url: 'http://localhost:3000/about',
            goat: 'Larry June'
        }

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a Help Page',
        name: 'Larry June',
        title: 'Help Page'
    })
})
app.get('/applypressure', (req,res) => {
    res.send('<h1>Apply Pressure</h1>')         // Send HTML
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, {latitude: lat, longitude: long, location} = {}) => {
        if (error) {
            return res.send({error})
        } 
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404 Page',
        name: 'Larry June',
        errorMessage: 'Help Article Not Found.'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Larry June',
        errorMessage: 'Page Not Found.'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

