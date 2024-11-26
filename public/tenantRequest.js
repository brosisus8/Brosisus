
async function fetchAndDisplayTenantRequests() {
    try {
        const response = await fetch('/api/tenant');
        const tenants = await response.json();
        
        const requestSection = document.querySelector('.requestCardSection');
        requestSection.innerHTML = '';
        
        tenants.forEach(tenant => {
            const requestCard = document.createElement('div');
            requestCard.className = 'tenant-card';
            
            const cardContent = `
                <div class="tenant-image">
                    <img src="${tenant.proof}" alt="Tenant Document" onerror="this.src='default-image.jpg'">
                </div>
                <div class="tenant-info">
                    <h3>${tenant.name}</h3>
                    <p><strong>Contact:</strong> ${tenant.contact}</p>
                    <p><strong>City:</strong> ${tenant.city}</p>
                    <p><strong>Budget:</strong> ${tenant.budgetMax} CHF</p>
                    <p><strong>Minimum Room Size:</strong> ${tenant.roomSizeMin} m²</p>
                    <p><strong>Features:</strong> ${tenant.features.join(', ')}</p>
                </div>
            `;
            
            requestCard.innerHTML = cardContent;
            requestSection.appendChild(requestCard);
        });
        
    } catch (error) {
        console.error('Error fetching tenant requests:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayTenantRequests);
