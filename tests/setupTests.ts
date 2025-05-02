import fs from 'fs';
import path from 'path';
// Avant tous les tests, crée un dossier et un fichier de thème fictif
beforeAll(() => {
  const themesDir = path.resolve(__dirname, '../src/themes');
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  // Crée un fichier de thème fictif avec le format attendu
  const defaultThemePath = path.join(themesDir, 'default.ts');
  if (!fs.existsSync(defaultThemePath)) {
    fs.writeFileSync(
      defaultThemePath,
      `import { createTheme } from '@mui/material/styles';

export const name = 'default'
export const data = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode, // Définit le mode (clair ou sombre)
      primary: {
        main: mode ==='dark'? '#90caf9' :  '#1976d2', // Couleur principale
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
      `
    );
    console.log('Fichier default.ts créé avec succès.');
  }else{
    console.log('Fichier default.ts existe déjà, aucune modification effectuée.');

  }
});

// afterAll(() => {
//   const themesDir = path.resolve(__dirname, '../src/themes');
//   if (fs.existsSync(themesDir)) {
//     fs.readdirSync(themesDir).forEach((file) => {
//       fs.unlinkSync(path.join(themesDir, file));
//     });
//     fs.rmdirSync(themesDir);
//   }
// });;