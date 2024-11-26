document.getElementById("proprietaire-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("problem").value;

    let Data = {
        name: name,
        email: email,
        message: message
    }

    try{
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        })
        alert('Message sent successfully!');
        window.location.href = '/';
    }catch(error){
        console.error('Error:', error);
    }
});