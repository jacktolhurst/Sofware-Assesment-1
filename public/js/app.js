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
  var randNum = getRandomInt(data.length);
  // var randNum = CalcRandomByDay(data.length);

  var newType = "";
  if(data[randNum].type == 1){
    newType = "Premium";
  }
  else if(data[randNum].type == 2){
    newType = "Deformed";
  }
  else{
    newType = "Standard";
  }

  result += `
  <div class="fanContent">
      <img src="${data[randNum].image}" alt="Your internet wasn't a big fan" class="fanImage">
      <div class="fanDetail">
          <h1 class="mainTextH1">${data[randNum].name}</h1>
          <p class="mainTextFanType">${data[randNum].smallInfo}</p>
          <p class="mainTextFanType" id="${newType}"=>${newType}</p>
          <p class="mainTextFanInfo">${data[randNum].description}</p>
          <a href="${data[randNum].link}" target="_blank">Find The Fan</a>
      </div>
  </div>
  `;
  document.querySelector(".mainText").innerHTML = result;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// function CalcRandomByDay(max) {
//   const today = new Date();
//   const dateKey = today.toISOString().slice(0, 10);

//   const seed = parseInt(dateKey.replace(/-/g, ''), 10); 
//   const randomNumber = seed % max;
  
//   return randomNumber;
// }

window.onLoad = loadStuff;
