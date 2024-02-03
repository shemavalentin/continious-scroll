// Consuming Unsplash API

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//unsplash API
let initialCount = 5;
const apiKey = 'r73xVYUGgipJ-6nr0A94EUgJRP6i9QWJ_B7EuM6Uctk';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// function to update API with new photos count
function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}
// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
      if (imagesLoaded === totalImages) {
        ready = true;
          loader.hidden = true;
    }
}
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }   
}
// Creating elements for Link & photos, and add to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //use forEach loop to loop through 
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: ' _blank',
        })

        //create <img> for photos
        const img = document.createElement('img');
       
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each is finished to load
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside a imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoaded) {
            updateAPIURLWithNewCount(30)
            isInitialLoad = false;
        }
    } catch (error) {
        // catching error
    }
}
// Setting scroll and load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        
    }
})
getPhotos();