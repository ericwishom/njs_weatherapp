const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8bffdbec399898974b560d5f7b9706b4&query=' + lat + ',' + long + '&units=f'

    request({url, json:true}, (error, {body}) => { // Make the request, wait for response. Conditionally evoke callback function based on response of request
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        }   else if (body.error) {
                callback('Unable to provide forecast for that location! Please try again.', undefined)
        }   else {
                const curTemp = body.current.temperature
                const precipProbability = body.current.precip
                callback(undefined, 'It is currently ' + curTemp + ' degrees outside. There is a ' + precipProbability + ' percent chance of rain.')
            }
    })
}
module.exports = forecast