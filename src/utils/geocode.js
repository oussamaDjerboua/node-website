const axios = require("axios");

const geocode = (adress, callback) =>{
    const optionsPlace = {
      method: 'GET',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1Ijoib3Vzc2FtYWRqZXJib3VhMTk5NSIsImEiOiJjbGI3a2l4NXEwYWU1M29yczJvaGttams0In0.a6c7APBgwo6QLPUyibtzAg&limit=1`,
    }
    axios.request(optionsPlace)
  .then(({data})=>{
     if(data.features.length === 0){
      const dataJson = JSON.stringify({error : 'unable to finde location try a nother one'})
       callback(dataJson, undefined)
     } else{
       callback(undefined, {
         latitude: data.features[0].center[0],
         longitude: data.features[0].center[1],
         location: data.features[0].place_name
     })
    } 
  })
  .catch(function (error) {
    callback('Unable to connect to location services!', undefined)
   })
      
  }

  module.exports = geocode