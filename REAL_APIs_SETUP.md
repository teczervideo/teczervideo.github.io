# TeczerStore - Configuración de APIs Reales

## 🚀 Eliminar Simulaciones - Guía Completa

Este documento explica cómo configurar TeczerStore para que funcione con APIs reales en lugar de simulaciones.

## 📋 Requisitos Previos

1. **Google Gemini API Key** (para IA real)
2. **GitHub Personal Access Token** (para subir archivos)
3. **Cuenta de Firebase** (opcional, para base de datos en tiempo real)

---

## 1️⃣ Configurar Gemini AI (IA Real)

### Obtener API Key:
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea un nuevo proyecto
3. Genera una API Key
4. Copia la key

### Configurar en TeczerStore:
Abre `js/api-config.js` y reemplaza:
```javascript
GEMINI_API_KEY: 'TU_API_KEY_AQUI'
```

### Probar:
- Ve al tab "Programación"
- Crea un nuevo proyecto
- La IA generará código REAL usando Gemini

---

## 2️⃣ Configurar GitHub Storage (Subida Real de Archivos)

### Obtener Personal Access Token:
1. Ve a GitHub > Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. Selecciona permisos: `repo` (full control)
4. Copia el token

### Configurar en TeczerStore:
Los usuarios pueden configurar su token directamente en la interfaz o en `js/api-config.js`:
```javascript
GITHUB_TOKEN: 'ghp_TU_TOKEN_AQUI'
```

### Usar:
- Los archivos subidos se guardarán en `uploads/` del repositorio
- Descarga real de proyectos generados

---

## 3️⃣ Habilitar Descargas Reales

### JSZip para archivos .zip:
Ya está configurado para cargar automáticamente. Los proyectos se descargan como archivos .zip reales con:
- Estructura de carpetas
- Archivos de código
- Configuración
- README

### Funciones disponibles:
```javascript
// Descargar proyecto generado por IA
downloadRealProject()

// Subir a GitHub
uploadToGitHub()
```

---

## 4️⃣ Firebase (Opcional - Base de Datos en Tiempo Real)

### Crear proyecto Firebase:
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Agrega una app web
4. Copia la configuración

### Configurar:
En `js/api-config.js`:
```javascript
FIREBASE_CONFIG: {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
}
```

---

## 5️⃣ Funcionalidades Reales Implementadas

### ✅ IA Real (Gemini):
- Generación de código real
- Estructura de proyectos
- Refinamiento iterativo
- Respuestas contextuales

### ✅ Subida Real de Archivos:
- Upload a GitHub
- Almacenamiento en localStorage
- Metadata completa
- Hash SHA-256 de archivos

### ✅ Descarga Real:
- Archivos .zip con código
- Proyectos completos
- Estructura de carpetas
- Archivos de configuración

### ✅ Almacenamiento Real:
- LocalStorage para persistencia
- GitHub para archivos grandes
- Firebase para datos en tiempo real (opcional)

---

## 6️⃣ Flujo de Trabajo Real

### Crear Proyecto con IA:
1. Usuario completa formulario
2. **Llamada REAL a Gemini API**
3. IA genera código y estructura
4. Proyecto se almacena en memoria

### Descargar Proyecto:
1. Usuario presiona "Descargar"
2. **JSZip crea archivo .zip REAL**
3. Descarga automática al navegador
4. Proyecto listo para usar

### Subir a GitHub:
1. Usuario presiona "Subir a GitHub"
2. **GitHub API sube archivos REALES**
3. Archivos disponibles en repositorio
4. URL pública generada

---

## 7️⃣ Seguridad

### Proteger API Keys:
```javascript
// NO hagas esto en producción:
const API_KEY = 'mi-key-secreta';

// Mejor usa variables de entorno o pide al usuario:
const API_KEY = prompt('Ingresa tu Gemini API Key:');
localStorage.setItem('gemini_key', API_KEY);
```

### Validación de archivos:
- Límite de tamaño
- Tipos de archivo permitidos
- Sanitización de nombres
- Hash para integridad

---

## 8️⃣ Testing

### Probar IA:
```javascript
const ai = new GeminiAI('tu-api-key');
const response = await ai.generateContent('Hola, ¿cómo estás?');
console.log(response);
```

### Probar GitHub Upload:
```javascript
const github = new GitHubStorage('tu-token', 'usuario/repo');
await github.uploadFile('test.txt', 'Hola mundo!');
```

### Probar Descarga:
```javascript
FileDownloader.downloadText('test.txt', 'Contenido de prueba');
```

---

## 9️⃣ Costos

### Gemini AI:
- **Gratis**: 60 requests/minuto
- **Pagado**: Planes desde $0.00025/1K caracteres

### GitHub:
- **Gratis**: Repositorios públicos ilimitados
- **Límites**: 100 MB por archivo, 1 GB total

### Firebase:
- **Gratis**: 1 GB almacenamiento, 10 GB transferencia
- **Pagado**: Pay-as-you-go

---

## 🎯 Resultado Final

Con esta configuración, TeczerStore tendrá:
- ✅ **0% simulaciones**
- ✅ **100% funcionalidad real**
- ✅ IA que genera código real
- ✅ Subida y descarga real de archivos
- ✅ Almacenamiento persistente
- ✅ Integración con GitHub

---

## 📞 Soporte

Si tienes problemas:
1. Verifica las API keys en `js/api-config.js`
2. Revisa la consola del navegador (F12)
3. Comprueba los límites de las APIs
4. Asegúrate de tener conexión a internet

---

## 🔄 Próximos Pasos

1. Configurar tus API keys
2. Probar cada funcionalidad
3. Personalizar según tus necesidades
4. ¡Disfrutar de TeczerStore sin simulaciones!
