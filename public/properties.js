
async function fetchProperties() {
    try {
        const response = await fetch('/api/properties');
        const properties = await response.json();
        displayProperties(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
    }
}

function displayProperties(properties) {
    const cardSection = document.querySelector('.cardSection');
    cardSection.innerHTML = '';

    properties.slice().reverse().forEach(property => {
        const card = createPropertyCard(property);
        cardSection.appendChild(card);
    });
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    card.innerHTML = `
    <div id="propertyCarousel" class="carousel slide" >
        <div class="carousel-inner">
            <!-- First image (active by default) -->
            <div class="carousel-item active">
                <img src="${property.photo}" class="d-block w-100" alt="Property Image 1">
            </div>
            <!-- Second image -->
            <div class="carousel-item">
                <img src="${property.photo2}" class="d-block w-100" alt="Property Image 2">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>

    <div class="property-details">
        <h3>${property.address}</h3>
        <p>Owner: ${property.owner}</p>
        <p>Contact: ${property.contact}</p>
        <p>Rent: ${property.rentPrice} €</p>
        <p>Size: ${property.roomSize} m²</p>
        <p>Features: ${property.features.join(', ')}</p>
    </div>
`;

    
    return card;
}

// Load properties when page loads
document.addEventListener('DOMContentLoaded', fetchProperties);


document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const city = document.getElementById('city').value;
    const price = document.getElementById('price').value;
    const size = document.getElementById('size').value;

    let Data = {
        city: city,
        price: price,
        size: size
    }

    try{
        const response = await fetch('/api/match', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        });
        const properties = await response.json();
        if(properties.length === 0){
            alert("No properties found");
        }
        displaySearchProperties(properties);
    }catch(error){
        console.error('Error fetching properties:', error);
    }
})

function displaySearchProperties(properties) {
    const cardSection = document.querySelector('.SearchProperty');
    cardSection.innerHTML = '';

    properties.slice().reverse().forEach(property => {
        const card = createPropertyCard(property);
        cardSection.appendChild(card);
    });
}
