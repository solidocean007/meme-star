
export const createMeme= ({path}) => fetch("http://localhost:3001/memes", {
  method: 'POST',
  headers: {"Content-Type" : "application/json"},
  body: JSON.stringify({"imagePathUrl": path})
}).then(response => response.json())
  .then(result => console.log(result))
  // .then(console.log)
  // .catch(error => console.log('error', error));