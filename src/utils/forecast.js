import request from 'request'

const forecast = (lat, long, callback) => {
    const url=`https://api.darksky.net/forecast/56cb140e4b8ad717eb49d21fa4b008ee/${lat},${long}`

    request({url, json: true}, (error, { body })=> {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
                callback('Cordinate error', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability}% chance of rain. The highest temperature for the day is ${body.daily.data[0].temperatureHigh}`)
        }
    })
}

export default forecast
