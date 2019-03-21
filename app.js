let API_KEY = ''; // 請輸入自己申請的APIKEY
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
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});
  const xhr = new XMLHttpRequest();

  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
  		renderResponse(xhr.response)
		}
  };
  
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type','application/json');
  xhr.setRequestHeader('apikey', API_KEY);
  xhr.send(data);
};

button.addEventListener('click', (event) => {
  event.preventDefault();
  while(output.firstChild) {
    output.removeChild(output.firstChild);
  }
  shortenUrl();
});