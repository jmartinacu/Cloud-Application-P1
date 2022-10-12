const axios = require('axios');

// Make a request for a image with a given ID
axios.get('/image?description=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// Optionally the request above could also be done as
axios.get('/image', {
    params: {
      description: "hola"
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getImage() {
  try {
    const response = await axios.get('/image?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}