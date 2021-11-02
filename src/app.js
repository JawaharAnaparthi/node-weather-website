const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup views location and handlebars engine
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jawahar P R Anaparthi'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'Please send a mail to abc@xyz.com for any quires.',
        title: 'Help',
        name: 'Jawahar P R Anaparthi'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Jawahar P R Anaparthi'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('pageNotFound', {
        title:'404',
        message: 'Help article not found.',
        name: 'Jawahar P R Anaparthi'
    })
})

app.get('*', (req, res)=>{
    res.render('pageNotFound', {
        title:'404',
        message: 'Page not found.',
        name: 'Jawahar P R Anaparthi'
    })
})


app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})