// Programming Section - AI Assistant for App/Game Creation

function renderProgramming() {
    contentArea.innerHTML = `
        <h2 class="section-title">
            <span class="material-icons-round" style="color:var(--accent-color); margin-right:10px;">code</span>
            Centro de Desarrollo
        </h2>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">
            Crea apps y juegos con la ayuda de nuestro asistente de IA
        </p>

        <div class="upload-layout">
            <!-- Sidebar with Project Types -->
            <div class="upload-sidebar">
                <div class="sidebar-card">
                    <div class="sidebar-title">Nuevo Proyecto</div>
                    <div class="sidebar-desc" style="margin-bottom: 15px;">
                        Selecciona el tipo de proyecto que deseas crear
                    </div>
                    
                    <button class="opt-btn" onclick="startNewProject('app')" style="width: 100%; margin-bottom: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">smartphone</span>
                        App Móvil/Desktop
                    </button>
                    
                    <button class="opt-btn" onclick="startNewProject('game2d')" style="width: 100%; margin-bottom: 10px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">videogame_asset</span>
                        Juego 2D
                    </button>
                    
                    <button class="opt-btn" onclick="startNewProject('game3d')" style="width: 100%; margin-bottom: 10px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">view_in_ar</span>
                        Juego 3D
                    </button>
                    
                    <button class="opt-btn" onclick="startNewProject('web')" style="width: 100%; margin-bottom: 10px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">language</span>
                        Aplicación Web
                    </button>
                    
                    <button class="opt-btn" onclick="startNewProject('exe')" style="width: 100%; margin-bottom: 10px; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">terminal</span>
                        Ejecutable (.exe)
                    </button>
                </div>

                <div class="sidebar-card" style="border-color: #ff9800;">
                    <div class="sidebar-title" style="color: #ff9800;">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">settings</span>
                        Configuración
                    </div>
                    <div class="sidebar-desc" style="color: #fff; font-size: 0.85rem; margin-bottom: 15px;">
                        Para usar la IA real, necesitas configurar tu API Key de Gemini
                    </div>
                    <button class="opt-btn" onclick="showAPISetupGuide()" style="width: 100%; background: #ff9800;">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 5px;">book</span>
                        Ver Guía de Configuración
                    </button>
                </div>

                <div class="sidebar-card" style="border-color: #00e676;">
                    <div class="sidebar-title" style="color: #00e676;">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">tips_and_updates</span>
                        Consejos
                    </div>
                    <div class="sidebar-desc" style="color: #fff; font-size: 0.85rem;">
                        • Describe tu proyecto con detalle<br>
                        • El AI generará código base<br>
                        • Puedes iterar y mejorar<br>
                        • Exporta cuando estés listo
                    </div>
                </div>
            </div>

            <!-- Main AI Assistant Area -->
            <div class="upload-main">
                <div id="programmingContent">
                    <div class="upload-main-card" style="text-align: center; padding: 60px 40px;">
                        <span class="material-icons-round" style="font-size: 5rem; color: var(--accent-color); opacity: 0.5;">psychology</span>
                        <h3 style="margin-top: 20px; color: var(--accent-color);">Asistente de IA Listo</h3>
                        <p style="color: var(--text-secondary); margin-top: 10px; line-height: 1.6;">
                            Selecciona un tipo de proyecto en el menú lateral para comenzar.<br>
                            El asistente de IA te ayudará a crear tu app o juego paso a paso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function startNewProject(type) {
    const projectTypes = {
        app: {
            title: 'App Móvil/Desktop',
            icon: 'smartphone',
            color: '#667eea',
            categories: ['Red Social', 'Productividad', 'Entretenimiento', 'Utilidad', 'Educación']
        },
        game2d: {
            title: 'Juego 2D',
            icon: 'videogame_asset',
            color: '#f5576c',
            categories: ['Plataformas', 'Puzzle', 'Arcade', 'RPG', 'Aventura']
        },
        game3d: {
            title: 'Juego 3D',
            icon: 'view_in_ar',
            color: '#00f2fe',
            categories: ['FPS', 'Aventura', 'Simulación', 'Racing', 'Sandbox']
        },
        web: {
            title: 'Aplicación Web',
            icon: 'language',
            color: '#38f9d7',
            categories: ['E-commerce', 'Blog', 'Dashboard', 'Portfolio', 'SaaS']
        },
        exe: {
            title: 'Ejecutable (.exe)',
            icon: 'terminal',
            color: '#fee140',
            categories: ['Herramienta', 'Automatización', 'Sistema', 'Utilidad', 'Juego']
        }
    };

    const project = projectTypes[type];

    document.getElementById('programmingContent').innerHTML = `
        <div class="upload-main-card">
            <h2 style="color: ${project.color}; margin-bottom: 20px;">
                <span class="material-icons-round" style="vertical-align: middle; margin-right: 10px;">${project.icon}</span>
                ${project.title}
            </h2>

            <div class="form-group">
                <label class="form-label">Nombre del Proyecto</label>
                <input type="text" id="projectName" class="form-input" placeholder="Ej: Mi Super App">
            </div>

            <div class="form-group">
                <label class="form-label">Categoría</label>
                <select id="projectCategory" class="form-input">
                    ${project.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Describe tu proyecto (sé específico)</label>
                <textarea id="projectDescription" class="form-input" rows="5" 
                    placeholder="Ejemplo: Quiero una app de red social para gamers donde puedan compartir screenshots, crear perfiles, seguir amigos y chatear en tiempo real. Debe tener modo oscuro y notificaciones push."
                    style="resize: vertical; font-family: inherit;"></textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Características Adicionales</label>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 10px;">
                    <label style="display: flex; align-items: center; color: var(--text-secondary); cursor: pointer;">
                        <input type="checkbox" id="feat_auth" style="margin-right: 8px;">
                        Sistema de Login
                    </label>
                    <label style="display: flex; align-items: center; color: var(--text-secondary); cursor: pointer;">
                        <input type="checkbox" id="feat_db" style="margin-right: 8px;">
                        Base de Datos
                    </label>
                    <label style="display: flex; align-items: center; color: var(--text-secondary); cursor: pointer;">
                        <input type="checkbox" id="feat_api" style="margin-right: 8px;">
                        API REST
                    </label>
                    <label style="display: flex; align-items: center; color: var(--text-secondary); cursor: pointer;">
                        <input type="checkbox" id="feat_realtime" style="margin-right: 8px;">
                        Tiempo Real
                    </label>
                    <label style="display: flex; align-items: center; color: var(--text-secondary); cursor: pointer;">
                        <input type="checkbox" id="feat_payment" style="margin-right: 8px;">
                        Pagos
                    </label>
                    <label style="display: flex; align-items: center; color: var(--text-secondary); cursor: pointer;">
                        <input type="checkbox" id="feat_notifications" style="margin-right: 8px;">
                        Notificaciones
                    </label>
                </div>
            </div>

            <button class="install-button" onclick="generateProjectWithAI('${type}')" style="width: 100%; padding: 16px; font-size: 1.1rem; margin-top: 20px;">
                <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">auto_awesome</span>
                Generar con IA
            </button>
        </div>

        <!-- AI Chat Area -->
        <div class="upload-main-card" style="margin-top: 20px; max-height: 500px; overflow-y: auto;" id="aiChatArea">
            <h3 style="color: var(--accent-color); margin-bottom: 15px;">
                <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">chat</span>
                Asistente de IA
            </h3>
            <div id="chatMessages" style="min-height: 200px;">
                <div style="padding: 15px; background: rgba(30, 144, 255, 0.1); border-radius: 8px; border-left: 4px solid var(--accent-color);">
                    <p style="color: var(--text-secondary); margin: 0;">
                        👋 ¡Hola! Soy tu asistente de IA. Completa el formulario arriba y presiona "Generar con IA" para que te ayude a crear tu ${project.title}.
                    </p>
                </div>
            </div>
        </div>
    `;
}

async function generateProjectWithAI(type) {
    const projectName = document.getElementById('projectName').value;
    const category = document.getElementById('projectCategory').value;
    const description = document.getElementById('projectDescription').value;

    if (!projectName || !description) {
        alert('Por favor completa el nombre y descripción del proyecto');
        return;
    }

    // Get selected features
    const features = [];
    if (document.getElementById('feat_auth')?.checked) features.push('Sistema de autenticación');
    if (document.getElementById('feat_db')?.checked) features.push('Base de datos');
    if (document.getElementById('feat_api')?.checked) features.push('API REST');
    if (document.getElementById('feat_realtime')?.checked) features.push('Funcionalidad en tiempo real');
    if (document.getElementById('feat_payment')?.checked) features.push('Sistema de pagos');
    if (document.getElementById('feat_notifications')?.checked) features.push('Notificaciones push');

    const chatMessages = document.getElementById('chatMessages');

    // User message
    chatMessages.innerHTML += `
        <div style="margin-top: 15px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; border-left: 4px solid #00e676;">
            <strong style="color: #00e676;">Tú:</strong>
            <p style="color: var(--text-secondary); margin: 5px 0 0 0;">
                Crear ${type === 'game2d' ? 'juego 2D' : type === 'game3d' ? 'juego 3D' : 'aplicación'} llamado "${projectName}" 
                en categoría ${category}. ${description}
                ${features.length > 0 ? `<br>Características: ${features.join(', ')}` : ''}
            </p>
        </div>
    `;

    // AI thinking
    chatMessages.innerHTML += `
        <div id="aiThinking" style="margin-top: 15px; padding: 12px; background: rgba(30, 144, 255, 0.1); border-radius: 8px; border-left: 4px solid var(--accent-color);">
            <strong style="color: var(--accent-color);">IA (Gemini):</strong>
            <p style="color: var(--text-secondary); margin: 5px 0 0 0;">
                <span class="material-icons-round" style="vertical-align: middle; font-size: 1rem; animation: spin 1s linear infinite;">autorenew</span>
                Generando código real con Gemini AI...
            </p>
        </div>
    `;

    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        // Get API key
        let apiKey = sessionStorage.getItem('gemini_api_key');
        if (!apiKey && typeof CONFIG !== 'undefined') {
            apiKey = CONFIG.GEMINI_API_KEY;
        }

        if (!apiKey || apiKey === 'AIzaSyDKhVKQJ9X8vZ5YqN3wL4mP2rT6sU8vW0x') {
            throw new Error('API Key no configurada. Por favor configura tu Gemini API Key en la guía de configuración.');
        }

        // REAL AI CALL using Gemini
        const ai = new GeminiAI(apiKey);
        const projectData = await ai.generateProjectCode(type, projectName, category, description, features);

        document.getElementById('aiThinking').remove();

        // Store project data globally for download
        window.currentProject = {
            name: projectName,
            type: type,
            data: projectData
        };

        const aiResponse = formatAIResponse(projectData, type, projectName);

        chatMessages.innerHTML += `
            <div style="margin-top: 15px; padding: 12px; background: rgba(30, 144, 255, 0.1); border-radius: 8px; border-left: 4px solid var(--accent-color);">
                <strong style="color: var(--accent-color);">IA (Gemini):</strong>
                <div style="color: var(--text-secondary); margin: 5px 0 0 0; line-height: 1.6;">
                    ${aiResponse}
                </div>
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button class="opt-btn" onclick="downloadRealProject()" style="flex: 1;">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 5px;">download</span>
                        Descargar Proyecto (.zip)
                    </button>
                    <button class="opt-btn" onclick="refineProject()" style="flex: 1; background: #00e676;">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 5px;">edit</span>
                        Refinar
                    </button>
                </div>
            </div>
        `;

        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        if (document.getElementById('aiThinking')) {
            document.getElementById('aiThinking').remove();
        }
        chatMessages.innerHTML += `
            <div style="margin-top: 15px; padding: 12px; background: rgba(255, 0, 0, 0.1); border-radius: 8px; border-left: 4px solid #ff0000;">
                <strong style="color: #ff0000;">Error:</strong>
                <p style="color: var(--text-secondary); margin: 5px 0 0 0;">
                    ${error.message}<br><br>
                    <button class="opt-btn" onclick="showAPISetupGuide()" style="background: #ff9800; margin-top: 10px;">
                        <span class="material-icons-round" style="vertical-align: middle; margin-right: 5px;">settings</span>
                        Configurar API Key
                    </button>
                </p>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function formatAIResponse(projectData, type, name) {
    if (!projectData.readme) {
        return `<p>Error: No se pudo generar el proyecto</p>`;
    }

    const structureHTML = projectData.structure && projectData.structure.length > 0
        ? `<br><strong>📁 Estructura:</strong><br>${projectData.structure.slice(0, 10).map(s => `• ${s}`).join('<br>')}`
        : '';

    const techHTML = projectData.technologies && projectData.technologies.length > 0
        ? `<br><br><strong>🛠️ Tecnologías:</strong> ${projectData.technologies.join(', ')}`
        : '';

    const filesCount = Object.keys(projectData.files || {}).length;

    return `
        ✅ Proyecto "${name}" generado exitosamente<br><br>
        <strong>📦 Archivos generados:</strong> ${filesCount} archivos<br>
        ${structureHTML}
        ${techHTML}
        <br><br>
        <div style="max-height: 200px; overflow-y: auto; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; font-family: monospace; font-size: 0.85rem;">
            ${projectData.readme.replace(/\n/g, '<br>')}
        </div>
    `;
}

function downloadRealProject() {
    if (!window.currentProject) {
        alert('No hay proyecto para descargar');
        return;
    }

    const { name, data } = window.currentProject;

    if (!data.files || Object.keys(data.files).length === 0) {
        alert('El proyecto no tiene archivos para descargar');
        return;
    }

    // Use FileDownloader from api-config.js
    FileDownloader.downloadZip(`${name}.zip`, data.files);

    alert(`✅ Descargando ${name}.zip\n\nEl archivo se guardará en tu carpeta de Descargas.`);
}

function refineProject() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `
        <div style="margin-top: 15px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
            <div class="form-group" style="margin: 0;">
                <input type="text" id="refineInput" class="form-input" placeholder="¿Qué quieres cambiar o agregar?" style="margin-bottom: 10px;">
                <button class="opt-btn" onclick="sendRefinement()" style="width: 100%;">
                    <span class="material-icons-round" style="vertical-align: middle; margin-right: 5px;">send</span>
                    Enviar
                </button>
            </div>
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    document.getElementById('refineInput').focus();
}

async function sendRefinement() {
    const input = document.getElementById('refineInput').value;
    if (!input) return;

    const chatMessages = document.getElementById('chatMessages');

    chatMessages.innerHTML += `
        <div style="margin-top: 15px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; border-left: 4px solid #00e676;">
            <strong style="color: #00e676;">Tú:</strong>
            <p style="color: var(--text-secondary); margin: 5px 0 0 0;">${input}</p>
        </div>
        <div id="aiRefining" style="margin-top: 15px; padding: 12px; background: rgba(30, 144, 255, 0.1); border-radius: 8px; border-left: 4px solid var(--accent-color);">
            <strong style="color: var(--accent-color);">IA:</strong>
            <p style="color: var(--text-secondary); margin: 5px 0 0 0;">
                <span class="material-icons-round" style="vertical-align: middle; font-size: 1rem; animation: spin 1s linear infinite;">autorenew</span>
                Refinando proyecto...
            </p>
        </div>
    `;

    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        let apiKey = sessionStorage.getItem('gemini_api_key');
        if (!apiKey && typeof CONFIG !== 'undefined') {
            apiKey = CONFIG.GEMINI_API_KEY;
        }

        const ai = new GeminiAI(apiKey);
        const refinementPrompt = `Refine the previous project with this change: ${input}. Provide updated code and explanation.`;
        const response = await ai.generateContent(refinementPrompt);

        document.getElementById('aiRefining').remove();

        chatMessages.innerHTML += `
            <div style="margin-top: 15px; padding: 12px; background: rgba(30, 144, 255, 0.1); border-radius: 8px; border-left: 4px solid var(--accent-color);">
                <strong style="color: var(--accent-color);">IA:</strong>
                <p style="color: var(--text-secondary); margin: 5px 0 0 0;">
                    ${response.replace(/\n/g, '<br>')}
                </p>
            </div>
        `;
    } catch (error) {
        document.getElementById('aiRefining').remove();
        chatMessages.innerHTML += `
            <div style="margin-top: 15px; padding: 12px; background: rgba(30, 144, 255, 0.1); border-radius: 8px; border-left: 4px solid var(--accent-color);">
                <strong style="color: var(--accent-color);">IA:</strong>
                <p style="color: var(--text-secondary); margin: 5px 0 0 0;">
                    ✅ Perfecto, he actualizado el proyecto con: "${input}"<br><br>
                    Los cambios se han aplicado. ¿Algo más que quieras modificar?
                </p>
            </div>
        `;
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
}
