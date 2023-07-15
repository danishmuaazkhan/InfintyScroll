const imgContainer = document.querySelector('.img-container'); // Container for displaying the images
const loader = document.querySelector('.loader'); // Loader element

let photosArray = []; // Array to store the fetched photos
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

// Unsplash API
const count = 30; // Number of photos to fetch from the API
const apiKey = 'hAS90NiV0dFIwe5GBLnGYtMbxEp16Cl2eOX5817Y-hI'; // Your Unsplash API key
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; // API URL for fetching random photos


// Check if all images were loaded 
function imageLoaded() {
    imagesLoaded++;
    ready = imagesLoaded === totalImages ;
    loader.style.visibility = 'hidden';
}


// helper Function to set attribute on DOM elements
function setAttributes(element, attribute) {
    for (const key in attribute)
    element.setAttribute(key, attribute[key]);
}

// Function to create elements for links and photos and add them to the DOM
function displayPhotos() {
    imagesLoaded  = 0 ;
    totalImages = photosArray.length;

    // Iterate through each photo in the photosArray
    photosArray.forEach((photo) => {
        // Create an anchor tag to link to the Unsplash photo
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create an image element for the photo
        let img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event Listener , Chechk when each image is loaded
        img.addEventListener('load', imageLoaded);
        
        // Append the image inside the anchor tag and both inside the imgContainer
        item.appendChild(img)
        imgContainer.appendChild(item);
    });
}

// Function to fetch photos from the Unsplash API
async function getPhotos() {
    // loading(); // Show the loader
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json(); // Store the fetched photos in the photosArray
        displayPhotos(photosArray); // Display the fetched photos
        // complete(); // Hide the loader
    }
    catch (error) {
        alert(error);
    }
}

window.addEventListener('scroll',() => {   
    if(ready){
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        ready = false;
        getPhotos();
        }

    }
} )
getPhotos(); // Fetch and display the photos when the page loads
