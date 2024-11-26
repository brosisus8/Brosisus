
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
        <img src="${property.photo}" alt="Property Image" class="property-image">
        <div class="property-details">
            <h3>${property.address}</h3>
            <p>Owner: ${property.owner}</p>
            <p>Contact: ${property.contact}</p>
            <p>Rent: $${property.rentPrice}</p>
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
