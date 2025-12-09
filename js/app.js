document.addEventListener('DOMContentLoaded', () => {
    // Config
    const REPO_USER = 'teczervideo';
    const MAX_DAILY_PROJECTS = 2;

    // Elements
    const body = document.body;
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const uploadBtn = document.getElementById('upload-widget');

    // Navigation Logic
    function switchTab(tabId) {
        // Update Active Nav
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tabId);
        });

        // Update Section
        sections.forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');

        // Update Theme
        body.className = ''; // Reset
        if (tabId === 'info') body.classList.add('theme-info');
        else if (tabId === 'games') body.classList.add('theme-games');
        else if (tabId === 'programming') body.classList.add('theme-programming');
        else if (tabId === 'shortcuts') {
            // Shortcuts page can have a mixed or neutral theme, 
            // will keep previous or default. Let's start with info.
            body.classList.add('theme-info');
        }
    }

    // Event Listeners for Nav
    navItems.forEach(item => {
        item.addEventListener('click', () => switchTab(item.dataset.tab));
    });

    // Event Listeners for Shortcuts
    window.goToSection = (tabId) => {
        switchTab(tabId);
        window.scrollTo(0, 0);
    };

    // AI Logic
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

    async function handle sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Check Limit
        let usage = checkDailyLimit();
        if (usage.count >= MAX_DAILY_PROJECTS) {
            addMessage("AI", "Lo siento, has alcanzado el límite de 2 proyectos diarios.");
            return;
        }

        // User Message
        addMessage("User", text);
        chatInput.value = '';

        // Simulate AI
        addMessage("AI", "Analizando tu idea... 🧠");

        setTimeout(() => {
            incrementUsage(usage);
            const response = generateMockResponse(text);
            // Remove 'Analizando...' (optional, or just append)
            // Ideally remove last message, but for simplicity we append.
            addMessage("AI", `Generando código para: "${text}"...\n\nHecho. Aquí tienes una estructura inicial para tu proyecto.`);

            // Show Consent button availability simulation
            // addMessage("System", "Proyecto subido. ¿Deseas dar consentimiento para colaboración?");
        }, 2000);
    }

    function addMessage(sender, text) {
        const div = document.createElement('div');
        div.className = `message ${sender.toLowerCase()}`;
        div.style.marginBottom = '10px';
        div.style.padding = '10px';
        div.style.borderRadius = '8px';
        div.style.background = sender === 'User' ? 'var(--accent-color)' : 'var(--bg-secondary)';
        div.style.color = sender === 'User' ? '#fff' : 'var(--text-primary)';
        div.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateMockResponse(idea) {
        return `// Proyecto: ${idea}\n// Creado por TeczerVideo AI\n\nfunction init() {\n  console.log("Iniciando ${idea}...");\n}`;
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Upload Logic
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            alert("Abriendo panel de subida de proyectos... (Simulado)");
        });
    }

    // Init
    switchTab('info');
});
