const request = require('request')

const forecast = (number1, number2, callback)=>{
  const url = 'https://api.darksky.net/forecast/8875d0ccc2fa21bd8950a5a4d0c1c574/'+ number1 + ',' + number2 + '?units=si&lang=de'
  request({url, json: true}, (error, { body })=>{
    if (error){
      callback('Cannot connect to the weather app', undefined)
    }else if(body.error){
      callback('Unable to finde location', undefined)
    }else {
      callback(undefined, body.daily.data[0].summary + '\n Die Temperatur liegt bei : ' + body.currently.temperature + ' Grad. Es herrscht eine Regenwahrscheinlichkeit von: ' + body.currently.precipProbability + ' Prozent')
    }
  })
}

module.exports = forecast
