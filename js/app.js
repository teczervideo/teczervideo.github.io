document.addEventListener('DOMContentLoaded', () => {
    // Config
    const MAX_DAILY_PROJECTS = 2;
    const NOTIF_URL = 'data/notifications.json';

    // Elements
    const body = document.body;
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const uploadBtn = document.getElementById('upload-widget');
    const notifArea = document.getElementById('notification-feed');

    // Navigation Logic
    function switchTab(tabId) {
        // Validation
        if (!document.getElementById(tabId)) {
            console.error(`Tab ID '${tabId}' not found.`);
            return;
        }

        // Update Active Nav
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tabId);
        });

        // Update Section
        sections.forEach(sec => {
            if (sec.id === tabId) {
                sec.classList.add('active');
                // Trigger animation reset
                sec.style.animation = 'none';
                sec.offsetHeight; /* trigger reflow */
                sec.style.animation = 'fadeIn 0.4s ease';
            } else {
                sec.classList.remove('active');
            }
        });

        // Remove specific theme classes to enforce the global dark theme
        // User requested dark theme globally, so specific themes are disabled 
        // or re-mapped.
        body.className = '';
    }

    // Event Listeners for Nav
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump
            switchTab(item.dataset.tab);
        });
    });

    // Global Shortcuts
    window.goToSection = (tabId) => {
        switchTab(tabId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- DB / Notification System ---
    async function fetchNotifications() {
        if (!notifArea) return;

        try {
            notifArea.innerHTML = '<div style="color:#888;">Cargando notificaciones...</div>';
            const res = await fetch(NOTIF_URL);
            if (!res.ok) throw new Error("No DB connection");

            const data = await res.json();
            renderNotifications(data);
        } catch (e) {
            console.error(e);
            notifArea.innerHTML = '<div style="color:#d32f2f;">Error conectando a la base de datos de notificaciones.</div>';
        }
    }

    function renderNotifications(data) {
        if (data.length === 0) {
            notifArea.innerHTML = '<div>No hay nuevas notificaciones.</div>';
            return;
        }

        const html = data.map(item => `
            <div class="notif-item">
                <div>
                    <span class="notif-date">${item.date}</span>
                    <strong style="color: ${item.type === 'fix' ? '#ff6b6b' : '#1e90ff'}">[${item.type.toUpperCase()}]</strong>
                    ${item.title}
                </div>
                <div style="color:var(--text-secondary); margin-top:4px;">${item.message}</div>
            </div>
        `).join('');

        notifArea.innerHTML = html;
    }

    // --- Subscribe Simulation ---
    window.subscribeToUpdates = () => {
        const email = prompt("Ingresa tu email para recibir alertas de cambios en la DB:");
        if (email && email.includes('@')) {
            alert(`¡Gracias! ${email} ha sido añadido a la base de datos de suscriptores (MongoDB).`);
        } else if (email) {
            alert("Email inválido.");
        }
    };


    // --- AI Logic ---
    function checkDailyLimit() {
        const today = new Date().toDateString();
        const stored = JSON.parse(localStorage.getItem('ai_usage') || '{}');

        if (stored.date !== today) {
            return { count: 0, date: today };
        }
        return stored;
    }

    function incrementUsage(usage) {
        usage.count++;
        localStorage.setItem('ai_usage', JSON.stringify(usage));
    }

    async function sendMessage() {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;

        // Check Limit
        let usage = checkDailyLimit();
        if (usage.count >= MAX_DAILY_PROJECTS) {
            addMessage("AI", "Límite diario alcanzado (2/2). Vuelve mañana.");
            return;
        }

        // User Message
        addMessage("User", text);
        chatInput.value = '';

        // Simulate AI
        addMessage("AI", "Procesando solicitud...");

        setTimeout(() => {
            incrementUsage(usage);
            addMessage("AI", `He generado el boilerplate para: "${text}".\n\nPuedes descargarlo en tu panel de control.`);
        }, 1500);
    }

    function addMessage(sender, text) {
        if (!chatMessages) return;
        const div = document.createElement('div');
        div.style.marginBottom = '10px';
        div.style.padding = '8px 12px';
        div.style.borderRadius = '6px';
        div.style.fontSize = '0.9rem';
        div.style.background = sender === 'User' ? 'var(--accent-color)' : '#222';
        div.style.color = '#fff';
        div.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Upload Logic
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            alert("Conectando con servidor de subida...");
        });
    }

    // Init
    switchTab('info');
    fetchNotifications();
});
