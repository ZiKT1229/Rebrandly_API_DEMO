let API_KEY = '2dc296eec3a94485a276fdd83b2d3922'; // 請輸入自己申請的APIKEY
const url = 'https://api.rebrandly.com/v1/links';

const input = document.getElementById("inputField");
const button = document.getElementById("buttonField");
const output = document.getElementById("outputField");

const renderResponse = (res) => {
  if(res.errors){
    output.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
  } else {
    output.innerHTML = `<p>Your shortened url is: </p><p> ${res.shortUrl} </p>`;
  }
}

const shortenUrl = () => {
  const urlToShorten = input.value;
  const data = JSON.stringify({destination: urlToShorten});

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'apikey': API_KEY
    },
    body: data
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Request failed!');
  }, networkError => {
    console.log(networkError.message);
  }).then(jsonResponse => {
    renderResponse(jsonResponse);
  });
};

button.addEventListener('click', (event) => {
  event.preventDefault();
  while(output.firstChild) {
    output.removeChild(output.firstChild);
  }
  shortenUrl();
});