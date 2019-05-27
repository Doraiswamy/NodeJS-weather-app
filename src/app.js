const request = require('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Nachiketh Doraiswamy'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Nachiketh Doraiswamy'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Nachiketh Doraiswamy'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.Address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {

        geocode(req.query.Address, (error, { latitude, longitude, location } = {}) =>{
            if (error) {
                return res.send({
                    error: 'Unable to provide location. Please try another search'
                })
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({
                            error: 'Unable to provide location. Please try another search'
                        })
                    } else {
                        res.send({
                            forecast: forecastData,
                            location,
                            address: req.query.Address
                        })
                    }
                  })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.type) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else {
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('Help',{
        title: '404',
        name: 'Nachiketh',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nachiketh',
        errorMessage: 'Page not found'

    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000')
})