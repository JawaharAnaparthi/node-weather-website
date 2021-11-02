const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ff80fa8c18e36c2072038f14792ec5d6&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services api', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. Currently it is ' + body.current.temperature +
                ' degrees out there. It feels like ' + body.current.feelslike + ' degrees and with humidity ' + body.current.humidity + '.')
        }
    })

}

module.exports = forecast