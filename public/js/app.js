const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

const getLocation = async (address)=> {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const response = await fetch(`/weather/?address=${address}`)
    const data = await response.json()
    if(data.error) {
       messageOne.textContent= data.error
    } else {
        // console.log(data.location)
        messageOne.textContent = data.location
       messageTwo.textContent = data.forecast
    }
}

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = getLocation(search.value)
   
    console.log(location)
})