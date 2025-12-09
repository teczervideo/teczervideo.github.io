// Auto-activation function for Local AI
function activateLocalAI() {
    // Mark AI as activated
    localStorage.setItem('local_ai_activated', 'true');

    // Show success message
    const statusDiv = document.getElementById('aiStatus');
    if (statusDiv) {
        statusDiv.style.display = 'block';
    }

    // Show notification
    alert('✅ IA Activada!\n\nYa puedes crear proyectos sin configurar nada.\nSolo completa el formulario y presiona "Generar con IA".');
}

// Check if AI is activated on load
function isLocalAIActivated() {
    return localStorage.getItem('local_ai_activated') === 'true' || true; // Always true for automatic mode
}
