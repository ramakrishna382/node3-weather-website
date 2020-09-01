
console.log("Client side javascript is loaded")
const getWeather = (address, callback) => {

    fetch('/weather?address='+address).then((response) => {
        response.json().then((jsonRes) => {
            if(jsonRes.error) callback(jsonRes.error, undefined)
            else {
                callback(undefined,jsonRes)
            } 
        }).catch((err) => {
            callback(err,undefined)
        })
    } ).catch((err) => {
        callback(err,undefined)
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''
    e.preventDefault()
    const location = search.value;
    getWeather(location,(err,res) => {
        if(err) {
            console.log(err); 
            messageOne.textContent = err;
        }else{
            console.log(res);
            messageOne.textContent = res.location
            messageTwo.textContent = res.forecast
        }
    })
})