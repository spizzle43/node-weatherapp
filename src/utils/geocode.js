const request = require('request')
const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiZml6emxlcyIsImEiOiJjazM5anNzbngwM3F2M29taGU4YjNmaTd0In0.hgUG_hp2b_CO7Npn4p76AQ&limit=1'
    
    request({url,json: true}, (error, {body}) =>{
    
        if(error){
            callback('Unable to connect to location services.', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Please try again',undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    
    }
module.exports = geoCode