const axios = require('axios')
//const geocode = require('./geocode')

const forecast =(latitude, longitude, callback) =>{
//console.log(geocode)
    const optionsweather = {
        method: 'GET',
        
        url: `https://aerisweather1.p.rapidapi.com/observations/${longitude},${latitude}`,
      
        headers: {
          'X-RapidAPI-Key': 'cc0f827157mshd4d945e78b78507p163675jsnc27072572089',
          'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
        },
        responseType: 'json',
      };
      
      axios.request(optionsweather)
      .then(function (response) {
        if(response.data.response.length === 0){
            callback('unable to finde location',undefined)
          }else{
            const data =response.data.response 
            const place = data.place.name
            const temp = data.ob.tempC
            const weather = data.ob.weather
            callback(undefined,`it is currently ${temp} in the city ${place} in general ${weather}` );
           
          } 
      }).catch(function (error) {
          callback('unable to connect to weather service !',undefined)
      });

}

module.exports = forecast

