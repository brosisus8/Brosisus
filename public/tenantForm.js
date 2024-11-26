// For tenant form
document.getElementById('locataire-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Collect form data for tenant submission
    formData.append('name', document.getElementById('name-locataire').value);
    formData.append('contact', document.getElementById('contact-locataire').value);
    formData.append('city', document.getElementById('city-locataire').value);
    formData.append('budgetMax', document.getElementById('price-max').value);
    formData.append('roomSizeMin', document.getElementById('room-size').value);
    formData.append('features', document.getElementById('additional-features').value);
    formData.append('proof', document.getElementById('payment-proof').files[0]);

    try {
        // Submit tenant data
        const response = await fetch('/api/tenant', {
            method: 'POST',
            body: formData
        });
      
        if (response.ok) {
            booking();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function booking() {

    const name =  document.getElementById('name-locataire').value;
    const contact = document.getElementById('contact-locataire').value;
    const city = document.getElementById('city-locataire').value;
    const maxPrice = document.getElementById('price-max').value;
    const roomSize = document.getElementById('room-size').value;
    const features = document.getElementById('additional-features').value;
    
    let data = {
        name:name,
        contact:contact,
        city:city,
        maxPrice:maxPrice,
        roomSize:roomSize,
        features:features
    }
    console.log(data);

    try{
        const response = fetch('/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
            window.location.href = '/';
            alert('Your request has been Submitted we will contact you soon');
    } catch (error) {
        alert('Error submitting data:', error);
        console.error('Error:', error);
    }
    
}