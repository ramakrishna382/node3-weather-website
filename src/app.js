const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
//Define Path for Express Config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and custom views
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))
app.get('', (req,res) => {
    res.render('index', {
        title: "WeatherApp",
        name: "RK"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About',
        name: 'RK'
    } )
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'HELP',
        helpText:'You can ask any questions through this page and we will answer you.',
        name: 'RK'
    } )
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error:'You must provide address'})
    }

    geoCode( req.query.address ,( error, { Latitude, Longitude, Location } = { } ) => {
        if(error) return res.send({error})
        else{
            console.log(Latitude,Longitude)
            forecast(Latitude,Longitude, (err,forecastData) => {
                if(err) return res.send({error:err})
                else {
                    res.send({
                        forecast: forecastData,
                        location:Location,
                        address: req.query.address
                    })
                }
            })
        }
        })
})

app.get('/products', (req,res) => {
    console.log("body: ",req.query)
    if(!req.query.search){
        return res.send({error:'You must provide a search item'})
    }
    res.send({products:[]})
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title:'404',
        name: 'RK',
        error: 'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('error', {
        error: 'Page not found',
        title:'404',
        name: 'RK'
    })
})


app.listen(3000, () => {
    console.log('Server is up on Port 3000')
})