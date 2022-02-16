// API endpoint https://api.unsplash.com/photos/?client_id=[API KEY HERE]

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

const initialCount = 5;
let count = initialCount;

const apiKey = 'mHOVM_Ce_a5XVRQiGDzrszvF3PRrnypxmAOSUZfq8Z8';

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
} 


const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 30;
    }
    
}


function displayPhotos () {

    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash API
        const item = document.createElement('a');
        //set <a> attributes
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        //Create <img>
        const img = document.createElement('img');
        //set <img> attributes
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded());

        item.appendChild(img);
        imageContainer.appendChild(item); //<imageContainer>/<item>/<img>
    })
}


// Get photos from API
const getPhotos = async () => {

    try {
        const response = await fetch(apiURL);
        
        photosArray = await response.json();

        displayPhotos();

    } catch (err) {

    }
}

//Check to trigger fetching more photos when scroll event..
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        
        getPhotos();
    }
})

getPhotos();