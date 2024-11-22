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

  var newType = "";
  if(data[randNum].type == 1){
    newType = "Premium";
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
          <p class="mainTextFanType">${newType}</p>
          <p class="mainTextFanInfo">${data[randNum].description}</p>
      </div>
  </div>
  `;

  // data.forEach(({ name, type, smallInfo, description, image} = rows) => {
  //   var newType = "";
  //   if(type == 1){
  //     newType = "Premium";
  //   }
  //   else{
  //     newType = "Standard";
  //   }
  // result += `
  //     <div class="fanContent">
  //         <img src="${image}" alt="Your internet wasn't a big fan" class="fanImage">
  //         <div class="fanDetail">
  //             <h1 class="mainTextH1">${name}</h1>
  //             <p class="mainTextFanType">${smallInfo}</p>
  //             <p class="mainTextFanType">${newType}</p>
  //             <p class="mainTextFanInfo">${description}</p>
  //         </div>
  //     </div>
  //     `;
  // });
  document.querySelector(".mainText").innerHTML = result;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

window.onLoad = loadStuff;
