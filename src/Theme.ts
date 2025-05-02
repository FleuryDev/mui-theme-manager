import { Theme } from '@mui/material/styles';
import { list } from './database';

type listType = keyof typeof list; // Type pour les clés de l'objet list

/**
 * Retrieves a theme configuration based on the specified theme name and mode.
 *
 * @param themeName - The name of the theme to retrieve. Must be of type `listType`.
 * @param mode - The mode of the theme, either 'light' or 'dark'.
 * @returns The theme configuration as a `Theme` object.
 */
export function getTheme(themeName: listType, mode: 'light' | 'dark'): Theme {
 const themeModule = list[themeName];
  if (!themeModule || typeof themeModule.data !== 'function') {
    console.warn(`Le thème "${themeName}" est introuvable. Utilisation du thème par défaut.`);
    if (!list['default'] || typeof list['default'].data !== 'function') {
      throw new Error('Le thème par défaut est introuvable.');
    }
    return list['default'].data(mode); // Retourne le thème par défaut si le thème spécifié n'existe pas
  }


  return themeModule.data(mode);
}