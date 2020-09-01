const request = require('request')

const geoCode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFtYWtyaXNobmEzODIiLCJhIjoiY2tlY2VkOTkwMGh3NDJ4b2Jxcm85cmp3ciJ9.JvvDjSh0Bqu7dV9LuglOEw&limit=1`;
    const json = true;
    request({url,json} , (err, {body} = {}) => {
        if(err){
            callback('Unable to connect to Mapbox',undefined)
        }else if(body.features.length == 0){
            callback('Unable to find the location.Please search again',undefined)
        }else{
            callback(undefined,   
                {
                    Latitude:  body.features[0].center[1] ,
                    Longitude: body.features[0].center[0],
                    Location: body.features[0].place_name
                })
            }
    })
    }
    
module.exports = geoCode