const express = require('express')
const path = require('path')
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res)=>{
	res.render('index',{

		title:'Weather',
		name:'Vaibhav Reddy'
	})
})

app.get('/about',(req,res)=>{
	res.render('about',{

		title: 'About Me',
		name: 'Vaibhav Reddy'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		title:'Help',
		email:'vaibhavreddy57@gmail.com',
		name: 'Vaibhav Reddy'
	})
})

app.get('/weather',(req,res) =>{
	if(!req.query.address)
	{
		return res.send({
			error: 'You must provide an address!!'
		})
	}
	const location = req.query.address
	geocode(location, (error,data) =>{
		if(error)
		{
			return res.send({error})
		}

		forecast(data.latitude,data.longitude, (error,weatherData) => {
			if(error)
			{
				return res.send({error})
			}
			res.send({
				Location:data.location,
				weather:weatherData
			})
		})

	})

})


app.get('*',(req,res)=>{
	res.render('error',{
		title: '404 ERROR',
		name: 'Vaibhav Reddy',
		msg: 'Page not found'
	})
})

app.listen(port, () => {
	console.log('Server is up running on port '+port)
})