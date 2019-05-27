console.log('app.js loaded')

fetch('http://localhost:3000/weather?Address=Boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log('Error is',error)
        } else {
            console.log(data)
        }
    })
})