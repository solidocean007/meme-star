
// export const createMeme= ({path}) => fetch("http://localhost:3001/memes", {
//   method: 'POST',
//   headers: {"Content-Type" : "application/json"},
//   body: JSON.stringify({"imagePathUrl": path})
// }).then(response => response.json())
//   .then(result => console.log(result))
//   // .then(console.log)
//   // .catch(error => console.log('error', error));

// Function to get browser information
// function getBrowserAndLocationInfo() {
//   let browserInfo = `Browser Info: ${navigator.userAgent} 🖥️, Platform: ${navigator.platform} 💻`;
  
//   if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//           (position) => {
//               let lat = position.coords.latitude;
//               let lon = position.coords.longitude;
//               let locationInfo = `Location: Latitude ${lat} 🌐, Longitude ${lon} 🌐`;
//               console.log(`${browserInfo}\n${locationInfo}`);
//           },
//           (error) => {
//               console.error("Error getting location:", error);
//           }
//       );
//   } else {
//       console.error("Geolocation is not supported by this browser.");
//   }
// }

// // Usage
// getBrowserAndLocationInfo();


// function getWeather() {
//   return new Promise((resolve, reject) => {
//     fetch('https://api.weather.gov/gridpoints/RAH/63,22/forecast')
//     .then(response => response.json())
//     // .then(data => resolve(data.properties.periods[1].shortForecast))
//     .then(data => resolve(data.properties.periods[0].detailedForecast))
//     .catch(blah => reject(`Failed to do the thing right, ${blah}`))
//   })
// }

// async function chatPromise() {
//   return await setTimeout(()=> console.log("Promise resolved"), 2000);
// }

// function newChatPromise(){
//   return new Promise((resolve, reject)=> {
//     setTimeout(()=> reject('Promise not resolved'), 3000)
//   })
// }

// function handleChatPromiseError(data) {
//   console.log(`Error: ${data}`)
// }


// newChatPromise()
//   .then(message => alert(message))
//   .catch(handleChatPromiseError);


function getWeather() {
   return fetch('https://api.weather.gov/gridpoints/RAH/63,22/forecast')
  //  return fetch('https://api.weather.gov/gridpoints/OHK/35,35/forecast')
    .then(response => !response.ok ? new Error('Error') :response.json())
    .then(data => (data.properties.periods[1].detailedForecast))
}

const displayData = (weather) => {
  // console.log(weather)
}

const onError = (error) => {
  console.log(`ERROR: ${error}`)
}

// getWeather()
//   .then(displayData)
//   .catch(onError)

// const getWeatherIcon = (weatherData) => {
//   return new Promise(function(resolved, rejected){
//     setTimeout(()=> {
//       switch(weatherData){
//         case 'Sunny' : resolved('🌞')
//         break
//         case 'Cloudy' : resolved('☁')
//         break
//         case 'Rainy' : resolved('☔')
//         break
//         default:
//           rejected('No icon found')
//       }
//     }, 5000)
//   })
// }

// const onSuccess = (data) => {
//     console.log(`Success ${data}`)
// }

// function onError(error){
//   console.log(`Error: ${data}`)
// }

// getWeather()
//   .then(getWeatherIcon)
//   .then(onSuccess, onError)



// const fun1 = () => {
//   return new Promise ((res, rej)=> {
//     setTimeout(()=>{
//       rej('Good data')
//     }, 1000)
//   })
// }

// const fun2 = () => {
//   console.log('fun2')
//   return new Promise ((res, rej)=> {
//     setTimeout(()=>{
//       res('😊')
//     }, 1000)
//   })
// }

// const Horray = (stuff) => {
//   console.log(`Success: ${stuff}`);
// }

// const NoBueno = (stuff) => {
//   console.log(`It no worky: ${stuff}`);
// }

// const inTheEnd = () => {
//   console.log('End of the show!')
// }

// fun1()
//   .then(fun2, NoBueno)
//   .then(Horray)
//   .catch(NoBueno)
//   .finally(inTheEnd)

  

