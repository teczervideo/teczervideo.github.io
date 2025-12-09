const CATALOG_URL = "https://raw.githubusercontent.com/JesusQuijada34/catalog/refs/heads/main/repo.list";
const XML_PATH = "refs/heads/main/details.xml";
const DEFAULT_ICON = "assets/logo.png";

// --- DATA & STATE ---
let allApps = [];
let cachedApps = [];
let currentTab = 'home';

// --- INITIALIZATION ---
window.onload = async () => {
    // Load Catalog from GitHub
    try {
        const repoList = await fetch(CATALOG_URL).then(r => r.text());
        const repos = repoList.split('\n').filter(r => r.trim()); // Limpiar líneas vacías

        const promises = repos.map(repo => fetchAppDetails(repo));
        const fetchedApps = (await Promise.all(promises)).filter(a => a);

        // Load User Uploads from LocalStorage
        const userUploads = JSON.parse(localStorage.getItem('tstore_uploaded_games') || '[]');

        // Merge Catalog + User Uploads
        allApps = [...userUploads, ...fetchedApps]; // User uploads first
        cachedApps = JSON.parse(localStorage.getItem('flarm_cached_apps') || '[]');

    } catch (e) {
        console.error("Error loading catalog:", e);
    }

    console.log(`[tStore] Loaded ${allApps.length} total apps`);
    console.log(`[tStore] Catalog apps: ${allApps.filter(a => !a.isUserUpload).length}`);
    console.log(`[tStore] User uploads: ${allApps.filter(a => a.isUserUpload).length}`);

    renderHome(); // Default view
};

// --- CORE FUNCTIONS ---

async function fetchAppDetails(repo) {
    if (repo.startsWith('user-upload-')) return null; // Skip local mocks during fetch

    try {
        const xmlUrl = `https://raw.githubusercontent.com/JesusQuijada34/${repo}/${XML_PATH}`;
        const res = await fetch(xmlUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/xml");

        const node = doc.querySelector("detail_app") || doc.querySelector("flarm_app");
        let app = {};

        if (!node) {
            console.warn(`[INVALID] ${repo}: Nodo <app> no encontrado`);
            return null;
        }

        app = {
            repo,
            publisher: node?.querySelector("publisher")?.textContent?.trim() || "",
            packagename: node?.querySelector("app")?.textContent?.trim() || "",
            name: node?.querySelector("name")?.textContent?.trim() || "",
            version: node?.querySelector("version")?.textContent?.trim() || "",
            correlationid: node?.querySelector("correlationid")?.textContent?.trim() || "",
            rate: node?.querySelector("rate")?.textContent?.trim() || "",
            author: node?.querySelector("author")?.textContent?.trim() || "",
            platform: node?.querySelector("platform")?.textContent?.trim() || "",
        };

        // Validate essential fields
        if (!app.name || !app.publisher || !app.author || !app.packagename || !app.version || !app.correlationid || !app.rate || !app.platform) {
            console.warn(`[INVALID] ${repo}: Faltan campos esenciales`);
            return null;
        }

        app.icon = await getIconUrl(repo);
        const splashUrl = await getSplashUrl(repo);

        if (splashUrl) {
            app.splash = splashUrl;
            app.useBlurSplash = false;
        } else {
            app.splash = app.icon;
            app.useBlurSplash = true;
        }

        // Categorize
        if (app.platform === "Knosthalij") {
            app.category = "Windows";
        } else if (app.platform === "Danenone") {
            app.category = "Linux/Mac";
        } else if (app.platform === "AlphaCube") {
            app.category = "Multiplataforma";
        } else {
            app.category = "Otros";
        }

        return app;

    } catch (e) {
        console.error(`[ERROR] ${repo}: ${e.message}`);
        return null;
    }
}

async function getSplashUrl(repo) {
    const url = `https://raw.githubusercontent.com/JesusQuijada34/${repo}/main/assets/splash.png`;
    try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok ? url : null;
    } catch { return null; }
}

async function getIconUrl(repo) {
    const urls = [
        `https://raw.githubusercontent.com/JesusQuijada34/${repo}/main/app/app-icon.ico`,
        `https://raw.githubusercontent.com/JesusQuijada34/${repo}/main/assets/product_logo`
    ];

    for (const url of urls) {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            if (res.ok) return url;
        } catch { }
    }
    return DEFAULT_ICON;
}

function updateCache() {
    cachedApps = JSON.parse(JSON.stringify(allApps));
    localStorage.setItem('flarm_cached_apps', JSON.stringify(cachedApps));
    if (currentTab === 'updates') renderUpdates();
}

// --- RENDERING VIEWS ---

function renderHome() {
    contentArea.innerHTML = `
        <div class="empty-state" style="padding: 100px 20px;">
            <span class="material-icons-round" style="font-size: 4rem; opacity: 0.5;">home</span>
            <div style="font-size: 1.5rem; margin-top: 20px;">Bienvenido al Inicio</div>
            <div style="color: var(--text-secondary);">Selecciona 'App JesusQuijada34' para ver el catálogo.</div>
        </div>
    `;
}

function renderGameStore() {
    // Separate official catalog apps from user uploads
    const catalogApps = allApps.filter(a => !a.isUserUpload);
    const userUploads = allApps.filter(a => a.isUserUpload);

    let html = '<h2 class="section-title">App JesusQuijada34</h2>';

    // User Uploads Section (if any)
    if (userUploads.length > 0) {
        html += `
            <div style="margin-bottom: 30px;">
                <h3 class="sidebar-title" style="margin-bottom:15px; font-size:1.1rem; color:var(--accent-color);">Subidos por la Comunidad (${userUploads.length})</h3>
                <div class="featured-grid">
                    ${userUploads.map(renderFeaturedCard).join('')}
                </div>
            </div>
        `;
    }

    // Official Catalog Section
    html += `<h2 class="section-title">Catálogo Oficial de JesusQuijada34 (${catalogApps.length} apps)</h2>`;

    if (catalogApps.length === 0) {
        html += `
            <div class="empty-state">
                <span class="material-icons-round">apps</span>
                <div>Cargando catálogo...</div>
                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 10px;">
                    Si esto tarda mucho, verifica tu conexión a internet.
                </div>
            </div>
        `;
    } else {
        html += `
            <div class="full-collection-grid">
                ${catalogApps.map(renderFullCollectionCard).join('')}
            </div>
        `;
    }

    contentArea.innerHTML = html;
}

function renderUserUploadsSection() {
    const userUploads = allApps.filter(a => a.isUserUpload);
    if (userUploads.length === 0) return '';

    return `
        <div style="margin-bottom: 30px;">
            <h3 class="sidebar-title" style="margin-bottom:15px; font-size:1.1rem; color:var(--accent-color);">Subidos por la Comunidad (Recientes)</h3>
            <div class="featured-grid">
                ${userUploads.map(renderFeaturedCard).join('')}
            </div>
        </div>
    `;
}

function renderUpload() {
    contentArea.innerHTML = `
    <div class="upload-layout">
        <!-- Sidebar with Info -->
        <div class="upload-sidebar">
            <div class="sidebar-card">
                <div class="sidebar-title">Publicar en la Tienda</div>
                <div class="sidebar-desc">
                    Sube tus juegos, ROMs o aplicaciones. Los archivos se verificarán antes de ser visibles globalmente (Simulación).
                </div>
            </div>
            
            <div class="sidebar-card" id="paymentInfoCard" style="display:none; border-color:#00e676;">
                <div class="sidebar-title" style="color:#00e676;">Datos de Pago Móvil</div>
                <div class="sidebar-desc" style="color:#fff;">
                    <strong>Banco:</strong> Venezuela (0102)<br>
                    <strong>Teléfono:</strong> 0412-123-4567<br>
                    <strong>C.I:</strong> 12.345.678<br>
                    <em style="font-size:0.8em; color:#aaa;">*Se cobrará una comisión del 5% por venta.*</em>
                </div>
            </div>
        </div>

        <!-- Main Upload Form -->
        <div class="upload-main">
            <h2 class="section-title" style="margin-top:0;">Subir Nuevo Archivo</h2>
            
            <div class="upload-main-card">
                <div class="form-group">
                    <label class="form-label">Nombre del Juego / Archivo</label>
                    <input type="text" id="upName" class="form-input" placeholder="Ej: God of War - Optimizado">
                </div>

                <div class="form-group">
                    <label class="form-label">Desarrollador / Autor</label>
                    <input type="text" id="upAuthor" class="form-input" placeholder="Tu nombre o estudio">
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                    <div class="form-group">
                        <label class="form-label">Tipo de Archivo</label>
                        <select id="upType" class="form-input">
                            <option value="Juego PC">Juego PC (.exe)</option>
                            <option value="ROM">ROM (.gba, .nds, .nes)</option>
                            <option value="ISO (Consola)">ISO (PS2, PSP, Wii)</option>
                            <option value="Aplicación">Aplicación (.apk, .exe)</option>
                            <option value="Mod">Mod / Parche</option>
                            <option value="Otro">Otro (.rar, .zip)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Calidad / Estado</label>
                        <select id="upQuality" class="form-input">
                            <option>Estable (Release)</option>
                            <option>Beta / Testing</option>
                            <option>Early Access</option>
                            <option>Modificado / Hack</option>
                        </select>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                    <div class="form-group">
                        <label class="form-label">Precio ($)</label>
                        <input type="number" id="upPrice" class="form-input" value="0" min="0" step="0.01" onchange="checkPrice(this)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Peso (Automático)</label>
                        <input type="text" id="upSize" class="form-input" value="0 MB" readonly style="background:rgba(255,255,255,0.05); color:#888;">
                    </div>
                </div>
                
                <div id="paymentMethods" class="form-group" style="display:none; background:rgba(0,230,118,0.1); padding:15px; border-radius:8px; border:1px dashed #00e676;">
                    <label class="form-label" style="color:#00e676;">Métodos de Pago Aceptados</label>
                    <select class="form-input">
                        <option>Pago Móvil (Venezuela)</option>
                        <option>Binance Pay</option>
                        <option>PayPal</option>
                        <option>Zinli</option>
                    </select>
                    <div style="margin-top:10px; font-size:0.85rem; color:#ccc;">
                        Tus ganancias se enviarán a través de este método. Configura tus datos en el perfil.
                    </div>
                </div>

                <div class="drop-zone" id="dropZone" onclick="document.getElementById('fileInput').click()">
                    <span class="material-icons-round drop-icon">cloud_upload</span>
                    <div style="font-weight:600; margin-bottom:4px;" id="dropText">Click para seleccionar archivo</div>
                    <div class="sidebar-desc">Detectaremos el peso automáticamente.</div>
                    <input type="file" id="fileInput" style="display:none" onchange="handleFileSelect(this)">
                </div>

                <button class="install-button" style="width:100%; padding:16px; font-size:1.1rem;" onclick="handleRealUpload()">
                    <span class="material-icons-round" style="vertical-align:middle; margin-right:8px;">publish</span>
                    Publicar en la Tienda
                </button>
                <p style="text-align:center; margin-top:10px; font-size:0.8rem; color:#666;">Al publicar aceptas los términos de servicio de tStore.</p>
            </div>
        </div>
    </div>
  `;
}

function checkPrice(input) {
    const val = parseFloat(input.value);
    const pmDiv = document.getElementById('paymentMethods');
    const infoCard = document.getElementById('paymentInfoCard');

    if (val > 0) {
        pmDiv.style.display = 'block';
        infoCard.style.display = 'block';
    } else {
        pmDiv.style.display = 'none';
        infoCard.style.display = 'none';
    }
}

function handleFileSelect(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const size = formatBytes(file.size);

        document.getElementById('dropText').innerText = `Listo: ${file.name}`;
        document.getElementById('upSize').value = size;

        // Visual cue
        document.getElementById('dropZone').style.borderColor = '#00e676';
        document.getElementById('dropZone').style.background = 'rgba(0, 230, 118, 0.05)';
    }
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function handleRealUpload() {
    const name = document.getElementById('upName').value;
    const author = document.getElementById('upAuthor').value;
    const fileInput = document.getElementById('fileInput');
    const price = document.getElementById('upPrice').value;
    const type = document.getElementById('upType').value;
    const quality = document.getElementById('upQuality').value;
    const size = document.getElementById('upSize').value;

    if (!name || !author) {
        alert('¡Faltan datos! Nombre y Autor son obligatorios.');
        return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
        alert('¡Debes seleccionar un archivo real para subir!');
        return;
    }

    // Simulate "Uploading" logic
    const btn = document.querySelector('.install-button');
    btn.innerHTML = `<div class="spinner" style="width:20px; height:20px; border-width:2px; display:inline-block; vertical-align:middle; margin-right:10px;"></div> Subiendo al servidor...`;
    btn.disabled = true;

    setTimeout(() => {
        // Create "Real" App Object
        const newApp = {
            name: name,
            author: author,
            publisher: 'Comunidad tStore',
            version: '1.0',
            category: type,
            platform: type, // Using type (Console/PC) as platform
            size: size,
            price: price > 0 ? `$${price}` : 'Gratis',
            quality: quality,
            rate: '5.0',
            isUserUpload: true,
            repo: 'user-upload-' + Date.now(),
            icon: 'assets/logo.png', // Default icon for uploads
            splash: 'assets/banner-prev.png', // Default splash
            useBlurSplash: true
        };

        // Save to LocalStorage (Persist locally)
        const currentUploads = JSON.parse(localStorage.getItem('tstore_uploaded_games') || '[]');
        currentUploads.push(newApp);
        localStorage.setItem('tstore_uploaded_games', JSON.stringify(currentUploads));

        // Update Runtime Memory
        allApps.unshift(newApp); // Add to top of list
        // Note: allApps needs to be accessible. Since this is now global in app.js, it is.

        alert('¡Archivo subido exitosamente a la Tienda de Juegos!');

        // Redirect to Store Tab
        switchTab('jesustore');

    }, 2000);
}

function renderOptimizations() {
    contentArea.innerHTML = `
    <h2 class="section-title"><span class="material-icons-round" style="color:var(--accent-color); margin-right:10px;">speed</span> Guía de Optimización</h2>
    <p style="color:var(--text-secondary); margin-bottom:2rem;">Selecciona tu hardware para aplicar las mejores configuraciones de rendimiento y bajos recursos.</p>

    <div class="opt-grid">
       <!-- Intel -->
       <div class="opt-card brand-intel">
         <span class="material-icons-round opt-icon">memory</span>
         <div class="opt-title">Intel® HD Graphics</div>
         <div class="opt-desc">Drivers modificados y configs para UHD 620/630. Aumenta FPS en laptops.</div>
         <button class="opt-btn" onclick="window.open('https://github.com/JesusQuijada34/Intel-Optimization-Guide', '_blank')">Ver Guía</button>
       </div>
       
       <!-- AMD -->
       <div class="opt-card brand-amd">
         <span class="material-icons-round opt-icon">grid_view</span>
         <div class="opt-title">AMD Radeon™ Tweaks</div>
         <div class="opt-desc">Desbloquea rendimiento en APUs Ryzen y GPUs Radeon Legacy.</div>
         <button class="opt-btn" onclick="window.open('https://github.com/JesusQuijada34/AMD-Tweaks', '_blank')">Ver Guía</button>
       </div>
       
       <!-- Nvidia -->
       <div class="opt-card brand-nvidia">
         <span class="material-icons-round opt-icon">remove_red_eye</span>
         <div class="opt-title">Nvidia Control Panel</div>
         <div class="opt-desc">Configuración "High Performance" y debloat de drivers.</div>
         <button class="opt-btn" onclick="window.open('https://github.com/JesusQuijada34/Nvidia-Low-End', '_blank')">Ver Guía</button>
       </div>
       
       <!-- Generic / Windows -->
       <div class="opt-card brand-generic">
         <span class="material-icons-round opt-icon">window</span>
         <div class="opt-title">Windows Debloat</div>
         <div class="opt-desc">Scripts universales para eliminar telemetría y procesos basura.</div>
         <button class="opt-btn" onclick="window.open('https://github.com/JesusQuijada34/Windows-Optimization', '_blank')">Ver Guía</button>
       </div>
    </div>
  `;
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.bottom-nav-item, .tab-item').forEach(el => el.classList.remove('active'));

    if (tab === 'search') {
        searchInput.focus();
        return;
    }

    if (tab === 'home') {
        document.querySelectorAll('.bottom-nav-item, .tab-item').forEach(el => {
            if (el.textContent.includes('Inicio')) el.classList.add('active');
        });
        renderHome();
        return;
    }

    if (tab === 'jesustore') {
        document.querySelectorAll('.bottom-nav-item, .tab-item').forEach(el => {
            if (el.textContent.includes('JesusQuijada34')) el.classList.add('active');
        });
        renderGameStore();
        return;
    }

    if (tab === 'optimization') {
        document.querySelectorAll('.bottom-nav-item, .tab-item').forEach(el => {
            if (el.textContent.includes('Optimizaciones') || el.textContent.includes('Optimizar')) el.classList.add('active');
        });
        renderOptimizations();
        return;
    }

    if (tab === 'upload') {
        document.querySelectorAll('.bottom-nav-item, .tab-item').forEach(el => {
            if (el.textContent.includes('Subir') || el.textContent.includes('Upload')) el.classList.add('active');
        });
        renderUpload();
        return;
    }

    if (tab === 'updates') {
        document.querySelectorAll('.bottom-nav-item, .tab-item').forEach(el => {
            if (el.textContent.includes('Actualizaciones') || el.textContent.includes('Update')) el.classList.add('active');
        });
        renderUpdates();
        return;
    }

    // Default: Home
    renderHome();
}

function renderFeaturedCard(app) {
    return `
    <div class="featured-card" onclick="openModal('${app.repo}')">
      <img src="${app.splash}" class="featured-splash ${app.useBlurSplash ? 'blur-splash' : ''}" alt="${app.name}">
      <div class="featured-info">
        <div class="featured-name">${app.name}</div>
        <div class="featured-meta">${app.author || app.publisher} • ${app.version || 'v1.0'} • ${app.category}</div>
        ${app.price ? `<div style="margin-top:4px; font-weight:bold; color:var(--accent-color);">${app.price}</div>` : ''}
      </div>
    </div>
  `;
}

function renderPopularCard(app) {
    return `
    <div class="popular-card" onclick="openModal('${app.repo}')">
      <img src="${app.icon}" class="popular-icon" alt="${app.name}">
      <div class="popular-name">${app.name}</div>
      <div class="popular-rating">${app.rate || '4.5'} ★</div>
    </div>
  `;
}

function renderRankedCard(app, rank) {
    return `
    <div class="ranked-item" onclick="openModal('${app.repo}')">
      <div class="rank-number">${rank}</div>
      <img src="${app.icon}" class="ranked-icon" alt="${app.name}">
      <div class="ranked-info">
        <div class="ranked-name">${app.name}</div>
        <div class="ranked-meta">${app.publisher}</div>
        <div class="ranked-rating">${app.rate || '4.7'} ★</div>
      </div>
    </div>
  `;
}

function renderFullCollectionCard(app) {
    return `
    <div class="collection-card" onclick="openModal('${app.repo}')">
      <img src="${app.icon}" class="collection-icon" alt="${app.name}">
      <div class="collection-info">
        <div class="collection-name">${app.name}</div>
        <div class="collection-author">@${app.author || 'JesusQuijada34'}</div>
        <div class="collection-desc">${app.publisher} • ${app.category}</div>
        <div class="collection-meta">${app.rate || '4.5'} ★ • ${app.version || 'v1.0'}</div>
      </div>
    </div>
  `;
}

function renderSearch(query) {
    const lower = query.toLowerCase();
    const results = allApps.filter(a =>
        a.name.toLowerCase().includes(lower) ||
        a.publisher.toLowerCase().includes(lower) ||
        a.author.toLowerCase().includes(lower)
    );

    contentArea.innerHTML = `
    <h2 class="section-title">Resultados para "${query}"</h2>
    <div class="full-collection-grid">
      ${results.length ? results.map(renderFullCollectionCard).join('') : '<div class="empty-state"><span class="material-icons-round">search_off</span><div>No se encontraron resultados</div></div>'}
    </div>
  `;
}

function renderUpdates() {
    const updates = allApps.filter(app => {
        const cached = cachedApps.find(c => c.repo === app.repo);
        return !cached || cached.version !== app.version;
    });

    if (updates.length === 0) {
        contentArea.innerHTML = `
      <div class="empty-state">
        <span class="material-icons-round">check_circle</span>
        <div>Todo está actualizado</div>
      </div>
    `;
        return;
    }

    contentArea.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h2 class="section-title" style="margin:0;">Actualizaciones (${updates.length})</h2>
      <button class="install-button" onclick="updateCache()">Actualizar todo</button>
    </div>
    <div class="full-collection-grid">
      ${updates.map(renderFullCollectionCard).join('')}
    </div>
  `;
}

function openModal(repo) {
    const app = allApps.find(a => a.repo === repo);
    if (!app) return;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
    <div class="modal-header">
      <img src="${app.icon}" class="modal-icon" alt="${app.name}">
      <div class="modal-info">
        <div class="modal-title">${app.name}</div>
        <div class="modal-publisher">${app.publisher}</div>
        <button class="install-button" onclick="installApp('${app.repo}', '${app.author}')">Instalar</button>
        <div class="modal-stats">
          <div class="stat">
            <div class="stat-value">4.5 ★</div>
            <div class="stat-label">Valoración</div>
          </div>
          <div class="stat">
            <div class="stat-value">${app.version || '1.0'}</div>
            <div class="stat-label">Versión</div>
          </div>
          <div class="stat">
            <div class="stat-value">${app.category}</div>
            <div class="stat-label">Plataforma</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-title">Sobre esta app</div>
        <div class="modal-description">
          <strong>Autor:</strong> ${app.author}<br>
          <strong>Publisher:</strong> ${app.publisher}<br>
          <strong>Plataforma:</strong> ${app.platform}<br>
          <strong>Licencia:</strong> ${app.rate || 'Gratis'}<br>
          <strong>Package:</strong> ${app.packagename}
          ${app.price ? `<br><strong>Precio:</strong> ${app.price}` : ''}
          ${app.size ? `<br><strong>Peso:</strong> ${app.size}` : ''}
        </div>
      </div>
    </div>
  `;

    document.getElementById('modalOverlay').classList.add('show');
    document.getElementById('appModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    document.getElementById('appModal').classList.remove('show');
    document.body.style.overflow = '';
}

function installApp(repo, author) {
    window.location.href = `flarmstore://${encodeURIComponent(author || 'unknown')}.${encodeURIComponent(repo)}`;
}

window.addEventListener('resize', () => {
    if (currentTab === 'store') renderGameStore();
});

// Setup Initial Element Refs
const contentArea = document.getElementById('contentArea');
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        if (e.target.value.length > 2) {
            renderSearch(e.target.value);
            currentTab = 'search';
        } else if (e.target.value.length === 0) {
            switchTab('home');
        }
    });
}
