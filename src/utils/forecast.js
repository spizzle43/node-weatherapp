const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/50f201a336b0c663112c5d82bf0321ff/' + latitude + ',' + longitude

    //options object is the first one and callback funciton is the second option
    request({url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(body.error){
            callback('Unable to find coordinates', undefined)
        }
        else{
            
            callback(undefined , body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees outside.'
            +' The high today is '+ body.daily.data[0].temperatureHigh + ' and the low is ' + body.daily.data[0].temperatureLow + '. There is a ' +body.currently.precipProbability +' % chance of rain.')

        }

    })
}

module.exports = forecast