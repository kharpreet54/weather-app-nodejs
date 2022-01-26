const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port =process.env.PORT || 3000
app.use(express.static(path.join(__dirname,'../public')))


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates1/views'))

hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Harpreet Kaur' 
    })
})

app.get('/about', (req,res) =>{
    //res.send('<h1>About express</h1>')
    res.render('about', {
        title : 'About',
        name : 'Harpreet'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        message : 'This is help page',
        contact: 12345678,
        name : 'HK'
    })
})
app.get('/weather', (req,res) => {
   if(!req.query.address) {
       return res.send({
           error : 'Please provide address'
       })
       
   }
   geocode(req.query.address, (error,{longitude, latitude}= {}) =>{
       if(error) {
           return res.send('unable to fetch coordinates')
       }
       forecast(longitude,latitude,(error,data) =>{
           if(error) {
               return res.send('unable to fetch forecast information')
           }
           res.send({
               forecast: data.forecast,
               location: req.query.address
           })
       })
   })
//    res.send({
//        forecast : 'cloudy',
//        address : req.query.address
//    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title : 'Help article not found',
        name : 'Harpreet'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
       return res.send({
            error : 'Please provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : [] 
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title : 'Page not found',
        name : 'HK'
    })
})
app.listen(port,() =>{
    console.log('Server is running at port '+port)
})