const request = require('postman-request')

const forecast = (longitude, latitude,callback) =>{
 
    const url='http://api.weatherstack.com/current?access_key=f2ebc7c77879a99546070e8539fffa50&query='+latitude+','+longitude
  //  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+','+latitude +'.json?access_token=pk.eyJ1Ijoia2hhcnByZWV0NTQiLCJhIjoiY2t1a3Q4YWEyMDMzMzJ1cGYwdzR5dGdmcSJ9.3_lYuO-Yt1MJFHKxaOV-PQ&limit=1'
    request({ url, json: true},(error,response, body) =>{
        if(error)
            callback('Unable to connect', undefined)
        // else if(body.features.length ===0)
        //     callback('unable to find location', undefined)
        else 
            callback(undefined, {
                forecast : 'Weather is '+ body.current.weather_descriptions[0] 
            })        
    })
}

module.exports = forecast
