const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0c7c2c2e21622bfbf25d28566cf639d7&query=${latitude},${longitude}`;
    const json = true;
    request( {url,json} , (err, {error,body} = {}) => {
        if(err){
            callback('Unable to connect to weatherstack',undefined)
        }else if(error){
            callback(error.info,undefined) 
        }else{
            callback(undefined,`${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out.It feels like ${body.current.feelslike} degrees out.`)
        }
    })
}

module.exports = forecast