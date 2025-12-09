// Local Code Generator - No API Key Required
// Generates real, working code using templates and logic

class LocalCodeGenerator {
    constructor() {
        this.templates = this.initializeTemplates();
    }

    initializeTemplates() {
        return {
            app: {
                'Red Social': this.getSocialAppTemplate,
                'Productividad': this.getProductivityAppTemplate,
                'Entretenimiento': this.getEntertainmentAppTemplate,
                'Utilidad': this.getUtilityAppTemplate,
                'Educación': this.getEducationAppTemplate
            },
            game2d: {
                'Plataformas': this.getPlatformerGameTemplate,
                'Puzzle': this.getPuzzleGameTemplate,
                'Arcade': this.getArcadeGameTemplate,
                'RPG': this.getRPGGameTemplate,
                'Aventura': this.getAdventureGameTemplate
            },
            game3d: {
                'FPS': this.getFPSGameTemplate,
                'Aventura': this.get3DAdventureTemplate,
                'Simulación': this.getSimulationTemplate,
                'Racing': this.getRacingTemplate,
                'Sandbox': this.getSandboxTemplate
            },
            web: {
                'E-commerce': this.getEcommerceTemplate,
                'Blog': this.getBlogTemplate,
                'Dashboard': this.getDashboardTemplate,
                'Portfolio': this.getPortfolioTemplate,
                'SaaS': this.getSaaSTemplate
            },
            exe: {
                'Herramienta': this.getToolTemplate,
                'Automatización': this.getAutomationTemplate,
                'Sistema': this.getSystemTemplate,
                'Utilidad': this.getUtilityExeTemplate,
                'Juego': this.getGameExeTemplate
            }
        };
    }

    async generateProject(type, name, category, description, features) {
        const templateFunc = this.templates[type]?.[category];

        if (!templateFunc) {
            return this.getGenericTemplate(type, name, category, description, features);
        }

        return templateFunc.call(this, name, description, features);
    }

    // ==================== APP TEMPLATES ====================

    getSocialAppTemplate(name, description, features) {
        const files = {
            'package.json': JSON.stringify({
                name: name.toLowerCase().replace(/\s+/g, '-'),
                version: '1.0.0',
                description: description,
                main: 'src/index.js',
                scripts: {
                    start: 'react-native start',
                    android: 'react-native run-android',
                    ios: 'react-native run-ios'
                },
                dependencies: {
                    'react': '^18.2.0',
                    'react-native': '^0.72.0',
                    'react-navigation': '^4.4.4',
                    '@react-native-firebase/app': '^18.0.0'
                }
            }, null, 2),

            'src/index.js': `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`,

            'src/screens/HomeScreen.js': `import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Cargar posts desde tu backend
    loadPosts();
  }, []);

  const loadPosts = async () => {
    // Implementa tu lógica de carga aquí
    setPosts([
      { id: '1', title: 'Primer Post', author: 'Usuario1' },
      { id: '2', title: 'Segundo Post', author: 'Usuario2' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>${name}</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.post}
            onPress={() => navigation.navigate('Profile', { userId: item.author })}
          >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postAuthor}>Por: {item.author}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  post: { padding: 15, backgroundColor: '#1a1a1a', borderRadius: 10, marginBottom: 10 },
  postTitle: { fontSize: 18, color: '#fff' },
  postAuthor: { fontSize: 14, color: '#888', marginTop: 5 }
});`,

            'README.md': `# ${name}

${description}

## Características
${features.map(f => `- ${f}`).join('\n')}

## Instalación

\`\`\`bash
npm install
npm start
\`\`\`

## Uso

1. Ejecuta \`npm start\` para iniciar el servidor de desarrollo
2. Ejecuta \`npm run android\` o \`npm run ios\` para lanzar la app

## Estructura del Proyecto

- \`src/\` - Código fuente
- \`src/screens/\` - Pantallas de la aplicación
- \`src/components/\` - Componentes reutilizables

## Tecnologías

- React Native
- React Navigation
- Firebase (opcional)

## Licencia

MIT
`
        };

        return {
            structure: Object.keys(files),
            files: files,
            readme: files['README.md'],
            technologies: ['React Native', 'JavaScript', 'Firebase']
        };
    }

    getProductivityAppTemplate(name, description, features) {
        const files = {
            'package.json': JSON.stringify({
                name: name.toLowerCase().replace(/\s+/g, '-'),
                version: '1.0.0',
                description: description,
                main: 'src/index.js'
            }, null, 2),

            'src/index.js': `// ${name} - App de Productividad
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>${name}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Nueva tarea..."
          placeholderTextColor="#888"
        />
        <Button title="Agregar" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.task}>
            <Text style={[styles.taskText, item.completed && styles.completed]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#333', padding: 10, color: '#fff', marginRight: 10 },
  task: { padding: 15, backgroundColor: '#1a1a1a', borderRadius: 8, marginBottom: 10 },
  taskText: { fontSize: 16, color: '#fff' },
  completed: { textDecorationLine: 'line-through', color: '#888' }
});`,

            'README.md': `# ${name}\n\n${description}\n\n## Instalación\n\nnpm install\nnpm start`
        };

        return {
            structure: Object.keys(files),
            files: files,
            readme: files['README.md'],
            technologies: ['React Native', 'JavaScript']
        };
    }

    // ==================== GAME 2D TEMPLATES ====================

    getPlatformerGameTemplate(name, description, features) {
        const files = {
            'project.godot': `; Engine configuration file.

[application]
config/name="${name}"
run/main_scene="res://scenes/Main.tscn"

[display]
window/size/width=1280
window/size/height=720

[physics]
2d/default_gravity=980`,

            'scenes/Player.gd': `extends KinematicBody2D

var speed = 200
var jump_force = -400
var gravity = 980
var velocity = Vector2()

func _physics_process(delta):
    # Movimiento horizontal
    velocity.x = 0
    if Input.is_action_pressed("ui_right"):
        velocity.x += speed
    if Input.is_action_pressed("ui_left"):
        velocity.x -= speed
    
    # Salto
    if Input.is_action_just_pressed("ui_up") and is_on_floor():
        velocity.y = jump_force
    
    # Gravedad
    velocity.y += gravity * delta
    
    velocity = move_and_slide(velocity, Vector2.UP)`,

            'scenes/Main.gd': `extends Node2D

func _ready():
    print("${name} - Juego iniciado!")
    
func _process(delta):
    # Lógica del juego
    pass`,

            'README.md': `# ${name}

${description}

## Motor
Godot Engine 4.0

## Controles
- Flechas: Mover
- Espacio: Saltar

## Características
${features.map(f => `- ${f}`).join('\n')}

## Instalación
1. Abre el proyecto en Godot Engine
2. Presiona F5 para ejecutar

## Estructura
- scenes/ - Escenas del juego
- scripts/ - Scripts GDScript
- sprites/ - Gráficos 2D
- audio/ - Sonidos y música
`
        };

        return {
            structure: Object.keys(files),
            files: files,
            readme: files['README.md'],
            technologies: ['Godot Engine', 'GDScript']
        };
    }

    // ==================== WEB TEMPLATES ====================

    getEcommerceTemplate(name, description, features) {
        const files = {
            'index.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>${name}</h1>
        <nav>
            <a href="#productos">Productos</a>
            <a href="#carrito">Carrito (<span id="cart-count">0</span>)</a>
        </nav>
    </header>
    
    <main>
        <section id="productos">
            <h2>Nuestros Productos</h2>
            <div id="product-grid" class="grid"></div>
        </section>
        
        <section id="carrito" style="display:none;">
            <h2>Carrito de Compras</h2>
            <div id="cart-items"></div>
            <button onclick="checkout()">Finalizar Compra</button>
        </section>
    </main>
    
    <script src="app.js"></script>
</body>
</html>`,

            'style.css': `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #000;
    color: #fff;
}

header {
    background: #1a1a1a;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav a {
    color: #1e90ff;
    text-decoration: none;
    margin-left: 20px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.product-card {
    background: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

.product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

button {
    background: #1e90ff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background: #1c7ed6;
}`,

            'app.js': `// ${name} - E-commerce App
const products = [
    { id: 1, name: 'Producto 1', price: 29.99, image: 'https://via.placeholder.com/250' },
    { id: 2, name: 'Producto 2', price: 39.99, image: 'https://via.placeholder.com/250' },
    { id: 3, name: 'Producto 3', price: 49.99, image: 'https://via.placeholder.com/250' }
];

let cart = [];

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(product => \`
        <div class="product-card">
            <img src="\${product.image}" alt="\${product.name}">
            <h3>\${product.name}</h3>
            <p>$\${product.price}</p>
            <button onclick="addToCart(\${product.id})">Agregar al Carrito</button>
        </div>
    \`).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    alert('Producto agregado al carrito!');
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function checkout() {
    alert(\`Total: $\${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}\`);
}

renderProducts();`,

            'README.md': `# ${name}\n\n${description}\n\n## Tecnologías\n- HTML5\n- CSS3\n- JavaScript\n\n## Instalación\nAbre index.html en tu navegador`
        };

        return {
            structure: Object.keys(files),
            files: files,
            readme: files['README.md'],
            technologies: ['HTML', 'CSS', 'JavaScript']
        };
    }

    // ==================== GENERIC TEMPLATE ====================

    getGenericTemplate(type, name, category, description, features) {
        const files = {
            'README.md': `# ${name}

${description}

## Tipo: ${type}
## Categoría: ${category}

## Características
${features.map(f => `- ${f}`).join('\n')}

## Próximos Pasos
1. Configura tu entorno de desarrollo
2. Instala las dependencias necesarias
3. Comienza a desarrollar

Este es un proyecto base. Personalízalo según tus necesidades.
`,
            'main.js': `// ${name}
// ${description}

console.log('${name} iniciado!');

// Tu código aquí
`
        };

        return {
            structure: Object.keys(files),
            files: files,
            readme: files['README.md'],
            technologies: ['JavaScript']
        };
    }

    // Placeholder methods for other templates
    getEntertainmentAppTemplate(name, desc, feat) { return this.getGenericTemplate('app', name, 'Entretenimiento', desc, feat); }
    getUtilityAppTemplate(name, desc, feat) { return this.getGenericTemplate('app', name, 'Utilidad', desc, feat); }
    getEducationAppTemplate(name, desc, feat) { return this.getGenericTemplate('app', name, 'Educación', desc, feat); }
    getPuzzleGameTemplate(name, desc, feat) { return this.getGenericTemplate('game2d', name, 'Puzzle', desc, feat); }
    getArcadeGameTemplate(name, desc, feat) { return this.getGenericTemplate('game2d', name, 'Arcade', desc, feat); }
    getRPGGameTemplate(name, desc, feat) { return this.getGenericTemplate('game2d', name, 'RPG', desc, feat); }
    getAdventureGameTemplate(name, desc, feat) { return this.getGenericTemplate('game2d', name, 'Aventura', desc, feat); }
    getFPSGameTemplate(name, desc, feat) { return this.getGenericTemplate('game3d', name, 'FPS', desc, feat); }
    get3DAdventureTemplate(name, desc, feat) { return this.getGenericTemplate('game3d', name, 'Aventura', desc, feat); }
    getSimulationTemplate(name, desc, feat) { return this.getGenericTemplate('game3d', name, 'Simulación', desc, feat); }
    getRacingTemplate(name, desc, feat) { return this.getGenericTemplate('game3d', name, 'Racing', desc, feat); }
    getSandboxTemplate(name, desc, feat) { return this.getGenericTemplate('game3d', name, 'Sandbox', desc, feat); }
    getBlogTemplate(name, desc, feat) { return this.getGenericTemplate('web', name, 'Blog', desc, feat); }
    getDashboardTemplate(name, desc, feat) { return this.getGenericTemplate('web', name, 'Dashboard', desc, feat); }
    getPortfolioTemplate(name, desc, feat) { return this.getGenericTemplate('web', name, 'Portfolio', desc, feat); }
    getSaaSTemplate(name, desc, feat) { return this.getGenericTemplate('web', name, 'SaaS', desc, feat); }
    getToolTemplate(name, desc, feat) { return this.getGenericTemplate('exe', name, 'Herramienta', desc, feat); }
    getAutomationTemplate(name, desc, feat) { return this.getGenericTemplate('exe', name, 'Automatización', desc, feat); }
    getSystemTemplate(name, desc, feat) { return this.getGenericTemplate('exe', name, 'Sistema', desc, feat); }
    getUtilityExeTemplate(name, desc, feat) { return this.getGenericTemplate('exe', name, 'Utilidad', desc, feat); }
    getGameExeTemplate(name, desc, feat) { return this.getGenericTemplate('exe', name, 'Juego', desc, feat); }
}

// Export for use
if (typeof window !== 'undefined') {
    window.LocalCodeGenerator = LocalCodeGenerator;
}
