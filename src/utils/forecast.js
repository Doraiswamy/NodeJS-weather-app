const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const DARK_SKY_API_KEY = '9327644896c6737bb95c1f47c9b3cba9'

    const url = "https://api.darksky.net/forecast/"+DARK_SKY_API_KEY+"/"+ latitude +","+ longitude +"?units=si&lang=en"

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.code === 400) {
            callback(body.error, undefined)
        } else {
            const data = body.currently
            callback(undefined, body.daily.data[0].summary+' It is currently '+data.temperature+' degrees out. There is a '+data.precipProbability+'% chance of rain')
        }
    })
}

module.exports = forecast