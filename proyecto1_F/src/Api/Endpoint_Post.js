const axios = require('axios');

axios.post('/image', {
    Description: 'Pueba',
    Directory: 'C:/'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });