const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../pulic'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('/help', (req, res)=>{
  res.render('help', {
    name: 'Afton',
    title: 'Help'
  })
})


app.get('/about', (req, res)=>{
  res.render('about', {
    title: 'About me',
    name: 'Afton'
  })
})


app.get('', (req, res)=>{
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew'
  })
})


app.get('/weather', (req, res)=>{
  if(!req.query.adress){
    return res.send({
      error: 'You must provide an adress.'
    })
  }

  geocode(req.query.adress,(error, {latitude, longitude, location} = {})=>{
    if(error){
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData)=>{
      if (error){
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.adress
      })
    })
  })

})



app.get('/products', (req, res)=>{
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    product: []
  })
})




app.get('/help/*', (req, res)=>{
  res.render('error', {
    title: '404 Help',
    name: 'Afton',
    help: 'Help article not found'
  })
})


app.get('*', (req, res)=>{
  res.render('error', {
    title: '404',
    help: '404 error',
    name: 'Afton'
  })
})


app.listen(3000, ()=>{
  console.log('Server is up on port 3000')
})

console.log8("Hallo")
