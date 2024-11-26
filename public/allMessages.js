  async function fetchAndDisplayMessages() {
      const userKey = localStorage.getItem('brosisus_user_key');
    
      try {
          const response = await fetch(`/api/messages`);
          const messages = await response.json();
        
          const messageSection = document.querySelector('.messageCardSection');
          messageSection.innerHTML = ''; // Clear existing content
        
          messages.forEach(message => {
              const messageCard = document.createElement('div');
              messageCard.className = 'message-card';
            
              const messageContent = `
                  <div class="message-content">
                      <p>Message:</p>
                      <p class="messageContent">${message.content}</p>
                      <small class="time">Added: ${new Date(message.timestamp).toLocaleString()}</small>
                  </div>
                  <div class="response-input">
                      <p>Response:</p>
                      <textarea class="response-text" placeholder="Write your response..."></textarea>
                      <button class="response-button" onclick="sendResponse('${message._id}', '${message.senderId}')">Send</button>
                  </div>
              `;
            
              messageCard.innerHTML = messageContent;
              messageSection.appendChild(messageCard);
          });
        
      } catch (error) {
          console.error('Error fetching messages:', error);
      }
  }

  async function sendResponse(messageId, recipientId) {
      // Get the specific button that was clicked
      const button = event.target;
      // Navigate up to the message card and then find its textarea
      const messageCard = button.closest('.message-card');
      const responseText = messageCard.querySelector('.response-text').value;
    
      const userKey = localStorage.getItem('brosisus_user_key');

      try {
          const response = await fetch('/api/message/respond', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  messageId,
                  userId: userKey,
                  recipientId,
                  text: responseText
              })
          });
        
          if (response.ok) {
              fetchAndDisplayMessages();
              alert('Response sent successfully!');
          }
      } catch (error) {
          console.error('Error sending response:', error);
      }
  }

  document.addEventListener('DOMContentLoaded', fetchAndDisplayMessages);
