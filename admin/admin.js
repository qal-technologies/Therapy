import { db, logout } from '../js/auth.js';
import { collection, getDocs, getDoc, onSnapshot, query, orderBy, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import handleAlert from '../js/general.js';

function formatTimestamp(timestamp) {
    if (!timestamp || !timestamp.seconds) {
        return '';
    }

    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const timeFormat = { hour: '2-digit', minute: '2-digit' };
    const timeString = new Intl.DateTimeFormat('en-US', timeFormat).format(date);

    if (date.toDateString() === now.toDateString()) {
        return `Today, ${timeString}`;
    }

    if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday, ${timeString}`;
    }

    const dayFormat = { weekday: 'short' };
    const dateFormat = { day: 'numeric', month: 'short' };
    const yearFormat = { year: 'numeric' };

    const dayString = new Intl.DateTimeFormat('en-US', dayFormat).format(date);
    const dateString = new Intl.DateTimeFormat('en-US', dateFormat).format(date);
    const yearString = new Intl.DateTimeFormat('en-US', yearFormat).format(date);

    if (date.getFullYear() === now.getFullYear()) {
        if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) { // Within a week
            return `${dayString}, ${dateString} - ${timeString}`;
        }
        return `${dateString} - ${timeString}`;
    }

    return `${dateString}, ${yearString} - ${timeString}`;
}


document.addEventListener('DOMContentLoaded', () => {
    function cleanUp() {
        const messageInput = document.querySelector('.message-input');
        if (messageInput) messageInput.value = '';

        const chatSearchInput = document.querySelector('.chat-view .chat-search-input');
        if (chatSearchInput) chatSearchInput.value = '';

        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) searchContainer.classList.remove('visible');

        const chatHeader = document.querySelector('.chat-header');
        if (chatHeader) chatHeader.classList.remove('visible');

        const noResultsMessage = document.querySelector('#no-results-message');
        if (noResultsMessage) noResultsMessage.style.display = 'none';

        document.querySelectorAll('.message-container .message-bubble').forEach(bubble => {
            bubble.style.border = '';
            bubble.style.borderRadius = '';
            bubble.style.marginLeft = '';
        });

        document.querySelectorAll('.user-list-item').forEach(item => item.classList.remove('active'));

        if (replyPreview && replyPreview.style.display === 'flex') {
            focusedMessage = null;
            sendBtn.disabled = true;
            messageInput.value = '';
            messageInput.style.height = '50px';
            messageInput.disabled = true;

            replyPreview.style.display = 'none';
        }

        if (paymentInstructions && paymentInstructions.style.display === 'block') {
            paymentInstructions.style.display = 'none';
        }


        searchIcons.forEach(btn => btn.classList.toggle('active', btn.classList.contains('bi-search')));

    }

    async function verifyAdminSession() {
        const adminId = localStorage.getItem('adminId');
        const sessionToken = localStorage.getItem('adminSessionToken');

        if (!adminId || !sessionToken) {
            logout();
            window.location.href = 'index.html';
            return;
        }

        try {
            const response = await fetch('/.netlify/functions/verify-admin-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminId, token: sessionToken }),
            });

            if (!response.ok) {
                logout();
                localStorage.clear();
                sessionStorage.clear();
                handleAlert('Your session has expired or is invalid. Please log in again.', 'blur', true, 'Session Invalid', true, [{ text: 'OK', onClick: () => window.location.href = 'index.html' }]);
            }
        } catch (error) {
            console.error('Error verifying admin session:', error);
        }
    }

    // verifyAdminSession();


    const userListContainer = document.querySelector('.user-list-container');
    const chatView = document.querySelector('.chat-view');
    const sidebar = document.querySelector('.sidebar');

    if (window.innerWidth > 768) {
        chatView.classList.add('no-chat');
    }

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

            const emptyDiv = document.querySelector('.chat-empty');

            if (emptyDiv) {
                emptyDiv.remove();
            }

            const filterIconn = document.querySelector('.filter-icon')
            if (filterIconn) {
                filterIconn.style.display = 'block';
            }

            ;
        } catch (error) {
            console.error("Error fetching users: ", error);
        } finally {
            userListContainer.querySelector('.loading-parent')?.remove()
        }
    }

    function addUserToList(user, prepend = false) {
        const colors = ['#dcf8c6', '#b7f8c8', '#b7e8f8', '#f8b7b7', '#f8d8b7', '#f8f8b7'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

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

        const unreadCount = user.unread_count || 0;


        userElement.innerHTML = `
            <div class="user-avatar" style="background:${randomColor}">${user.details.firstName[0] || "U"}</div>
                    <div class="side">
                        <div class="user-info upper">
                             <span class="user-name">${user.details.firstName || ''} ${user.details.lastName || ''}</span>
                             <span class="last-message-time">${displayTime}</span>
                        </div>

                        <div class="lower">
                            <span class="last-message">${user.last_message || user.details.email}</span>
                             <span class="unread-count" style="${unreadCount > 0 ? '' : 'display: none;'}">${unreadCount}</span>  
                        </div>
                    </div>
        `;

        if (prepend) {
            userListContainer.prepend(userElement);
        } else {
            userListContainer.appendChild(userElement);
        }

        userElement.addEventListener('click', () => {
            markAsOpened(user.id);
            userElement.classList.remove('active');

            cleanUp();

            if (window.innerWidth <= 768) {
                sidebar.style.display = 'none';
                chatView.classList.add('active');
            }

            if (window.innerWidth > 768) {
                chatView.classList.remove('no-chat');
            }
            loadChatForUser(user);
        });
    }

    async function loadChatForUser(user) {
        const messageContainer = document.querySelector('.message-container');
        chatView.classList.remove('no-chat');

        const chatHeaderIcon = document.querySelector('.chat-header .user-avatar');
        chatHeaderIcon.textContent = `${user.details.firstName[0] || "U"}`;

        const chatHeaderName = document.querySelector('.chat-header .user-name');
        chatHeaderName.textContent = `${user.details.firstName} ${user.details.lastName}`;

        const chatHeaderEmail = document.querySelector('.chat-header .user-status');
        chatHeaderEmail.textContent = `${user.details.email}`;

        messageContainer.innerHTML = '';
        messageContainer.childNodes.forEach(child => child.remove());

        const events = [];

        sessionStorage.setItem('userId', user.id);

        messageContainer.innerHTML = `<div class="loading-parent">
                    <div class="spinner-container">
                        <div class="spinner"></div>
                    </div>
                </div>`;


        const userActivityRef = doc(db, 'user_activities', user.id);
        const userActivitySnap = await getDoc(userActivityRef);

        if (userActivitySnap.exists()) {
            const data = userActivitySnap.data();

            const signup = data.signup || null;
            const details = data.details || null;
            const login = data.login || null;
            const payment = data.payment || null;
            const paymentInitiated = data.payment_initiated || null;
            const paymentMethod = data.method_selected || null;
            const waitlist = data.waitlist || null;
            const newsletter = data.newsletter || null;
            const logout = data.logout || null;
            const paysafeGuideline = data.paysafe_guideline || null;

            //audios:::
            const welcomeAudio = data.welcomeAudio || null;
            const sessionAudio = data.sessionAudio || null;
            const bookAudio = data.bookAudio || null;
            const shopAudio = data.shopAudio || null;

            //utilities::::
            const sessionBooked = data.sessionBooked || null;
            const cart = data.cart || null;
            const book = data.book || null;

            if (signup) events.push({ type: 'signup', ...signup });
            if (login) events.push({ type: 'login', ...login });
            if (payment) events.push({ type: 'payment', ...payment });
            if (details) events.push({ type: 'details', ...details });
            if (waitlist) events.push({ type: 'waitlist', ...waitlist });
            if (newsletter) events.push({ type: 'newsletter', ...newsletter });
            if (logout) events.push({ type: 'logout', ...logout });
            if (paymentInitiated) events.push({ type: 'initiated', ...paymentInitiated });
            if (paymentMethod) events.push({ type: 'method-selected', ...paymentMethod });

            //audios::
            if (welcomeAudio) events.push({ type: 'welcome-audio', ...welcomeAudio });
            if (sessionAudio) events.push({ type: 'session-audio', ...sessionAudio });
            if (bookAudio) events.push({ type: 'book-audio', ...bookAudio });
            if (shopAudio) events.push({ type: 'shop-audio', ...shopAudio });

            //session booked || cart || book openning:::::::
            if (sessionBooked) events.push({ type: 'session-booked', ...sessionBooked });
            if (cart) events.push({ type: 'cart', ...cart });
            if (book) events.push({ type: 'book', ...book });
            if (paysafeGuideline) events.push({ type: 'paysafe_guideline', ...paysafeGuideline });
        }

        try {
            const paymentsSnapshot = await getDocs(collection(db, 'user_activities', user.id, 'payments'));
            paymentsSnapshot.forEach(docSnap => events.push({ type: 'payment', ...docSnap.data() }));
        } catch (_) {
            // Ignore if subcollection doesn't exist
        }

        try {
            const paysafeEventsSnapshot = await getDocs(collection(db, 'user_activities', user.id, 'paysafe_events'));
            paysafeEventsSnapshot.forEach(docSnap => events.push({ type: 'paysafe-code', ...docSnap.data() }));
        } catch (_) {
            // Ignore if subcollection doesn't exist
        }

        try {
            const repliesSnapshot = await getDocs(collection(db, 'user_activities', user.id, 'admin_replies'));
            repliesSnapshot.forEach(docSnap => events.push({ type: 'reply', ...docSnap.data() }));
        } catch (_) {
            // Ignore if subcollection doesn't exist
        }

        events.sort((a, b) => {
            const ta = a.timestamp?.seconds || 0;
            const tb = b.timestamp?.seconds || 0;
            return ta - tb;
        });


        events.forEach(event => {
            const messageBubble = document.createElement('div');
            messageBubble.classList.add('message-bubble');

            if (event.type === 'signup') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'signup' });

                const userDetails = events.find(e => e.type === 'details');

                const name = userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : "Unknown User";
                const email = userDetails?.email || "No email available";
                const country = userDetails?.country || "Unknown";
                const language = userDetails?.language || "English";
                const device = event.device || "Unknown device";

                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="SIGNUP">SIGNUP</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p><strong>${name}</strong> signed up using <strong>${device}</strong>.</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Country</strong>: ${country}</p>
                        <p><strong>Language</strong>: ${language}</p>
                    </div>
                `;
            } else if (event.type === 'login') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'login' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="LOGIN">LOGIN</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>

                        <p>User logged in from ${event.device}.</p>                    
                    </div>
                `;
            } else if (event.type === 'book') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'book' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="VIEW BOOK">VIEW BOOK</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>

                        <p>User just started reading ${event.title}.</p>                    
                    </div>
                `;
            } else if (event.type === 'welcome-audio') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'welcome-audio' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="AUDIO">AUDIO</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>

                        <p>User just played the welcome audio message.</p>                    
                    </div>
                `;
            } else if (event.type === 'shop-audio') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'shop-audio' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="AUDIO">AUDIO</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>

                        <p>User just played Book Audio Message.</p>                    
                    </div>
                `;
            } else if (event.type === 'session-audio') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'session-audio' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="AUDIO">AUDIO</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>

                        <p>User just played Session Audio Message.</p>                    
                    </div>
                `;
            } else if (event.type === 'book-audio') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'book-audio' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="AUDIO">AUDIO</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>

                        <p>User just played Session bookings Audio Message.</p>                    
                    </div>
                `;
            } else if (event.type === 'waitlist') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'waitlist' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="WAITLIST">WAITLIST</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p>User joined waitlist</p>
                    </div>
                `;
            } else if (event.type === 'newsletter') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'newsletter' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="NEWSLETTER">NEWSLETTER</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p>User subscribed for newsletter</p>
                    </div>
                `;
            } else if (event.type === 'logout') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'logout' });

                const loginEvents = events.filter(e => e.type === 'login' || e.type === 'signup');
                const lastLogin = loginEvents.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)[0];
                let duration = 'N/A';

                if (lastLogin) {
                    const logoutTime = new Date(event.timestamp.seconds * 1000);
                    const loginTime = new Date(lastLogin.timestamp.seconds * 1000);
                    const diffMs = logoutTime - loginTime;

                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

                    if (diffDays > 0) {
                        duration = `${diffDays}d ${diffHrs}h ${diffMins}m`;
                    } else if (diffHrs > 0) {
                        duration = `${diffHrs}h ${diffMins}m`;
                    } else {
                        duration = `${diffMins}m`;
                    }
                }

                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="LOGOUT">LOGOUT</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p>User logged out from this device: ${event.device}</p>
                        <p>User stayed for: ${duration}</p>
                    </div>
                `;
            } else if (event.type === 'paysafe_guideline') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: user.id, type: 'paysafe_guideline' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="PAYMENT">PAYMENT</span>
                                <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p>User clicked this paysafe guideline option: <strong>${event.action}</strong></p>
                    </div>
                `;
            } else if (event.type === 'cart') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'cart' });
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="CART">CART</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p>User added book (<b>${event.title}</b> - €${event.price}) to cart.</p>
                    </div>
                `;
            } else if (event.type === 'initiated') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'initiated' });

                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="PAYMENT">PAYMENT</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p>User initiated payment for: <strong>${event.paymentType} - €${event.amount}</strong>. <br/> Transaction ID: <strong>${event.id}</strong></p>
                    </div>
                `;
            } else if (event.type === 'method-selected') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'method-selected' });

                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="PAYMENT">PAYMENT</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p>User selected <strong>${event.method}</strong> payment method for <strong>${event.paymentType}</strong> payment.
<br/> Transaction ID: <strong>${event.id}</strong></p>
                    </div>
                `;
            } else if (event.type === 'paysafe-code') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'paysafe-code' });
                messageBubble.dataset.replyable = true;

                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="PAYMENT">PAYMENT</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p>User made payment for <strong>${event.paymentType} - (€${event.amount})</strong>.<br/>
                        Transaction ID: <strong>${event.id}</strong>, using method: <strong>${event.method}</strong></p>
                        <p>
                        <strong>CODES:</strong><br/>
                        ${event.codes.map(code => {
                    return `<span>${code}</span><br/>`;
                }).join('')}
                        </p>
                    </div>

                     <div class="reply-button">
                        <i class="bi bi-reply-fill"></i>
                    </div>
                `;
            } else if (event.type === 'session-booked') {
                messageBubble.classList.add('received');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'session-booked' });

                messageBubble.innerHTML = `
                    <div class="message-content">
                        <div class="tag-div">
                            <span class="tag-name" data-tag="SESSION">SESSION</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>
                        <p>User booked a session for: <strong>${event.title} - (€${event.price})</strong> with Transaction ID: <strong>${event.transactionId}</strong>.</p>

                        <div style='margin-top:5px;'>
                        <p>HERE ARE THE BOOKING RESPONSE FOR <strong>${event.title}:</strong></p>

                        ${event.answers.map(answer => {
                    return `<p><strong>${answer.question}</strong> <br/> Answer: ${answer.answer}</p>`;
                }).join('')}
                        </div>
                    </div>
                `;
            } else if (event.type === 'reply') {
                messageBubble.classList.add('sent');
                messageBubble.dataset.eventData = JSON.stringify({ id: event.id, type: 'reply' });

                messageBubble.innerHTML = `
                    <div class="message-content">
                    <div class="tag-div">
                             <span class="tag-name" data-tag="REPLY">TXN ID: ${event.paymentId}</span>
                             <span class="message-meta">${formatTimestamp(event.timestamp)}</span>
                        </div>

                        <p>${event.text}</p>
                    </div>
                `;
            }

            messageContainer.appendChild(messageBubble);
        });

        messageContainer.querySelector('.loading-parent')?.remove();
        messageContainer.scrollTop = messageContainer.scrollHeight;

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
    function handleSwipeStart(e) {
        const messageBubble = e.target.closest('.message-bubble');
        if (!messageBubble) return;

        let startX = e.touches ? e.touches[0].clientX : e.clientX;
        let isSwiping = false;

        function handleMove(moveEvent) {
            const currentX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
            const diffX = currentX - startX;

            if (diffX > 50) {
                isSwiping = true;
                messageBubble.style.transform = `translateX(${diffX}px)`;
            }
        }

        function handleEnd() {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);

            if (isSwiping) {
                if (navigator.vibrate) navigator.vibrate(30);
                setFocusedMessage(messageBubble);
            }

            // Reset translation
            messageBubble.style.transform = 'translateX(0)';
        }

        // Desktop
        document.addEventListener('mousemove', handleMove, { passive: true });
        document.addEventListener('mouseup', handleEnd);

        // Mobile
        document.addEventListener('touchmove', handleMove, { passive: true });
        document.addEventListener('touchend', handleEnd);
    }

    const messageContainer = document.querySelector('.message-container');
    const scrollToBottomBtn = document.getElementById('scroll-to-bottom-btn');

    messageContainer.addEventListener('scroll', () => {
        if (messageContainer.scrollHeight - messageContainer.scrollTop > messageContainer.clientHeight + 100) {
            scrollToBottomBtn.classList.add('visible');
        } else {
            scrollToBottomBtn.classList.remove('visible');
        }
    });

    scrollToBottomBtn.addEventListener('click', () => {
        messageContainer.scrollTo({
            top: messageContainer.scrollHeight,
            behavior: 'smooth'
        });
    });

    messageContainer.addEventListener('mousedown', handleSwipeStart);
    messageContainer.addEventListener('touchstart', handleSwipeStart, { passive: true });

    // Handle message sending
    const messageInput = document.querySelector('.message-input');
    const sendBtn = document.getElementById('send-btn');

    // Auto-resize textarea
    messageInput.addEventListener('input', (e) => {
        const value = e.target.value;
        const replyText = value.trim();

        if (replyText.length === 0) {
            sendBtn.disabled = true;
            messageInput.style.height = '50px';
            return;
        }

        messageInput.style.height = `${messageInput.scrollHeight}px`;
        sendBtn.disabled = replyText.length === 0;
    });

    sendBtn.addEventListener('click', () => {
        const replyText = messageInput.value.trim();
        const hasText = replyText.length > 0;
        if (sendBtn.disabled || !hasText || !focusedMessage) return;

        sendBtn.innerHTML = `<div class="spinner-container">
        <div class="spinner"></div>
      </div>`;

        const userId = sessionStorage.getItem('userId') || focusedMessage.dataset.eventData && JSON.parse(focusedMessage.dataset.eventData).id;
        const eventData = JSON.parse(focusedMessage.dataset.eventData);

        processAdminAction(userId, eventData.id, replyText).then(() => {
            messageInput.value = '';
            messageInput.style.height = '50px';
            messageInput.disabled = true;
            focusedMessage.classList.remove('focused');
            focusedMessage = null;
        }).finally(() => {
            cleanUp();
            sendBtn.disabled = true;
            sendBtn.innerHTML = `<i class="bi bi-send-fill"></i>`;
        });
    });


    const replyPreview = document.getElementById('reply-preview');
    const chatFooter = document.querySelector('.chat-view .chat-footer');

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const newHeight = entry.contentRect.height;
            messageContainer.style.paddingBottom = `${newHeight + 2}px`;
        }
    });

    /* resizeObserver.observe(chatFooter);*/

    function setFocusedMessage(messageElement) {
        if (focusedMessage) {
            focusedMessage.classList.remove('focused');
            focusedMessage.style.transform = 'translateX(0)';
            if (replyPreview && replyPreview.style.display === 'flex' && !messageElement.dataset.replyable) {
                focusedMessage = null;
                sendBtn.disabled = true;
                messageInput.value = '';
                messageInput.style.height = '50px';
                messageInput.disabled = true;

                replyPreview.style.display = 'none';
            }
        }


        if (messageElement.dataset.replyable) {
            focusedMessage = messageElement;
            focusedMessage.classList.add('focused');
            if (navigator.vibrate) navigator.vibrate(30);

            messageInput.disabled = false;
            messageInput.focus();

            const replyTag = document.getElementById('reply-tag');
            const replySnippet = document.getElementById('reply-snippet');

            const tagElement = messageElement.querySelector('.tag-name');
            const tagText = tagElement ? tagElement.textContent : 'Message';

            const messageText = messageElement.querySelector('.message-content p')?.textContent || '';
            const snippet = messageText.length > 50 ? messageText.slice(0, 50) + '...' : messageText;

            replyTag.textContent = tagText;
            replySnippet.textContent = snippet;

            scrollToBottomBtn.style.bottom = `${chatFooter.innerHeight + 8}px`;

            const check = replyPreview.classList.contains('zoom-out');
            if (check) replyPreview.classList.remove('zoom-out');

            replyPreview.style.display = 'flex';

            replyPreview.onclick = (e) => {
                if (e.target.closest(".cancel-reply")) return;
                focusedMessage.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                if (navigator.vibrate) navigator.vibrate(30);
            };
        }
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
            addSentMessage(replyText, paymentId);
            const replyPreview = document.getElementById('reply-preview');
            if (replyPreview) {
                replyPreview.style.display = 'none';
            }
        } catch (error) {
            console.error(error);
            alert('Failed to process your request. Please try again.', error);
        }
    }

    function addSentMessage(text, id) {
        const messageContainer = document.querySelector('.message-container');
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble', 'sent');

        messageBubble.innerHTML = `
            <div class="message-content">
                <div class="tag-div">
                    <span class="tag-name" data-tag="REPLY">TXN ID: ${id}</span>
                             <span class="message-meta">${formatTimestamp(new Date())}</span>
                </div>
                <p>${text}</p>
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
        document.querySelector('.chat-header .upper .out').prepend(backButton);

        backButton.addEventListener('click', () => {
            cleanUp();
            sessionStorage.removeItem('userId');
            if (window.innerWidth <= 768) {
                chatView.classList.remove('active');
                sidebar.style.display = 'flex';
            }
        });
    }

    document.getElementById('cancel-reply').addEventListener('click', (e) => {
        e.stopPropagation();

        if (replyPreview) {
            replyPreview.style.display = 'none';
        }
        if (focusedMessage) {
            focusedMessage.classList.remove('focused');
            focusedMessage = null;
            sendBtn.disabled = true;
            messageInput.value = '';
            messageInput.style.height = '50px';
            messageInput.disabled = true;
        }
    });

    const filterIcon = document.querySelector('.filter-icon');
    const filterOptions = document.querySelector('.filter-options');

    filterIcon.addEventListener('click', () => {
        const isDisplayed = filterOptions.style.display === 'block';
        filterIcon.innerHTML = isDisplayed ? '<i class="bi bi-filter"></i>' : '<i class="bi bi-x-lg" style="color:red;"></i>'

        filterOptions.style.display = isDisplayed ? 'none' : 'block';
        if (isDisplayed) {
            searchInput.value = '';
            document.querySelectorAll('.filter-options button').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.filter-options button[data-filter="all"]').classList.add('active');
            filterAndSearchUsers();
        }
    });

    const searchInput = document.querySelector('.sidebar .search-bar input');
    const searchIcon = document.querySelector('.sidebar .search-bar .bi-search');

    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', () => {
            searchInput.focus();
        });
    }
    searchInput.addEventListener('input', filterAndSearchUsers);

    filterOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('.filter-options button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            filterAndSearchUsers();
        }
    });


    function filterAndSearchUsers() {
        const userItems = document.querySelectorAll('.user-list-item');
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilterButton = document.querySelector('.filter-options button.active');
        if (!activeFilterButton) return;
        const filter = activeFilterButton.dataset.filter;

        const emptyPlaceholder = document.querySelector('.empty-list-placeholder');
        let visibleUsers = 0;
        let firstMatch = null;

        userItems.forEach(item => {
            const userName = item.querySelector('.user-name').textContent.toLowerCase();
            const tags = item.dataset.tags;

            let showByFilter = false;
            switch (filter) {
                case 'all':
                    showByFilter = true;
                    break;
                case 'unread':
                    showByFilter = item.classList.contains('active');
                    break;
                default:
                    showByFilter = tags.includes(filter);
            }

            const showBySearch = userName.includes(searchTerm);

            if (showByFilter && showBySearch) {
                item.style.display = 'flex';
                if (!firstMatch) {
                    firstMatch = item;
                }
                visibleUsers++;
            } else {
                item.style.display = 'none';
            }
        });



        if (emptyPlaceholder) {
            emptyPlaceholder.style.display = visibleUsers === 0 ? 'flex' : 'none';
        }
    }

    const refreshIcon = document.querySelector('.sidebar-header .bi-arrow-clockwise');
    refreshIcon.addEventListener('click', () => {
        userListContainer.innerHTML = '';
        fetchAndDisplayUsers();
    });

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        handleAlert("Are you sure you want to log out?<br/> You won't receive notifactions and user activities update.", 'blur', true, 'Logout', true, [
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

    let firstMatch = null;
    const chatSearchInput = document.querySelector('.chat-view .chat-search-input');
    const searchIcons = document.querySelectorAll('.chat-view .header-icons i.use');

    const infoBtn = document.getElementById('info-btn');
    const paymentInstructions = document.querySelector('.payment-instructions');
    const closeInstructionsBtn = document.getElementById('close-instructions-btn');

    if (infoBtn && paymentInstructions && closeInstructionsBtn) {
        infoBtn.addEventListener('click', () => {
            paymentInstructions.style.display = 'block';
        });

        closeInstructionsBtn.addEventListener('click', () => {
            paymentInstructions.style.display = 'none';
        });
    }

    if (searchIcons && chatHeader) {
        searchIcons.forEach(searchIcon => {
            searchIcon.addEventListener('click', (e) => {
                const isVisible = chatHeader.classList.contains('visible');
                chatHeader.classList.toggle('visible');
                document.querySelector('.search-container')?.classList.toggle('visible');
                const noResultsMessage = document.getElementById('no-results-message');
                if (noResultsMessage && noResultsMessage.style.display === 'block') {
                    noResultsMessage.style.display = 'none';
                }

                if (!isVisible) {
                    chatSearchInput.focus();
                } else {
                    chatSearchInput.value = '';
                    chatSearchInput.blur();
                    const messageBubbles = document.querySelectorAll('.message-container .message-bubble');
                    messageBubbles.forEach(bubble => {
                        bubble.style.border = '';
                        bubble.style.borderRadius = '';
                        bubble.style.marginLeft = '';
                    });
                    firstMatch = null;
                }

                searchIcons.forEach(btn => btn.classList.toggle('active', btn !== e.target));
            });
        });
    }

    const searchButton = document.querySelector('.chat-view .chat-search-btn');
    chatSearchInput.addEventListener('input', (e) => {
        const noResultsMessage = document.querySelector('#no-results-message');
        if (noResultsMessage && noResultsMessage.style.display === 'block') noResultsMessage.style.display = 'none';
        searchButton.disabled = e.target.value.trim().length === 0
    });

    chatSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !searchButton.disabled) {
            e.preventDefault();
            const noResultsMessage = document.querySelector('#no-results-message');
            if (noResultsMessage && noResultsMessage.style.display === 'block') {
                noResultsMessage.style.display = 'none';
            }
            searchButton.click();
        }
    });


    searchButton.addEventListener('click', (e) => {
        e.preventDefault();

        const searchTerm = chatSearchInput.value.toLowerCase();
        if (searchTerm === '') {
            const messageBubbles = document.querySelectorAll('.message-container .message-bubble');

            messageBubbles.forEach(bubble => {
                bubble.style.border = '';
                bubble.style.borderRadius = '';

                bubble.style.marginLeft = '';

            });
            firstMatch = null;
            return;
        }


        const messageBubbles = document.querySelectorAll('.message-container .message-bubble');
        const noResultsMessage = document.getElementById('no-results-message');
        let matchesFound = 0;

        messageBubbles.forEach(bubble => {
            const messageContent = bubble.querySelector('.message-content p')?.textContent.toLowerCase();
            if (messageContent && messageContent.includes(searchTerm) && bubble.classList.contains('received') && !bubble.classList.contains('sent')) {
                if (!firstMatch) {
                    firstMatch = bubble;
                }
                bubble.style.border = '1px solid green';
                bubble.style.borderRadius = '20px';
                bubble.style.marginLeft = '20px';
                matchesFound++;
            } else {
                bubble.style.border = '';
                bubble.style.borderRadius = '';
                bubble.style.marginLeft = '';
            }
        });

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center', });
        }

        if (noResultsMessage) {
            noResultsMessage.style.display = matchesFound === 0 ? 'block' : 'none';
        }

        chatSearchInput.blur();
    });

    // Request permission for notifications
    function requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    const granted = localStorage.getItem('notificationPermission');

                    if (!granted) {
                        localStorage.setItem('notificationPermission', 'granted');

                        handleAlert('Notification permission granted', 'toast');
                    }
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
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'show-notification',
                    title: title,
                    body: body
                });
            } else {
                new Notification(title, { body });
            }
        }
    }

    fetchAndDisplayUsers();

    // Implement the onSnapshot listener for real-time updates
    const usersCollectionRef = collection(db, 'user_activities');
    const q = query(usersCollectionRef, orderBy('last_update', 'desc'));

    const notifiedUsers = new Set();

    onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
            const user = { id: change.doc.id, ...change.doc.data() };
            const existingUserElement = document.querySelector(`.user-list-item[data-user-id="${user.id}"]`);

            const handleNotification = async () => {
                const lastUpdate = user.last_update?.toMillis() || 0;
                const lastNotified = user.last_notified?.toMillis() || 0;

                if (user.unread_count > 0 && lastUpdate > lastNotified) {
                    // Jules: Use the last_message field for more specific notifications
                    const notificationTitle = change.type === 'added' ? 'New User' : `Update from ${user.details?.firstName || 'user'}`;
                    const notificationBody = user.last_message || `${user.details?.firstName || 'A user'}’s activity was updated.`;
                    showNotification(notificationTitle, notificationBody);

                    try {
                        const userDocRef = doc(db, 'user_activities', user.id);
                        await updateDoc(userDocRef, { last_notified: serverTimestamp() });
                    } catch (error) {
                        console.error("Error updating last_notified timestamp:", error);
                    }
                }
            };

            const notificationTitle = change.type === 'added' ? 'New User' : `Update from ${user.details?.firstName || 'user'}`;
            const notificationBody = user.last_message || `${user.details?.firstName || 'A user'}’s activity was updated.`;


            if (change.type === 'added') {
                if (!existingUserElement) {
                    addUserToList(user, true);

                    showNotification(notificationTitle, notificationBody);
                    notifiedUsers.add(user.id);
                }
            } else if (change.type === 'modified') {
                if (existingUserElement) {
                    existingUserElement.remove();
                }
                addUserToList(user, true);

                if (user.opened === false && !notifiedUsers.has(user.id)) {
                    showNotification(notificationTitle, notificationBody);
                    notifiedUsers.add(user.id);
                }

                const currentUserId = sessionStorage.getItem('userId');
                if (currentUserId === user.id) {
                    loadChatForUser(user);
                    markAsOpened(user.id);
                }
            }
        });
    });

    async function markAsOpened(userId) {
        const userActivityRef = doc(db, 'user_activities', userId);
        try {
            await updateDoc(userActivityRef, {
                opened: true,
                unread_count: 0
            });
            notifiedUsers.delete(userId);
        } catch (error) {
            console.error("Error marking user as opened:", error);
        }
    }

    requestNotificationPermission();
});
