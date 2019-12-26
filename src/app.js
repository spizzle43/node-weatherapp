//type nodemon src/app.js -e js,hbs

const path = require('path') 
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//partials allow you to create a little template which is part of a bigger web page

const app = express()

//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')  //will manipulate the string for you to get the right file path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //takes a path to the directory where the partials live

app.use(express.static(publicDirectory)) //its a way to customize your server. it is a static directory

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Kain'
    }) //name of file

})// to serve the index.hbs file

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Kain'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page.',
        name: 'Kain'
    })
})

//allows you to configure what the server should do when someone tries to get the resource at a specfic URL 
//takes in 2 arguments. route and the function. 
//the function takes in the object containing information about the incoming request to the server and..
//the second is the response. This contains a bunch of methods allowing you to customize what you will send back to the requester

app.get('/weather',(req,res) => {
   if(!req.query.address){
       return res.send({
           error: 'You need to provide an address'
       })
   }

   geocode(req.query.address, (error, {latitude, longitude, location} ={}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
   })

    
})

app.get('/products', (req,res)=>{
  if(!req.query.search){
   return  res.send({
        error: 'You must provide a search term'
    })
  }
    console.log(req.query)
    res.send({
        productsL :[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Kain',
        errorMessage: 'Help article not found'
    })
})

//matches anything that hasnt been matched before
app.get('*', (req,res) =>{
    res.render('404', {
        title: '404',
        name: 'Kain',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')

})