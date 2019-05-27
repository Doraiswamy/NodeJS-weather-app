const request = require('request')

//Geocoding
//Address -> Lat/Long
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoibmFjaGlrZXRoLWFwaSIsImEiOiJjancxMGV2a3YwZmVrNGNrdGI2cHcwNzRtIn0.7KXvxVnGtjC7_PwXF6OlkA"

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connection location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to provide coordinates', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode