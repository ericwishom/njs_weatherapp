const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8bffdbec399898974b560d5f7b9706b4&query=' + lat + ',' + long + '&units=f'

    request({url, json:true}, (error, {body}) => { // Make the request, wait for response. Conditionally evoke callback function based on response of request
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        }   else if (body.error) {
                callback('Unable to provide forecast for that location! Please try again.', undefined)
        }   else {
                callback(undefined, 'It is currently ' + body.current.temperature + ' degrees outside. There is a ' + body.current.precip + ' percent chance of rain. The humidity is ' + body.current.humidity + ' and the Wind Speed is ' + body.current.wind_speed + ' mph.')
            }
    })
}
module.exports = forecast