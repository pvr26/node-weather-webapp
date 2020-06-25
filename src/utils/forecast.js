const request = require('request')

const forecast = (lat,lon,callback) =>{
	const url = 'http://api.weatherstack.com/current?access_key=ed16d22fe8b85167753aa205b8b56bbc&query='+lat+','+lon
	request({url: url,json: true},(error,response)=>{
		if(error)
		{
			callback('Unable to connect to weather API',undefined)
		}
		else if(response.body.error)
		{
			callback('Please provide valid location address',undefined)
		}
		else
		{
			const data=response.body.current.weather_descriptions[0]+'. Temperature is '+response.body.current.temperature+',but feels like '+response.body.current.feelslike
			callback(undefined,data)
		}
	})
}

module.exports=forecast