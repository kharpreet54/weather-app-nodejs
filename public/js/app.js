
console.log('js file')

fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data) => {
        console.log(data)
    })
})
//    fetch('http://localhost:3000/weather?address=boston').then((response) =>{
//         response.json().then((data) =>{
//             if(data.error){
//                 console.log('error')
//             } else {
//                 console.log(data.location)
//                 console.log(data.forecast)
//             }
//         })
//     })

  const form=  document.querySelector('form')
  const search=  document.querySelector('input')
  const message1 = document.querySelector('#one')
  const message2 = document.querySelector('#two')


  form.addEventListener('submit',(e) =>{
      e.preventDefault()
      console.log(search.value)
      message1.textContent ='Loading..'
      message2.textContent=''
      fetch('http://localhost:3000/weather?address='+search.value).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                console.log(data.error)
                message1.textContent=data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                message1.textContent=data.location
                message2.textContent=data.forecast
            }
        })
    })
  })