const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit',(e)=>{
	e.preventDefault()
	const address = search.value
	if(address)
	{
		messageOne.textContent = 'Loading...'
		messageTwo.textContent = ''
	}
	else
	{
		messageOne.textContent = 'Enter valid location'
		messageTwo.textContent = ''
	}

	fetch('/weather?address='+address).then((response) => {
		response.json().then((data) => {
			if(data.error)
			{
				messageOne.textContent = data.error
				messageTwo.textContent = ''
			}
			else
			{
				messageOne.textContent = data.Location
				messageTwo.textContent = data.weather
			}
		})
	})

})