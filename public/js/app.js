let result = "";

fetch("/api/fans")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data.fans);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });


function appendData(data) {
  var num = CalcRandomByDay(data.length);

  var newType = "";
  if(data[num].type == 1){
    newType = "Premium";
  }
  else if(data[num].type == 2){
    newType = "Deformed";
  }
  else{
    newType = "Standard";
  }

  result += `
  <div class="fanContent">
      <img src="${data[num].image}" alt="Your internet wasn't a big fan" class="fanImage">
      <div class="fanDetail">
          <h1 class="mainTextH1">${data[num].name}</h1>
          <p class="mainTextFanType">${data[num].smallInfo}</p>
          <p class="mainTextFanType" id="${newType}"=>${newType}</p>
          <p class="mainTextFanInfo">${data[num].description}</p>
          <a href="${data[num].link}" target="_blank">Find The Fan</a>
      </div>
  </div>
  `;

  document.querySelector(".mainText").innerHTML = result;
}

function CalcRandomByDay(max) {
  const today = new Date();
  const dateKey = today.toISOString().slice(0, 10);

  const seed = parseInt(dateKey.replace(/-/g, ''), 10); 
  const randomNumber = seed % max;
  
  return randomNumber;
}

if ("serviceworker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceworker
      .register("js/serviceworker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

window.onLoad = loadStuff;
