import { db } from '../js/auth.js';
import { collection, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    // Basic security check: Redirect to login if no session token is found
    // if (!localStorage.getItem('adminSessionToken')) {
    //     window.location.href = 'index.html';
    //     return; // Stop script execution
    // }

    const userListContainer = document.querySelector('.user-list-container');
    const chatView = document.querySelector('.chat-view');
    const sidebar = document.querySelector('.sidebar');

    async function fetchAndDisplayUsers() {
        try {
            const usersCollectionRef = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollectionRef);

            querySnapshot.forEach(doc => {
                const userData = doc.data();
                const user = { id: doc.id, ...userData };
                addUserToList(user);
            });
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    }

    function addUserToList(user) {
        const userElement = document.createElement('div');
        userElement.classList.add('user-list-item');
        userElement.dataset.userId = user.id;

        const unreadCount = user.payments ? Object.values(user.payments).filter(p => p.status === null).length : 0;
        const lastPayment = user.payments ? Object.values(user.payments).sort((a, b) => b.date - a.date)[0] : null;

        userElement.innerHTML = `
            <div class="user-avatar">${user.details.firstName[0] || "U"}</div>
            <div class="user-info">
                <span class="user-name">${user.details.firstName || ''} ${user.details.lastName || ''}</span>
                <span class="last-message">${user.details.email}</span>
            </div>
            <div class="user-meta">
                <span class="last-message-time">${lastPayment ? new Date(lastPayment.date.seconds * 1000).toLocaleTimeString() : ''}</span>
                ${unreadCount > 0 ? `<span class="unread-count">${unreadCount}</span>` : ''}
            </div>
        `;

        userListContainer.appendChild(userElement);

        userElement.addEventListener('click', () => {
            // Set the active user
            document.querySelectorAll('.user-list-item').forEach(item => item.classList.remove('active'));
            userElement.classList.add('active');

            if (window.innerWidth <= 768) {
                sidebar.style.display = 'none';
                chatView.classList.add('active');
            }
            loadChatForUser(user);
        });
    }

    function loadChatForUser(user) {
        const messageContainer = document.querySelector('.message-container');
        messageContainer.innerHTML = '';

        const chatHeaderIcon = document.querySelector('.chat-header .user-avatar');

        const chatHeaderName = document.querySelector('.chat-header .user-name');
        chatHeaderName.textContent = `${user.details.firstName} ${user.details.lastName}`;
        chatHeaderIcon.textContent = `${user.details.firstName[0] || user.details.email[0] || ''}`

        if (user.payments) {
            const payments = Object.values(user.payments).sort((a, b) => a.date - b.date);
            payments.forEach(payment => {
                const messageBubble = document.createElement('div');
                messageBubble.classList.add('message-bubble', 'received');
                messageBubble.dataset.paymentId = payment.id;

                messageBubble.innerHTML = `
                    <div class="message-content">
                        <p>Payment of ${payment.currency} ${payment.price} for ${payment.paymentType}. Status: ${payment.statusName}</p>
                        <span class="message-meta">${new Date(payment.date.seconds * 1000).toLocaleString()}</span>
                    </div>
                `;
                messageContainer.appendChild(messageBubble);
            });
        }
    }

    // Swipe to reply logic
    let focusedMessage = null;
    document.querySelector('.message-container').addEventListener('mousedown', (e) => {
        const messageBubble = e.target.closest('.message-bubble');
        if (!messageBubble) return;

        let startX = e.clientX;
        let isSwiping = false;

        const handleMouseMove = (moveEvent) => {
            const currentX = moveEvent.clientX;
            const diffX = currentX - startX;

            if (diffX < -50) { // Swipe left threshold
                isSwiping = true;
                messageBubble.style.transform = `translateX(${diffX}px)`;
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            if (isSwiping) {
                focusedMessage = messageBubble;
                // Add a visual indicator for the focused message
                document.querySelectorAll('.message-bubble').forEach(b => b.classList.remove('focused'));
                messageBubble.classList.add('focused');
                document.querySelector('.message-input').focus();
            }

            // Reset transform
            messageBubble.style.transform = 'translateX(0)';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });

    // Handle message sending
    const messageInput = document.querySelector('.message-input');
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && messageInput.value.trim() !== '') {
            const replyText = messageInput.value.trim();

            if (!focusedMessage) {
                // If no message is swiped, select the last one
                const allMessages = document.querySelectorAll('.message-container .message-bubble');
                focusedMessage = allMessages[allMessages.length - 1];
            }

            const userId = document.querySelector('.user-list-item.active').dataset.userId;
            const paymentId = focusedMessage.dataset.paymentId;

            processAdminAction(userId, paymentId, replyText);

            messageInput.value = '';
            if (focusedMessage) {
                focusedMessage.classList.remove('focused');
            }
            focusedMessage = null;
        }
    });

    async function processAdminAction(userId, paymentId, replyText) {
        try {
            const response = await fetch('/.netlify/functions/process-admin-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, paymentId, replyText }),
            });

            if (!response.ok) {
                throw new Error('Failed to process admin action.');
            }

            // Optionally, add the admin's reply to the chat view as a "sent" message
            addSentMessage(replyText);

        } catch (error) {
            console.error(error);
            alert('Failed to process your request. Please try again.');
        }
    }

    function addSentMessage(text) {
        const messageContainer = document.querySelector('.message-container');
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble', 'sent');

        messageBubble.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-meta">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        messageContainer.appendChild(messageBubble);
        messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom
    }


    // Logic to go back to the user list on mobile
    const chatHeader = document.querySelector('.chat-header');
    if (chatHeader) {
        const backButton = document.createElement('i');
        backButton.classList.add('bi', 'bi-arrow-left', 'back-button');
        chatHeader.prepend(backButton);

        backButton.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                chatView.classList.remove('active');
                sidebar.style.display = 'flex';
            }
        });
    }

    // Request permission for notifications
    function requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                }
            });
        }
    }

    // Show a browser notification
    function showNotification(title, body) {
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        }
    }

    fetchAndDisplayUsers();

    // Implement the onSnapshot listener for real-time updates
    const usersCollectionRef = collection(db, 'users');
    onSnapshot(usersCollectionRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const user = { id: change.doc.id, ...change.doc.data() };
            const existingUserElement = document.querySelector(`.user-list-item[data-user-id="${user.id}"]`);

            if (change.type === "added" && !existingUserElement) {
                addUserToList(user);
                showNotification('New User', `${user.details.firstName} has signed up.`);
            }
            if (change.type === "modified") {
                if (existingUserElement) {
                    existingUserElement.remove();
                }
                addUserToList(user); // Re-add to update position and details
                // More specific notifications can be added here
                showNotification('User Updated', `${user.details.firstName}'s profile has been updated.`);
            }
            if (change.type === "removed") {
                if (existingUserElement) {
                    existingUserElement.remove();
                }
            }
        });
    });

    requestNotificationPermission();
});
