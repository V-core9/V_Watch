const vReq = require('v_req')



const demoPost = {
  data: JSON.stringify({
    todo: 'Buy the milk'
  }),
  options: {
    hostname: 'quickmedcards.com',
    port: 443,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

const demoGet = {
  options: {
    hostname: 'api.nasa.gov',
    port: 443,
    path: '/planetary/apod?api_key=DEMO_KEY',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

const demoGetGoogle = {
  options: {
    hostname: 'www.google.com',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'text/html'
    }
  }
};

vReq(demoGet);
vReq(demoPost);
vReq(demoGetGoogle);
