// ========== FIRST PROJECT: 3 Random Pictures ==========
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

// ========== SECOND PROJECT: Keyword Image Viewer ==========
const imageData = {
    key: [
        { url: "https://diyshop.co.za/cdn/shop/files/key-precut-cd-3-lever-cd1.webp?v=1759664099", alt: "House key" },
        { url: "https://images.stockcake.com/public/6/d/2/6d2a010a-6b24-440d-a754-0493b269526c_large/vintage-key-displayed-stockcake.jpg", alt: "Vintage key" },
        { url: "https://upload.wikimedia.org/wikipedia/commons/6/60/Solex_99_30_padlock_with_keys_%28DSCF2659%29.jpg", alt: "Classic key" }
    ],
    door: [
        { url: "https://luxdoors.com/cdn/shop/products/F66_680x680.png?v=1635746031", alt: "Luxury door" },
        { url: "https://i.pinimg.com/736x/4b/c5/96/4bc5961f9c0af43fc2ca1f8fc35fc6b4.jpg", alt: "Wooden door" },
        { url: "https://mla5dc5gjk9g.i.optimole.com/cb:hUyv.3bf7f/w:800/h:640/q:mauto/f:best/https://www.aspire-doors.co.uk/wp-content/uploads/2023/07/Croft-Lifestyle-v2.jpg", alt: "Open door" }
    ],
    house: [
        { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyaminmellish-106399.jpg&fm=jpg", alt: "Family house" },
        { url: "https://thumbs.dreamstime.com/b/modern-house-interior-exterior-design-46517595.jpg", alt: "Modern house" },
        { url: "https://hips.hearstapps.com/hmg-prod/images/bungalow-brie-williams-6695a64bc1369.jpg?crop=1.00xw:0.693xh;0,0.216xh", alt: "Victorian house" }
    ]
};

function populateGalleries() {
    for (const [keyword, images] of Object.entries(imageData)) {
        const grid = document.getElementById(`grid-${keyword}`);
        if (!grid) continue;
        grid.innerHTML = '';
        images.forEach(item => {
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.alt;
            img.loading = 'lazy';
            grid.appendChild(img);
        });
    }
}

function searchKeyword() {
    const input = document.getElementById('keywordInput').value.toLowerCase().trim();
    const resultMsg = document.getElementById('searchResult');

    document.querySelectorAll('.gallery-section').forEach(s => s.classList.remove('highlight-section'));

    let matched = false;

    for (const keyword of Object.keys(imageData)) {
        if (input.includes(keyword)) {
            const section = document.getElementById(`section-${keyword}`);
            if (section) {
                section.classList.add('highlight-section');
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                matched = true;
                resultMsg.textContent = `Showing results for "${keyword}"`;
                break;
            }
        }
    }

    if (!matched) {
        resultMsg.textContent = 'No matching keyword found. Try: key, door, or house.';
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // First project
    loadAndDisplayImages();
    
    // Second project
    populateGalleries();

    const input = document.getElementById('keywordInput');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') searchKeyword();
        });
    }
});