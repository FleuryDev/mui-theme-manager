#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
console.log('Initializing theme manager...');
/**
 * Initializes the theme manager by creating a directory for themes and a default theme file if they do not already exist.
 *
 * @async
 * @function
 * @throws Will log an error message if there is an issue during initialization.
 *
 * @description
 * This function performs the following steps:
 * 1. Determines the project's `src` directory and the `themes` subdirectory.
 * 2. Creates the `themes` directory if it does not already exist.
 * 3. Checks if a `default.ts` file exists in the `themes` directory.
 *    - If the file does not exist, it creates the file with a default Material-UI theme configuration.
 *    - If the file already exists, it logs a message indicating no changes were made.
 * 4. Logs a success message upon successful initialization.
 *
 * Example usage:
 * ```typescript
 * import { initializeThemeManager } from './commands/init';
 *
 * initializeThemeManager()
 *   .then(() => console.log('Theme manager setup complete.'))
 *   .catch((error) => console.error('Failed to initialize theme manager:', error));
 * ```
 */
export const initializeThemeManager = async () => {
  try {
    const projectSrcDir = path.join(process.cwd(), 'src');
    const themesDir = path.join(projectSrcDir, 'themes');

    // Crée le dossier themes s'il n'existe pas
    await fs.mkdir(themesDir, { recursive: true });

    // Vérifie si le fichier default.ts existe déjà
    const defaultThemePath = path.join(themesDir, 'default.ts');
    const defaultThemeContent = `import { createTheme } from '@mui/material/styles';
    
    export const name = 'default'
    export const data = (mode: 'light' | 'dark') =>
      createTheme({
        palette: {
          mode, // Définit le mode (clair ou sombre)
          primary: {
            main: '#0042A6', // Couleur principale
          },
          secondary: {
            main: '#ff4081', // Couleur secondaire
          },
          background: {
            default: mode === 'dark' ? '#0d1b2a' : '#f4f4f4', // Bleu nuit pour sombre, gris clair pour clair
            paper: mode === 'dark' ? '#1b263b' : '#ffffff', // Fond des cartes
          },
          text: {
            primary: mode === 'dark' ? '#ffffff' : '#1c1c1c', // Texte principal
            secondary: mode === 'dark' ? '#a9bcd0' : '#666666', // Texte secondaire
          },
        },
        typography: {
          fontFamily: 'Roboto, Arial, sans-serif',
        },
      });
`;

    if (!(await fileExists(defaultThemePath))) {
      await fs.writeFile(defaultThemePath, defaultThemeContent);
      console.log('Fichier default.ts créé avec succès.');
    } else {
      console.log('Fichier default.ts existe déjà, aucune modification effectuée.');
    }

    console.log('Theme manager initialisé avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du theme manager :', error);
  }
};

// Fonction utilitaire pour vérifier si un fichier existe
const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};
initializeThemeManager()