
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


//Define paths for express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//set up for static directory path
app.use(express.static(publicDirectorypath))

//Setup handlebars engine and views location
app.set('views',viewsPath)
// view engine is set to hbs. view engine is usefull to render web pages
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.get('',(req, res) => {
    res.render('index', {
        title:'Weather app',
        name: 'Abhishek'
    })
})


app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name:'Abhishek'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'this is some helpfull text.',
        title:'help',
        name:'Abhishek'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send('no adress sent')
    }
    const address = req.query.address
    geocode(address,(error, {latitude, longitude, location} = {}) => {
        if(error)
        {
          return res.send({
            error:error
        })
        }
        else {
         forecast(latitude, longitude, (error, {weather_description, temperature, feelslike} = {}) => {
           if(error)
           {
            return res.send({
                error:error
            })
           }
           else 
           {
              return  res.send({
                weather_description:weather_description,
                temperature:temperature,
                feelslike:feelslike,
                location:location
               })
           }
          
         })
        }
       })
    
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
       products:[]
   })
})

app.get('/help/*', (req, res) => {
    res.render('errors',{
        error:'Help article not found',
        name:'Abhishek'
    })
})

app.get('*', (req, res) => {

res.render('errors',{
    error:'404 error',
    name:'Abhishek'
})
})

app.listen(port, () => {
    console.log('Server is Up on port '+port)
})

console.log(__dirname)
console.log(path.join(__dirname,'../public/index.html'))