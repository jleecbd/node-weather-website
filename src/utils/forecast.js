const request = require('request')

const forecast = (lat, long, callback) => {

     const url = 'https://api.darksky.net/forecast/21f9b9653fb9ad74e3933a3029297bd9/' + encodeURIComponent(lat)+ ',' + encodeURIComponent(long)

     request({url: url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to service')
        } else if (body.error) {
            callback('Invalid coordinates provided '+ body.error + ' Latitude: ' + lat + ' Longitude: ' + long)
        } else {
            const temp = body.currently.temperature
            const precip = body.currently.precipProbability

            callback(undefined, body.daily.data[0].summary + " It is currently " + temp + " degrees out.  There is a " + precip + "% chance of rain.")
        }
        

     })
      

}


module.exports = forecast
