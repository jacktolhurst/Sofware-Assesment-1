async function loadStuff(){
    let result = "";
    fetch("./frontEndData.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        appendData(data);
      })
      .catch(function (err) {
        console.log("error: " + err);
      });
}

function appendData(data) {
    data.forEach(({ name, type, smallInfo, description, image } = rows) => {
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
    document.querySelector(".container").innerHTML = result;
    }

window.onLoad = loadStuff;