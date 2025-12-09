// Show API Setup Guide
function showAPISetupGuide() {
    document.getElementById('programmingContent').innerHTML = `
        <div class="upload-main-card">
            <h2 style="color: #ff9800; margin-bottom: 20px;">
                <span class="material-icons-round" style="vertical-align: middle; margin-right: 10px;">settings</span>
                Configuración de APIs Reales
            </h2>

            <div style="padding: 20px; background: rgba(255, 152, 0, 0.1); border-radius: 12px; border: 1px solid #ff9800; margin-bottom: 30px;">
                <h3 style="color: #ff9800; margin-bottom: 10px;">
                    <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">info</span>
                    ¿Por qué necesito configurar APIs?
                </h3>
                <p style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
                    TeczerStore usa <strong>APIs reales</strong> (no simulaciones). Para que la IA funcione, necesitas tu propia API Key de Google Gemini.
                    Es <strong>gratis</strong> y toma solo 2 minutos configurarla.
                </p>
            </div>

            <div class="upload-main-card" style="border-left: 4px solid #4285f4;">
                <h3 style="color: #4285f4; margin-bottom: 15px;">
                    1️⃣ Obtener Gemini API Key (Gratis)
                </h3>
                <div style="color: var(--text-secondary); line-height: 1.8;">
                    <strong>Paso 1:</strong> Ve a <a href="https://makersuite.google.com/app/apikey" target="_blank" style="color: var(--accent-color);">Google AI Studio</a><br>
                    <strong>Paso 2:</strong> Inicia sesión con tu cuenta de Google<br>
                    <strong>Paso 3:</strong> Click en "Create API Key"<br>
                    <strong>Paso 4:</strong> Copia la key que aparece<br><br>
                    <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; font-family: monospace; font-size: 0.9rem;">
                        Ejemplo: AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz
                    </div>
                </div>
            </div>

            <div class="upload-main-card" style="border-left: 4px solid #00e676; margin-top: 20px;">
                <h3 style="color: #00e676; margin-bottom: 15px;">
                    2️⃣ Configurar la API Key
                </h3>
                <div style="color: var(--text-secondary); line-height: 1.8;">
                    <strong>Opción A - Configurar en el código:</strong><br>
                    1. Abre el archivo <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px;">js/api-config.js</code><br>
                    2. En la línea 7, reemplaza <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px;">GEMINI_API_KEY</code> con tu key<br>
                    3. Guarda el archivo<br><br>

                    <strong>Opción B - Configurar aquí (temporal):</strong><br>
                    <div class="form-group" style="margin-top: 15px;">
                        <input type="text" id="tempApiKey" class="form-input" placeholder="Pega tu Gemini API Key aquí">
                        <button class="install-button" onclick="saveTemporaryAPIKey()" style="margin-top: 10px; width: 100%;">
                            <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">save</span>
                            Guardar Temporalmente (Solo esta sesión)
                        </button>
                    </div>
                </div>
            </div>

            <div class="upload-main-card" style="border-left: 4px solid #ffc107; margin-top: 20px;">
                <h3 style="color: #ffc107; margin-bottom: 15px;">
                    3️⃣ Funcionalidades Reales Disponibles
                </h3>
                <div style="color: var(--text-secondary); line-height: 1.8;">
                    ✅ <strong>IA Real:</strong> Gemini genera código completo y funcional<br>
                    ✅ <strong>Descargas Reales:</strong> Archivos .zip con estructura completa<br>
                    ✅ <strong>GitHub Upload:</strong> Sube proyectos directamente a GitHub<br>
                    ✅ <strong>Sin Simulaciones:</strong> Todo es 100% funcional<br><br>

                    <strong>Límites Gratuitos de Gemini:</strong><br>
                    • 60 requests por minuto<br>
                    • 1,500 requests por día<br>
                    • Suficiente para uso personal
                </div>
            </div>

            <div class="upload-main-card" style="border-left: 4px solid #f44336; margin-top: 20px;">
                <h3 style="color: #f44336; margin-bottom: 15px;">
                    ⚠️ Seguridad y Privacidad
                </h3>
                <div style="color: var(--text-secondary); line-height: 1.8;">
                    • <strong>Nunca compartas tu API Key</strong> públicamente<br>
                    • Si usas GitHub, agrega <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px;">js/api-config.js</code> a <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px;">.gitignore</code><br>
                    • Puedes regenerar tu key en cualquier momento<br>
                    • La key solo funciona con tu cuenta de Google
                </div>
            </div>

            <div style="margin-top: 30px; display: flex; gap: 15px;">
                <button class="install-button" onclick="renderProgramming()" style="flex: 1;">
                    <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">arrow_back</span>
                    Volver
                </button>
                <button class="install-button" onclick="window.open('https://makersuite.google.com/app/apikey', '_blank')" style="flex: 1; background: #4285f4;">
                    <span class="material-icons-round" style="vertical-align: middle; margin-right: 8px;">open_in_new</span>
                    Obtener API Key
                </button>
            </div>
        </div>
    `;
}

function saveTemporaryAPIKey() {
    const apiKey = document.getElementById('tempApiKey').value.trim();

    if (!apiKey) {
        alert('Por favor ingresa una API Key válida');
        return;
    }

    if (!apiKey.startsWith('AIza')) {
        alert('⚠️ La API Key de Gemini debe comenzar con "AIza". Verifica que sea correcta.');
        return;
    }

    // Save to sessionStorage (only for this session)
    sessionStorage.setItem('gemini_api_key', apiKey);

    // Update the CONFIG object if it exists
    if (typeof CONFIG !== 'undefined') {
        CONFIG.GEMINI_API_KEY = apiKey;
    }

    alert('✅ API Key guardada temporalmente!\n\nAhora puedes usar el asistente de IA. La key se borrará al cerrar el navegador.');

    // Go back to programming main view
    renderProgramming();
}
