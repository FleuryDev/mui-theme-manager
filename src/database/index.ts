import fs from 'fs';
import path from 'path';

export const list: Record<string, any> = {};

// Parcourt les fichiers dans le dossier src/themes
const themesDir = path.resolve(__dirname, '../../src/themes');

// Vérifie si le dossier existe
if (fs.existsSync(themesDir)) {
  fs.readdirSync(themesDir).forEach((file) => {
    if (file.endsWith('.ts')) {
      const themePath = path.join(themesDir, file);
      const themeModule = require(themePath);

      if (themeModule.name && typeof themeModule.data === 'function') {
        list[themeModule.name] = themeModule;
      } else {
        console.warn(`Le fichier ${file} ne respecte pas le format attendu.`);
      }
    }
  });
} else {
  console.warn(`Le dossier ${themesDir} n'existe pas. Aucun thème n'a été chargé.`);
}