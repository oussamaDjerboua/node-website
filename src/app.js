const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require ('./utils/forcast')

const app = express()

// Defined path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars and views engine

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Oussama djerboua'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Oussama djerboua'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Oussama djerboua'
        
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error : 'You must provide an adress'
        })
    }
    geocode(req.query.adress, (error, {latitude,longitude,location}={} )=> {
        if(error){
          return res.send(error)
        }
        
        forcast( latitude,longitude, (error, dataforecast) => {
          if(error){
            return res.send(error)
          }
          res.send({
            forcast : dataforecast,
            location,
            adress:req.query.adress
          })
        })
            
    })
})

app.get('/products',(req,res)=>{

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Djerboua oussama',
        errorMessage:'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Oussama djerboua',
        errorMessage:'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})