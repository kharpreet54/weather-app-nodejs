const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//expressjs.com
const express = require('express')
//const forecast = require('../../weather-app/utils/forecast')

const application =express()
console.log(__dirname)
console.log(path.join(__dirname,'../public'))

 //this always loads from public folder
//to serve public folder, exposing this directory static assets
//setup static directory to serve
application.use(express.static(path.join(__dirname,'../public')))
const hbsDir = path.join(__dirname,'../templates/views')
//partials are use for common components in pages like header footer
const partialsDir = path.join(__dirname,'../templates/partials')

//to tell express whjich templating engine we installed
//It needs views directory under root by default, we can customise path by explicitly setting path
application.set('view engine', 'hbs') //it needs content to be in views folder

//set custom directory other than views 
application.set('views',hbsDir)

hbs.registerPartials(partialsDir)

//render for hbs files
application.get('',(req,res) => {
    res.render('index', {
        title : 'Index title',
        name: 'Index name'
    })
 })

 application.get('/about',(req,res) => {
    res.render('about', {
        title : 'About title',
        name: 'About name'
    })
 })

 application.get('/help',(req,res) => {
    res.render('help', {
        title : 'Help title',
        name: 'Help name'
    })
 })



//render static html files
// application.get('',(req,res) => {
//    res.send('<h1>Home Page</h1>')
// })

// application.get('/help',(req,res) => {
//     res.send({
//         name :'Harpreet',
//         location: 'Noida'
//     })
// })

// application.get('/about',(req,res) =>{
//     res.send('<h2>About page</h2>')
// })
// application.get('/weather',(req,res) =>{
//    res.send([{
//         forecast: 'rain',
//         location: 'US'
//     },{
//     forecast: 'rain',
//     location: 'US'
//     }
// ])
// })

application.get('/products',(req,res) => {
    if(!req.query.search) {
         return res.send('Please select product to search')
    }
    res.send({
        products : []
    })
})

application.get('/weather',(req,res) =>{
    if(!req.query.address) {
        return res.send('Please select address')
    }
    geocode(req.query.address, (error, {longitude,latitude,location} = {}) =>{
        if(error) {
            return res.send('unable to find location')
        }
        forecast(longitude,latitude,(error,{forecast}={}) =>{
            res.send([{
                address : req.query.address,
               location: location,
               forecast
            }])
        })
    })
  

})

application.get('/help/*',(req,res) => {
    res.render('error',{
        name:'error.hbs',
        title:'error title',
        message : 'Help article not found'
    })
})


application.get('*',(req,res) => {
    res.render('error',{
        name:'error.hbs',
        
        message : 'Page not found'
    })
})

application.listen(3000)