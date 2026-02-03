// Using fetch to load data from another JS file
async function loadAndDisplayImages() {
    try {
        // First, let's fetch a JSON file with image data
        // For this example, we'll create a simple JSON file or use an external API
        // Since you want to fetch from another JS file, I'll show both approaches
        
        // APPROACH 1: Fetch from a separate JSON file
        const response = await fetch('images.json');
        if (!response.ok) {
            throw new Error('Failed to load images data');
        }
        
        const imagesJSON = await response.json();
        displayRandomImages(imagesJSON);
        
    } catch (error) {
        console.error('Error loading images:', error);
        // Fallback to local data if fetch fails
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
    // Fisher-Yates shuffle algorithm for better randomness
    const shuffled = [...imagesArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    const selected = shuffled.slice(0, 3);
    const gallery = document.getElementById("gallery");
    
    // Clear gallery first (in case of multiple calls)
    gallery.innerHTML = '';
    
    selected.forEach(item => {
        const img = document.createElement("img");
        img.src = item.url;
        img.alt = "Random picture";
        img.loading = "lazy"; // For better performance
        gallery.appendChild(img);
    });
}

// Alternative: Fetch from another JS file that exports data
async function loadFromJSFile() {
    try {
        // This approach uses dynamic import (for modules)
        // If you have a JS file that exports data
        const imageModule = await import('./imageData.js');
        const images = imageModule.default || imageModule.images;
        displayRandomImages(images);
    } catch (error) {
        console.error('Error loading from JS file:', error);
        loadAndDisplayImages(); // Fallback to JSON approach
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // You can use either method:
    loadAndDisplayImages(); // Uses JSON file
    // OR: loadFromJSFile(); // Uses JS module
});