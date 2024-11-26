
async function fetchAndDisplayMessages() {
    const userKey = localStorage.getItem('brosisus_user_key');
    console.log('User Key:', userKey);
    
    try {
        const response = await fetch(`/api/messages/${userKey}`);
        const messages = await response.json();
        
        const messageSection = document.querySelector('.messageCardSection');
        messageSection.innerHTML = ''; // Clear existing content
        
        messages.forEach(message => {
            console.log('Message:', message);
            const messageCard = document.createElement('div');
            messageCard.className = 'message-card';
            
            const messageContent = `
                <div class="message-content">
                    <p>Message:</p>
                    <p class="messageContent">${message.content}</p>
                    <small class="time">Sent: ${new Date(message.timestamp).toLocaleString()}</small>
                </div>
                <div class="message-responses">
                    <p>Responses:</p>
                    ${message.responses && message.responses.length > 0 
                        ? message.responses.map(response => `
                            <div class="response">
                                <p>${response.text}</p>
                                <small>Replied: ${new Date(response.timestamp).toLocaleString()}</small>
                            </div>
                        `).join('')
                        : '<p class="no-response">No responses yet</p>'
                    }
                </div>
            `;
            
            messageCard.innerHTML = messageContent;
            messageSection.appendChild(messageCard);
        });
        
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayMessages);