async function loadAndDisplayImages() {
    try {
        
        const response = await fetch('images.json');
        if (!response.ok) {
            throw new Error('Failed to load images data');
        }
        
        const imagesJSON = await response.json();
        displayRandomImages(imagesJSON);
        
    } catch (error) {
        console.error('Error loading images:', error);
        const fallbackImages = [
            { "url": "https://picsum.photos/id/1015/400/300" },
            { "url": "https://picsum.photos/id/1025/400/300" },
            { "url": "https://picsum.photos/id/1035/400/300" },
            { "url": "https://picsum.photos/id/1045/400/300" },
            { "url": "https://picsum.photos/id/1055/400/300" },
            { "url": "https://picsum.photos/id/1065/400/300" }
        ];
        displayRandomImages(fallbackImages);
    }
}

function displayRandomImages(imagesArray) {
    const shuffled = [...imagesArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    const selected = shuffled.slice(0, 3);
    const gallery = document.getElementById("gallery");

    gallery.innerHTML = '';
    
    selected.forEach(item => {
        const img = document.createElement("img");
        img.src = item.url;
        img.alt = "Random picture";
        img.loading = "lazy";
        gallery.appendChild(img);
    });
}

async function loadFromJSFile() {
    try {
        const imageModule = await import('./imageData.js');
        const images = imageModule.default || imageModule.images;
        displayRandomImages(images);
    } catch (error) {
        console.error('Error loading from JS file:', error);
        loadAndDisplayImages();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadAndDisplayImages();
});