import  path,{ dirname}  from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import hbs from 'hbs'

import geoCode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const viewsPath = path.join(__dirname, './../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static('public'))

app.get('/', async (req, res)=> {
    res.render('index', { 
        title: `weather`,
        name: `Famojuro Adeniyi`
    })
})

app.get('/about', async (req, res)=> {
    res.render('about', {
        title: `About me`,
        name: `Famojuro`    
    })
})

app.get('/help', async (req, res)=> {
    res.render('help', {
        title: `Help`,
        name: `Famojuro`,
        message: `Some useful text`
    })
})
app.get('/weather', async (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
             error: 'Address must be provided'
         })
     }

    geoCode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
            return res.send({error});
            }

           res.send({forecast: forecastData,
            location: location,
            address})
        });
    })
})

app.get('/products', async (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', async (req, res)=> {
   res.render('404', {
       title: `404`,
       name: `Famojuro`,
       errorMessage: 'Help article not found'
   })
})

app.get('*', async (req, res)=> {
    res.render('404', {
        title: `404`,
        name: `Famojuro`,
        errorMessage: `Page not found`
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})