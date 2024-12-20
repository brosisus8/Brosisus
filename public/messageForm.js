document.getElementById('messagerie-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userKey = localStorage.getItem('userkey');
    
    const messageData = {
        content: document.getElementById('message').value,
        senderId: userKey,
    };

    try {
        const response = await fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        });
        if (response.ok) {
            alert('Message sent successfully!');
            document.getElementById('message').value = '';
            window.location.href = '/messages'
        }
    } catch (error) {
        console.error('Error:', error);
    }
});