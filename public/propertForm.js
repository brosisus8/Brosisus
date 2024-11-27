document.getElementById('proprietaire-form').addEventListener('submit', async (e) => {
    alert('Form submitted');
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('owner', document.getElementById('name-proprietaire').value);
    formData.append('contact', document.getElementById('contact-proprietaire').value);
    formData.append('address', document.getElementById('adresse').value);
    formData.append('rentPrice', document.getElementById('price-rent').value);
    formData.append('roomSize', document.getElementById('room-size-prop').value);
    formData.append('features', document.getElementById('features').value);

    // Append the two images
    formData.append('photo1', document.getElementById('photo1').files[0]);
    formData.append('photo2', document.getElementById('photo2').files[0]);

    try {
        const response = await fetch('/api/property', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Property listed successfully!');
            window.location.href = '/availableProperties';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
