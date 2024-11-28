
document.addEventListener('DOMContentLoaded', getUserKey());
async function getUserKey() {
    let userKey = localStorage.getItem('userkey');
    if (!userKey) {
        userKey = 'user_' + Date.now() + Math.random().toString(36).substring(2);
        localStorage.setItem('userkey', userKey);
        console.log('Generated new key:', userKey);
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userKey
        });
        if (response.ok){
            if (response.ok) {
                alert('Welcome New User!');
            }
        }
    } else {
        console.log('Using existing key:', userKey);
    }
}


