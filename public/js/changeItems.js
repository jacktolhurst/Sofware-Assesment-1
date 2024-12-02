const toggleButton = document.getElementById("plusButton");
const serviceContent = document.getElementById("serviceButtonOptions");

toggleButton.addEventListener('click', () => {
    toggleButton.classList.add("plusChangeColorAnimate");

    toggleButton.addEventListener('animationend', () => {
        toggleButton.classList.remove('plusChangeColorAnimate');
        if (serviceContent.style.display === 'none' || serviceContent.style.display === '') {
            serviceContent.style.display = 'flex';
            toggleButton.style.display = 'none';
        } else {
            serviceContent.style.display = 'none';
        }
    }, { once: true });
});

function ShowImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("No file selected");
    }
}

document.getElementById('imageInput').addEventListener('change', ShowImage);