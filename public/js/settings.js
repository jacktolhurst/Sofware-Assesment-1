const darkModeButton = document.getElementById("enterButtonDarkMode");
const lightTextButton = document.getElementById("enterLightTextMode");
const body = document.body;

var darkMode = false;
var lightText = false;

darkModeButton.addEventListener('click', () =>{
    if(!darkMode){
        localStorage.setItem("darkMode", "true");
        darkMode = true;
    }
    else{
        localStorage.setItem("darkMode", "false");
        darkMode = false;
    }
});

lightTextButton.addEventListener('click', () =>{
    if(!lightText){
        lightText = true;
        localStorage.setItem("lightText", "true");
    }
    else{
        lightText = false;
        localStorage.setItem("lightText", "false");
    }
});

setInterval(checkSettings, 100);

function checkSettings(){ 
    if(localStorage.getItem("darkMode") == "true"){
        body.style.backgroundColor = "black";
        darkModeButton.textContent = "Lights on fanning"
    }
    else{
        body.style.backgroundColor = "white";
        darkModeButton.textContent = "Lights out fanning"
    }
    
    if(localStorage.getItem("lightText") == "true"){
        body.style.color = "white";
        lightTextButton.textContent = "Turn the nightlight off"
    }
    else{
        lightTextButton.textContent = "Turn the nightlight on"
        body.style.color = "black";
    }
}