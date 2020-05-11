let resultCount = 20;

let url =
  "https://newsapi.org/v2/top-headlines?country=in&apiKey=19b9427d288e4e69aa5a110fd6294e39&pagesize=${resultCount}";

let search = function (keyword) {
  let searchUrl = url + `&q=${keyword}`;
  callApi(searchUrl);
};

let handleSearch = function () {
  if (event.keyCode == 13) {
    var searchInput = document.getElementById("search");
    search(searchInput.value);
  }
};

let prepareHtmlFromData = function (dataArr) {
  console.log(dataArr);
  let finalHtml = "";
  if (dataArr.length == 0) {
    document.getElementById("news-articles").innerHTML = "No Results .......";
    return;
  }

  for (let i = 0; i < dataArr.length; i++) {
    console.log(dataArr[i]);
    let htmlString = `
    <li class = "article">
      <a class = "article-link" href = "${dataArr[i]['url']}">
        <img class = "article-img"  src="${dataArr[i]['urlToImage']}"></img>
        <h2 class = "article-title">${dataArr[i]["title"]}</h2> 
        <p class = "article-description">  ${dataArr[i]["description"]} </p>
        <span class = "article-author"> - ${dataArr[i]["author"]} </span>
      </a>
    </li>`;
    console.log(htmlString);
    finalHtml = finalHtml + htmlString;
    console.log(finalHtml);
    console.log(dataArr.length);
  }

  document.getElementById("news-articles").innerHTML = finalHtml;
};

let callApi = function (url) {
  let myPromise = fetch(url);
  myPromise
    .then(function (response) {
      response.json().then(function (responseInner) {
        if (responseInner.articles) {
          prepareHtmlFromData(responseInner.articles);
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

callApi(url);
