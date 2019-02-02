var xhr;
var searching = false;

// Initial search call, acts as debouncer
const search = () => {
  // Move mainTitle and search up
  document.getElementById("mainTitle").style.display = "none";
  document.getElementById("mainTitleAlt").style.display = "flex";


  if(!searching && document.getElementById("search").value.length > 0) {
    var cards = document.getElementById("resultsDiv").childNodes;
    if(cards.length > 3) {
      // Animate cards here
      searching = true;
      window.setTimeout(getSearch, 300);
    } else {
      searching = true;
      getSearch();
    }
  }
}

// Fetches the JSON file using the given keyword
const getSearch = () => {
  var keyword = document.getElementById("search").value;
  xhr = createCORSRequest("GET", "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&srlimit=100&origin=*&inprop=url&utf8=&format=json");
  xhr.send();

  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    //console.log(data);
    updateSearch(data);
  }

  xhr.onerror = function() {
    console.log("Error");
  }
}

// Updates the CSS with the new JSON file
const updateSearch = (data) => {
  // Clear old search results
  document.getElementById("resultsDiv").innerHTML = "";

  // Add new search results
  if(data.query.search.length <= 0) {
    noResults();
  } else {
    for(var i = 0; i < data.query.search.length; i++) {
      var card = document.getElementById("resultCard").cloneNode(true);
      document.getElementById("resultsDiv").appendChild(card);
      var cardAtr = card.childNodes;
      console.log(cardAtr);
      //console.log(data.query.search[i]);
      cardAtr[1].innerHTML = data.query.search[i].title;
      cardAtr[1].href = `https://en.wikipedia.org/?curid=${data.query.search[i].pageid}`;
      cardAtr[3].innerHTML = `https://en.wikipedia.org/?curid=${data.query.search[i].pageid}`;
      cardAtr[5].innerHTML = '"...' + data.query.search[i].snippet + '..."';
      card.style.display = "block";
    }
  }

  // Animate post-search title here 

  searching = false;
}

// Allows Cross-Origin requests
const createCORSRequest = (method, url) => {
  var xhr = new XMLHttpRequest();
  if("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if(typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  xhr.setRequestHeader("Api-User-Agent", "sevonefive-fcc-wiki/1.0");
  
  return xhr;
}

// Event handler for results = 0
const noResults = () => {
  document.getElementById("resultsDiv").innerHTML = "<h2 style='color: #f4f4f4;'>No results found :(</h2>";
}

// Startup Main title animation

// Startup Search box animation

// Startup footer animation


