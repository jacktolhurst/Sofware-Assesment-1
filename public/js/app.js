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
data.forEach(({ name, smallInfo, description, image} = rows) => {
result += `
    <div class="fanContent">
        <img src="${image}" alt="Your internet wasn't a big fan" class="fanImage">
        <div class="fanDetail">
            <h1 class="mainTextH1">${name}</h1>
            <p class="mainTextFanType">${smallInfo}</p>
            <p class="mainTextFanInfo">${description}</p>
        </div>
    </div>
    `;
});
document.querySelector(".mainText").innerHTML = result;
}

window.onLoad = loadStuff;
