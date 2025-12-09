// FIXED: Programming.js - Uses LOCAL AI only, NO API KEY needed

// This function is called when user clicks "Generar con IA"
async function generateProjectWithAI_FIXED(type) {
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
            <strong style="color: var(--accent-color);">IA Local:</strong>
            <p style="color: var(--text-secondary); margin: 5px 0 0 0;">
                <span class="material-icons-round" style="vertical-align: middle; font-size: 1rem; animation: spin 1s linear infinite;">autorenew</span>
                Generando código con plantillas inteligentes...
            </p>
        </div>
    `;

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        // Use LOCAL code generator (NO API KEY NEEDED)
        const generator = new LocalCodeGenerator();
        const projectData = await generator.generateProject(type, projectName, category, description, features);

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
                <strong style="color: var(--accent-color);">IA Local:</strong>
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
                    Por favor intenta de nuevo.
                </p>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Override the old function
window.generateProjectWithAI = generateProjectWithAI_FIXED;
