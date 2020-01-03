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
            const minTemp = body.daily.data[0].temperatureMin
            const maxTemp = body.daily.data[0].temperatureMax

            callback(undefined, body.daily.data[0].summary + " It is currently " + temp + " degrees out.  There is a " + precip + "% chance of rain.  Today's high temperature is " + maxTemp + " degrees and the low is " + minTemp + " degrees.")
        }
        

     })
      

}


module.exports = forecast
