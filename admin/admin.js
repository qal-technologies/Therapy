import { db, logout } from '../js/auth.js';
import { collection, getDocs, getDoc, onSnapshot, query, orderBy, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import handleAlert from '../js/general.js';

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
            const usersCollectionRef = collection(db, 'user_activities');
            const q = query(usersCollectionRef, orderBy('last_update', 'desc'));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                userListContainer.innerHTML = `<p class="chat-empty ">No users activities yet.</p>`;
                return;
            }

            querySnapshot.forEach(doc => {
                const user = { id: doc.id, ...doc.data() };
                addUserToList(user);
            });
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    }

    function addUserToList(user, prepend = false) {
        const userElement = document.createElement('div');
        userElement.classList.add('moveUpNfadeIn', 'user-list-item');
        userElement.dataset.userId = user.id;
        userElement.dataset.tags = Object.keys(user).join(' '); // Add tags for filtering
        if (!user.opened) {
            userElement.classList.add('active');
        }

        const lastUpdate = new Date(user.last_update.seconds * 1000);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);

        let displayTime = '';
        if (lastUpdate.toDateString() === now.toDateString()) {
            displayTime = lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (lastUpdate.toDateString() === yesterday.toDateString()) {
            displayTime = 'Yesterday';
        } else {
            displayTime = lastUpdate.toLocaleDateString();
        }

        userElement.innerHTML = `
            <div class="user-avatar">${user.details.firstName[0] || "U"}</div>
            <div class="user-info">
                <span class="user-name">${user.details.firstName || ''} ${user.details.lastName || ''}</span>
                <span class="last-message">${user.details.email}</span>
            </div>
            <div class="user-meta">
                <span class="last-message-time">${displayTime}</span>
            </div>
        `;

        if (prepend) {
            userListContainer.prepend(userElement);
        } else {
            userListContainer.appendChild(userElement);
        }

        userElement.addEventListener('click', () => {
            // Set the active user
            document.querySelectorAll('.user-list-item').forEach(item => item.classList.remove('active'));
            userElement.classList.add('active');

            markAsOpened(user.id);
            userElement.classList.remove('active');


            if (window.innerWidth <= 768) {
                sidebar.style.display = 'none';
                chatView.classList.add('active');
            }
            loadChatForUser(user);
        });
    }

    async function loadChatForUser(user) {
        const messageContainer = document.querySelector('.message-container');
        messageContainer.innerHTML = '';

        const chatHeaderName = document.querySelector('.chat-header .user-name');
        chatHeaderName.textContent = `${user.details.firstName} ${user.details.lastName}`;

        const events = [];
        // Fetch and combine all user activities and admin replies
        const signupSnapshot = await getDoc(doc(db, 'user_activities', user.id, 'signup'));
        if (signupSnapshot.exists()) events.push({ type: 'signup', ...signupSnapshot.data() });

        const loginSnapshot = await getDoc(doc(db, 'user_activities', user.id, 'login'));
        if (loginSnapshot.exists()) events.push({ type: 'login', ...loginSnapshot.data() });

        const paymentsSnapshot = await getDocs(collection(db, 'user_activities', user.id, 'payments'));
        paymentsSnapshot.forEach(doc => events.push({ type: 'payment', ...doc.data() }));

        const repliesSnapshot = await getDocs(collection(db, 'user_activities', user.id, 'admin_replies'));
        repliesSnapshot.forEach(doc => events.push({ type: 'reply', ...doc.data() }));

        events.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const prevEvent = events[i - 1];
            const nextEvent = events[i + 1];

            const messageBubble = document.createElement('div');

            messageBubble.classList.add('message-bubble');

            let batchClass = '';
            const isSameSender = prevEvent && prevEvent.type === event.type;
            const isWithin5Mins = prevEvent && (event.timestamp.seconds - prevEvent.timestamp.seconds) < 300;
            const nextIsSame = nextEvent && nextEvent.type === event.type && (nextEvent.timestamp.seconds - event.timestamp.seconds) < 300;

            if (isSameSender && isWithin5Mins) {
                batchClass = nextIsSame ? 'batch-middle' : 'batch-end';
            } else {
                batchClass = 'batch-start';
            }

            if (event.type === 'signup') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'signup' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name">SIGNUP</span>
                             <span class="message-meta">${new Date(event.timestamp.seconds * 1000).toLocaleString()}</span>
                        </div>
                        <p>User signed up.</p>
                    </div>
                    <div class="reply-button">
                        <i class="bi bi-reply-fill"></i>
                    </div>
                `;
            } else if (event.type === 'login') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'login' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name">LOGIN</span>
                             <span class="message-meta">${new Date(event.timestamp.seconds * 1000).toLocaleString()}</span>
                        </div>

                        <p>User logged in from ${event.device}.</p>                    
                    </div>
                    <div class="reply-button">
                        <i class="bi bi-reply-fill"></i>
                    </div>
                `;
            } else if (event.type === 'payment') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'payment' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name">PAYMENT</span>
                             <span class="message-meta">${new Date(event.timestamp.seconds * 1000).toLocaleString()}</span>
                        </div>
                        <p>Payment of ${event.currency} ${event.price} for ${event.paymentType}. Status: ${event.statusName}</p>
                    </div>
                    <div class="reply-button">
                        <i class="bi bi-reply-fill"></i>
                    </div>
                `;
            } else if (event.type === 'reply') {
                messageBubble.classList.add('sent');
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <p>${event.text}</p>
                        <span class="message-meta">${new Date(event.timestamp.seconds * 1000).toLocaleString()}</span>
                    </div>
                `;
            }

            messageContainer.appendChild(messageBubble);
        }

        // Add event listeners to reply buttons
        document.querySelectorAll('.reply-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const messageBubble = e.target.closest('.message-bubble');
                setFocusedMessage(messageBubble);
            });
        });
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

            if (diffX < -50) {
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
    const sendBtn = document.getElementById('send-btn');

    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = `${messageInput.scrollHeight}px`;

        // if (sendBtn.disabled) {
        //     sendBtn.disabled = false;
        // }
    });

    sendBtn.addEventListener('click', () => {
        const replyText = messageInput.value.trim();
        if (replyText === '' || !focusedMessage) return;

        sendBtn.innerHTML = `<div class="spinner-container">
        <div class="spinner"></div>
      </div>`;

        const userId = document.querySelector('.user-list-item.active').dataset.userId;
        const eventData = JSON.parse(focusedMessage.dataset.eventData);

        processAdminAction(userId, eventData.id, replyText).then(() => {
            messageInput.value = '';
            messageInput.style.height = 'auto';
            focusedMessage.classList.remove('focused');
            focusedMessage = null;
            sendBtn.disabled = true;
            sendBtn.innerHTML = `<i class="bi bi-send-fill"></i>`
        });
    });

    function setFocusedMessage(messageElement) {
        if (focusedMessage) {
            focusedMessage.classList.remove('focused');
        }

        focusedMessage = messageElement;
        focusedMessage.classList.add('focused');
        sendBtn.disabled = false;
        messageInput.focus();
    }

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
        messageContainer.scrollTop = messageContainer.scrollHeight;
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

    const filterIcon = document.querySelector('.filter-icon');
    const filterOptions = document.querySelector('.filter-options');

    filterIcon.addEventListener('click', () => {
        const isDisplayed = filterOptions.style.display === 'block';
        filterOptions.style.display = isDisplayed ? 'none' : 'block';
    });

    filterOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const filter = e.target.dataset.filter;
            filterUserList(filter);
            document.querySelectorAll('.filter-options button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    function filterUserList(filter) {
        const userItems = document.querySelectorAll('.user-list-item');
        userItems.forEach(item => {
            const tags = item.dataset.tags;
            let show = false;
            switch (filter) {
                case 'all':
                    show = true;
                    break;
                case 'unread':
                    show = item.classList.contains('active');
                    break;
                default:
                    show = tags.includes(filter);
            }
            item.style.display = show ? 'flex' : 'none';
        });
    }

    const refreshIcon = document.querySelector('.sidebar-header .bi-arrow-clockwise');
    refreshIcon.addEventListener('click', () => {
        userListContainer.innerHTML = '';
        fetchAndDisplayUsers();
    });

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        handleAlert('Are you sure you want to log out?', 'blur', true, 'Logout', true, [
            { text: 'Not Now', onClick: 'closeAlert', type: 'secondary' },
            {
                text: 'Yes, Logout', onClick: () => {
                    logout();
                    localStorage.removeItem('adminSessionToken');
                    localStorage.removeItem('adminId');
                    window.location.href = 'index.html';
                }
            }
        ]);
    });

    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeSwitcher.classList.toggle('bi-brightness-high-fill', !isDark);
        themeSwitcher.classList.toggle('bi-moon-fill', isDark);
    });

    // Request permission for notifications
    function requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    handleAlert('Notification permission granted', 'toast');
                } else {
                    handleAlert("Please grant notification permission for the admin dashboard functions to work properly.", "blur", true, "Notification", true, [{ text: "CLOSE", onClick: "closeAlert", type: 'secondary' }, {
                        text: "ACCEPT", onClick: () => {
                            requestNotificationPermission();
                            return 'closeAlert';
                        }
                    }])
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
    const usersCollectionRef = collection(db, 'user_activities');
    const q = query(usersCollectionRef, orderBy('last_update', 'desc'));
    onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const user = { id: change.doc.id, ...change.doc.data() };
            const existingUserElement = document.querySelector(`.user-list-item[data-user-id="${user.id}"]`);

            if (existingUserElement) {
                existingUserElement.remove();
            }
            addUserToList(user, true);

            if (change.type === "added") {
                showNotification('New User', `${user.details.firstName} has signed up.`);
            } else if (change.type === "modified") {
                showNotification('User Updated', `${user.details.firstName}'s profile has been updated.`);
            }
        });
    });

    async function markAsOpened(userId) {
        const userActivityRef = doc(db, 'user_activities', userId);
        try {
            await updateDoc(userActivityRef, { opened: true });
        } catch (error) {
            console.error("Error marking user as opened:", error);
        }
    }

    requestNotificationPermission();
});
