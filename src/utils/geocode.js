const request = require('request')

const geocode = (address,callback) =>{

	const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFpYmhhdjI2IiwiYSI6ImNrYnA4ajkxMzBvZmsyeHBuMWt4eDB3Y2cifQ.urHdhhzOu5NvvdSekUPpZA&limit=1'
	request({url: url , json: true}, (error,response) => {
		if(error)
		{
			callback('Unable to connect to geocoding API',undefined)
		}
		else if(response.body.features.length === 0)
		{
			callback('Please provide valid location',undefined)
		}
		else
		{
			const longitude=response.body.features[0].center[0]
			const latitude=response.body.features[0].center[1]
			const location=response.body.features[0].place_name
			callback(undefined,{longitude,latitude,location})
		}

	})
}

module.exports = geocode