const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

//define paths for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory served
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {

    res.render('index', {

        title:  'Weather',
        name: 'Jeff Lee'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {

        title: 'About Me',
        name: 'Jeff Lee'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {

        title: 'Weather App Help',
        helpMessage: 'Sorry, no help is available yet',
        name: 'Jeff Lee'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({

            error: 'You must provide an address'

        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{

    if (error) { 
        return res.send({

            error: 'There has been an error fetching the geocode'
    
         })
       }
    
    

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {

            return res.send({

                error: 'There has been an error fetching the forecast'
        
             })
        }
    

    res.send({
        address: req.query.address,
        location: location,
        forecast: forecastData
    })
   })
  })
})

app.get('/products', (req, res)=> {
    if(!req.query.search) {
        return res.send({

            error: 'You must provide a search term'

        })

    }
    
    console.log(req.query)
    res.send({

        products: []
    })
})

app.get('/help/*', (req, res) => {

    res.render('error', {

        title: 'Weather App Help',
        errorMessage: 'Sorry, help article not found',
        name: 'Jeff Lee'
    })
})

app.get('*', (req, res)=> {

    res.render('error', {

        title: 'Weather App Help',
        errorMessage: 'Sorry, page not found',
        name: 'Jeff Lee'
    })

})

app.listen(port, () => {

console.log('Server is up on port ' + port)
})