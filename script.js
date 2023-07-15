// Unsplash API
const count = 12; // Number of photos to fetch from the API
const apiKey = 'hAS90NiV0dFIwe5GBLnGYtMbxEp16Cl2eOX5817Y-hI'; // Your Unsplash API key
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=squarish`; // API URL for fetching random photos

const imgContainer = document.querySelector('.img-container'); // Container for displaying the images
const loader = document.querySelector('.loader'); // Loader element

let photosArray = []; // Array to store the fetched photos

// Function to fetch photos from the Unsplash API
async function getPhotos() {
    loading(); // Show the loader
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json(); // Store the fetched photos in the photosArray
        console.log(photosArray);
        displayPhotos(photosArray); // Display the fetched photos
        complete(); // Hide the loader
    }
    catch (error) {
        alert(error);
    }
}

// helper Function to set attribute on DOM elements
function setAttributes(element, attribute) {
    for (const key in attribute)
        element.setAttribute(key, attribute[key]);
}

// Function to create elements for links and photos and add them to the DOM
function displayPhotos() {
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

        // Append the image inside the anchor tag and both inside the imgContainer
        item.appendChild(img)
        imgContainer.appendChild(item);
    });
}

// Function to show the loading animation
function loading() {
    loader.style.visibility = 'visible';
    imgContainer.style.display = 'none';
}

// Function to hide the loading animation
function complete() {
    loader.style.visibility = 'hidden';
    imgContainer.style.display = 'flex';
}

getPhotos(); // Fetch and display the photos when the page loads
