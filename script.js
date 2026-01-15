// ===============================
// NAVIGATION ACTIVE LINK
// ===============================
document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    this.reset(); // Clear the form
                    alert('Thank you for your message!');
                } else {
                    alert('There was a problem submitting your form.');
                }
            }).catch(error => {
                alert('There was a problem submitting your form.');
            });
        });
    }
});

// ===============================
// CHAT WINDOW TOGGLE
// ===============================
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const launcher = document.getElementById('chat-launcher');

    // Prevent errors if chat is not on this page
    if (!chatWindow || !launcher) return;

    const isHidden =
        chatWindow.style.display === 'none' ||
        getComputedStyle(chatWindow).display === 'none';

    if (isHidden) {
        chatWindow.style.display = 'flex';
        launcher.style.display = 'none';
    } else {
        chatWindow.style.display = 'none';
        launcher.style.display = 'block';
    }
}

// ===============================
// SEND MESSAGE
// ===============================
function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (!inputField || !chatMessages) return;

    const messageText = inputField.value.trim();
    if (messageText === '') return;

    // User message
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-message';
    userMsgDiv.textContent = messageText;
    chatMessages.appendChild(userMsgDiv);

    inputField.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Bot response
    setTimeout(() => {
        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'message bot-message';

        if (isOpeningHoursQuery(messageText)) {
            botMsgDiv.textContent =
                "We are open Monday to Saturday from 7:30 AM to 4:30 PM.";
        } else {
            botMsgDiv.textContent =
                "Thank you for your message! Our service advisors will get back to you shortly.";
        }

        chatMessages.appendChild(botMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// ===============================
// OPENING HOURS CHECK
// ===============================
function isOpeningHoursQuery(message) {
    const keywords = [
        'opening hours',
        'opening times',
        'when open',
        'what time',
        'hours',
        'schedule',
        'working hours',
        'business hours',
        'open',
        'close'
    ];

    const lowerMessage = message.toLowerCase();
    return keywords.some(keyword => lowerMessage.includes(keyword));
}

// ===============================
// OPTIONAL: WHATSAPP SIMULATION
// ===============================
function sendToWhatsApp(message) {
    console.log(`Sending to WhatsApp advisors: ${message}`);

    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        botMsg.textContent =
            "Your message has been forwarded to our WhatsApp advisors.";
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    function sendWhatsApp() {
    const input = document.getElementById('wa-input');
    const message = input.value.trim();
    const phone = "263783953711"; // Your specific number

    if (message !== "") {
        // Construct the WhatsApp URL
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
        
        // Opens in a new small tab/window to simulate staying on site
        window.open(url, '_blank', 'width=400,height=600');
        
        input.value = ""; // Clear input
    }
}

function handleWAKey(event) {
    if (event.key === 'Enter') {
        sendWhatsApp();
    }
}

function toggleContact() {
    const menu = document.getElementById('contact-menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
}

function toggleWhatsApp() {
    const chat = document.getElementById('whatsapp-chat');
    const menu = document.getElementById('contact-menu');

    if (chat.style.display === "none" || chat.style.display === "") {
        chat.style.display = "flex";
        menu.style.display = 'none';
    } else {
        chat.style.display = "none";
    }
}

function selectWhatsAppNumber(number) {
    window.selectedWhatsAppNumber = number;
    const body = document.querySelector('.wa-body');
    const message = document.createElement('div');
    message.className = 'wa-message user';
    message.innerHTML = `<p>You selected +${number}</p><span class="wa-time">Just now</span>`;
    body.appendChild(message);
    body.scrollTop = body.scrollHeight;
}

function sendWhatsApp() {
    const input = document.getElementById('wa-input');
    const message = input.value.trim();
    if (message !== "" && window.selectedWhatsAppNumber) {
        const url = `https://api.whatsapp.com/send?phone=${window.selectedWhatsAppNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'width=400,height=600');
        input.value = "";
    } else if (!window.selectedWhatsAppNumber) {
        alert('Please select a WhatsApp number first.');
    }
}

}
function toggleContactMenu() {
    const menu = document.getElementById('contact-menu');
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

function openWA(number) {
    const message = "Hello Enterprise BMW, I have an inquiry regarding vehicle maintenance.";
    const url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
    
    // This opens the chat in a smaller foreground window
    const width = 600;
    const height = 700;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    
    window.open(url, "WhatsAppChat", `width=${width},height=${height},top=${top},left=${left},scrollbars=yes`);
}

// Close if clicked outside
window.onclick = function(event) {
    if (!event.target.closest('.floating-contact-container')) {
        document.getElementById('contact-menu').style.display = "none";
    }
}

// ===============================
// APPOINTMENT MODAL
// ===============================
function openAppointmentModal() {
    document.getElementById('appointment-modal').style.display = 'block';
}

function closeAppointmentModal() {
    document.getElementById('appointment-modal').style.display = 'none';
}

// Add event listener for close button
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('#appointment-modal .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAppointmentModal);
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('appointment-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (!event.target.closest('.floating-contact-container')) {
        document.getElementById('contact-menu').style.display = "none";
    }
}

// Handle form submission
document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for booking an appointment! We will contact you soon.');
            closeAppointmentModal();
            this.reset();
        } else {
            alert('There was a problem submitting your appointment. Please try again.');
        }
    }).catch(error => {
        alert('There was a problem submitting your appointment. Please try again.');
    });
});
