
let result = "";
let resultArray = [];

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
  var page = "";
  if(document.URL.includes("PremiumFans")){
    page = "PremiumFans";
  }
  else if(document.URL.includes("AllFans")){
    page = "AllFans";
  }
  else{
    page = "index";
  }

  var logoLink = "../images/TEMP/FanIconTemp.png";
  var newType = "";

  if(page == "PremiumFans"){
    data.forEach(({ name, type, smallInfo, description, image, link} = rows) => {
      if(type == 1){
        newType = "Premium";
        var logoLink = "../images/TEMP/FanIconTemp.png";
        
        resultArray.push(`
          <a id="premiumLink" href="${link}" target="_blank">
            <div class="premiumFanContent">
              <img class="PremiumFanImageMain" src="${logoLink}" alt="">
              <img class="PremiumFanImage" src="${"../" + image}" alt="">
              <h1 class="PremiumFanHeader">${name}</h1>
              <p class="PremiumFanType" id="${newType}">Premium</p>
              <p class="PremiumFanText">${smallInfo + " __ " + description}</p>
            </div>
          </a>
        `)
      }
    });
    
    resultArray = ShuffleArray(resultArray);
    result = resultArray.join(""); 

    document.querySelector(".premiumFanContainer").innerHTML = result;
  }

  if(page == "AllFans"){
    data.forEach(({ name, type, smallInfo, description, image, link} = rows) => {
        if(type == 1){
          newType = "Premium";
        }
        else if(type == 2){
          newType = "Deformed";
        }
        else{
          newType = "Standard";
        }
        resultArray.push(`
          <a id="premiumLink" href="${link}" target="_blank">
            <div class="premiumFanContent">
              <img class="PremiumFanImageMain" src="${logoLink}" alt="">
              <img class="PremiumFanImage" src="${"../" + image}" alt="">
              <h1 class="PremiumFanHeader">${name}</h1>
              <p class="PremiumFanType" id="${newType}">${newType}</p>
              <p class="PremiumFanText">${smallInfo + " __ " + description}</p>
            </div>
          </a>
        `)
    });

    resultArray = ShuffleArray(resultArray);
    result = resultArray.join(""); 

    document.querySelector(".premiumFanContainer").innerHTML = result;
  }
  
  if(page == "index"){
    var num = CalcRandomByDay(data.length);

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
        <a href="${data[num].link}" target="_blank">
          <img src="${data[num].image}" alt="Your internet wasn't a big fan" class="fanImage">
        </a>
        <div class="fanDetail">
            <h1 class="mainTextH1">${data[num].name}</h1>
            <p class="mainTextFanType">${data[num].smallInfo}</p>
            <p class="mainTextFanType" id="${newType}">${newType}</p>
            <p class="mainTextFanInfo">${data[num].description}</p>
            <a href="${data[num].link}" target="_blank">Find The Fan</a>
        </div>
    </div>
    `;

    document.querySelector(".mainText").innerHTML = result;
  }

}

function CalcRandomByDay(max) {
  const today = new Date();
  const dateKey = today.toISOString().slice(0, 10);

  const seed = parseInt(dateKey.replace(/-/g, ''), 10); 
  const randomNumber = seed % max;
  
  return randomNumber;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function ShuffleArray(array){
  let arrayAmountLeft = array.length;
  let newArray = [];
  
  while(arrayAmountLeft != 0) {
    var randNum = getRandomInt(arrayAmountLeft)

    const element = array[randNum];

    if(!newArray.includes(element )){
      newArray.push(array[randNum]);
      array.splice(randNum, 1);
      arrayAmountLeft -= 1;
    }
  }

  return newArray;
}

document.getElementById("serviceButtonOptions").addEventListener("submit", async function(event){
  event.preventDefault();

  const name = document.getElementById("nameField").value;
  const type = document.getElementById("typeInput").value;
  const smallInfo = document.getElementById("smallInfoField").value;
  const description = document.getElementById("infoField").value;
  const image = document.getElementById("imageInput").value;
  const link = document.getElementById("linkField").value;

  if(!name ||!smallInfo ||!description ||!image ||!link){
    alert("Please fill all fields");
    return;
  }

  var newType = 0;
  if(type == "Standard"){
    newType = 0;
  }
  if(type == "Premium"){
    newType = 1;
  }
  if(type == "Deformed"){
    newType = 2;
  }

  const newFan = {
    name: name,
    type: newType,
    smallInfo: smallInfo,
    description: description,
    image: image,
    link: link
  };

  try{
    const response = await fetch("/api/fans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFan)
    });

    const result = await response.json();
    console.log(result);

  }catch(e){
    console.error("couldn't add fan", e);
  }
});

if ("serviceworker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceworker
      .register("js/serviceworker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}