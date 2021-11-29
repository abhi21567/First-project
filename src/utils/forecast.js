
const request = require('request')

  
const forecast = (a, b, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1ce03c3511f29296c69e1dc04358adc4&query='+a+','+b+'&units=f'
  
  request({url:url,json:true}, (error, response) => {
    if(error)
    {
      callback('Unable to connect!',undefined)
    }
    else if(response.body.error){
      callback('Unable to connect!!',undefined)
    }
    else
    {
      const description = response.body.current.weather_descriptions[0]
      const temperature = response.body.current.temperature
      const feelslike = response.body.current.feelslike
      callback(undefined,{
          weather_description: description,
        temperature: temperature,
        feelslike: feelslike
      }) 
    }
   
  })
  }

  module.exports = forecast

