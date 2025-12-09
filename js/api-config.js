// TeczerStore - Real API Configuration
// This file handles all real API integrations (no simulations)

const CONFIG = {
    // Google Gemini AI API
    GEMINI_API_KEY: 'AIzaSyDKhVKQJ9X8vZ5YqN3wL4mP2rT6sU8vW0x', // Replace with real key
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',

    // GitHub API for file storage
    GITHUB_TOKEN: '', // User will need to provide their own
    GITHUB_REPO: 'teczervideo/teczervideo.github.io',
    GITHUB_UPLOADS_PATH: 'uploads',

    // Firebase for real-time database (optional)
    FIREBASE_CONFIG: {
        apiKey: "AIzaSyB...", // Replace with real Firebase config
        authDomain: "teczerstore.firebaseapp.com",
        projectId: "teczerstore",
        storageBucket: "teczerstore.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef"
    }
};

// Real Gemini AI Integration
class GeminiAI {
    constructor(apiKey) {
        this.apiKey = apiKey || CONFIG.GEMINI_API_KEY;
        this.apiUrl = CONFIG.GEMINI_API_URL;
    }

    async generateContent(prompt) {
        try {
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Gemini AI Error:', error);
            throw error;
        }
    }

    async generateProjectCode(type, name, category, description, features) {
        const prompt = `
You are an expert software developer. Generate a complete, production-ready project structure for:

Project Type: ${type}
Project Name: ${name}
Category: ${category}
Description: ${description}
Features: ${features.join(', ')}

Provide:
1. Complete folder structure
2. Main code files with actual implementation
3. Configuration files
4. README with setup instructions
5. Package.json or equivalent dependency file

Format the response as JSON with this structure:
{
    "structure": ["folder/file paths"],
    "files": {
        "path/to/file": "file content"
    },
    "readme": "setup instructions",
    "technologies": ["tech1", "tech2"]
}
`;

        const response = await this.generateContent(prompt);
        try {
            // Try to parse JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            // If no JSON, return formatted response
            return {
                structure: [],
                files: {},
                readme: response,
                technologies: []
            };
        } catch (e) {
            return {
                structure: [],
                files: {},
                readme: response,
                technologies: []
            };
        }
    }
}

// Real File Upload to GitHub
class GitHubStorage {
    constructor(token, repo) {
        this.token = token;
        this.repo = repo;
        this.apiUrl = 'https://api.github.com';
    }

    async uploadFile(path, content, message = 'Upload file') {
        const url = `${this.apiUrl}/repos/${this.repo}/contents/${path}`;

        try {
            // Check if file exists
            let sha = null;
            try {
                const checkResponse = await fetch(url, {
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                if (checkResponse.ok) {
                    const data = await checkResponse.json();
                    sha = data.sha;
                }
            } catch (e) {
                // File doesn't exist, that's fine
            }

            // Upload or update file
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
                    sha: sha // Include SHA if updating existing file
                })
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('GitHub Upload Error:', error);
            throw error;
        }
    }

    async uploadMultipleFiles(files) {
        const results = [];
        for (const [path, content] of Object.entries(files)) {
            try {
                const result = await this.uploadFile(path, content);
                results.push({ path, success: true, result });
            } catch (error) {
                results.push({ path, success: false, error: error.message });
            }
        }
        return results;
    }
}

// Real File Download
class FileDownloader {
    static downloadText(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    static downloadZip(filename, files) {
        // Using JSZip library for real ZIP creation
        if (typeof JSZip === 'undefined') {
            console.error('JSZip library not loaded');
            alert('JSZip library required. Loading...');
            // Load JSZip dynamically
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            script.onload = () => {
                this.downloadZip(filename, files);
            };
            document.head.appendChild(script);
            return;
        }

        const zip = new JSZip();

        // Add files to zip
        for (const [path, content] of Object.entries(files)) {
            zip.file(path, content);
        }

        // Generate and download
        zip.generateAsync({ type: 'blob' }).then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    static async downloadFromUrl(url, filename) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error('Download error:', error);
            throw error;
        }
    }
}

// Real File Reader
class FileReader {
    static readAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    }

    static readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    }

    static async getFileSize(file) {
        return file.size;
    }

    static async getFileHash(file) {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, GeminiAI, GitHubStorage, FileDownloader, FileReader };
}
