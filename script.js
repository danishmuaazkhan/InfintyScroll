
// Unsplash API 
const count = 12;
const apiKey = 'hAS90NiV0dFIwe5GBLnGYtMbxEp16Cl2eOX5817Y-hI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=squarish`;

const imgContainer = document.querySelector('.img-container');
const loader = document.querySelector('.loader');

// Get photos from Unspash API
async function getPhoto() {
    loading();
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        setphoto(data);
        complete();
    }
    catch (error) {
        alert(error);
    }
}

// Set Photos in image container 
function setphoto(obj) {
    for (let key in obj) {
        const link = obj[key].urls.full;
        imgContainer.innerHTML += `<img src=${link}>`
    }
}

//Loading animation Start
function loading() {
    loader.style.visibility = 'visible'
    imgContainer.setAttribute('display', 'none' );
}

// Loading Complete
function complete() {
    loader.style.visibility = 'hidden'
    imgContainer.setAttribute('display', 'flex' );
}




getPhoto();