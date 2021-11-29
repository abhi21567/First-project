console.log('client side javascript file loaded')



document.querySelector('form').addEventListener('submit',(e) => {
    //will prevent the browser reloaing after form submission
    e.preventDefault()
    const address = document.querySelector('input').value
    if(address==="")
   return  console.log('you must provide address')
     
   document.getElementById('error').innerHTML = 'Loading...'

    fetch('http://localhost:3000/weather?address='+address).then((res) => {
        return res.json()
    }).then((data) => {
        if(data.error){
           document.getElementById('error').innerHTML = 'error: ' + data.error
           document.getElementById('1').innerHTML = ''
           document.getElementById('2').innerHTML = ''
           document.getElementById('3').innerHTML = ''
           document.getElementById('4').innerHTML = ''
        }
        else
        {
            document.getElementById('1').innerHTML = 'weather_description: '+ data.weather_description
            document.getElementById('2').innerHTML = 'temperature: ' + data.temperature
            document.getElementById('3').innerHTML = 'feelslike: ' + data.feelslike
            document.getElementById('4').innerHTML = 'location: ' + data.location
            document.getElementById('error').innerHTML = ''
        }
    })
})