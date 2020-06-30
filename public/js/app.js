const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchTerm.value

    baseUrl = '/weather?address='

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(baseUrl + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }   else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})