// FIX: Use Real Games Generator instead of generic templates

// Override LocalCodeGenerator to use real games
const OriginalLocalCodeGenerator = window.LocalCodeGenerator;

window.LocalCodeGenerator = class extends OriginalLocalCodeGenerator {
    async generateProject(type, name, category, description, features) {
        // Use real games generator for game types
        if (type === 'game2d') {
            const gamesGen = new RealGamesGenerator();
            let gameFiles;

            switch (category) {
                case 'Plataformas':
                    gameFiles = gamesGen.generatePlatformerGame(name, description);
                    break;
                case 'Puzzle':
                    gameFiles = gamesGen.generatePuzzleGame(name, description);
                    break;
                case 'Arcade':
                    gameFiles = gamesGen.generateArcadeGame(name, description);
                    break;
                default:
                    gameFiles = gamesGen.generatePlatformerGame(name, description);
            }

            return {
                structure: Object.keys(gameFiles),
                files: gameFiles,
                readme: gameFiles['README.md'],
                technologies: ['HTML5', 'JavaScript', 'Canvas API']
            };
        }

        // For other types, use parent class
        return super.generateProject(type, name, category, description, features);
    }
};

console.log('✅ Real Games Generator activated!');
