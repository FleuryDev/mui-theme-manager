//import { getTheme } from '../src/Theme';

import fs from 'fs';
import path from 'path';

import { getTheme } from '../src/Theme';


// Après tous les tests, supprime le dossier et les fichiers de thème fictifs

describe('getTheme', () => {
  it('should return the default theme if no theme name is provided', () => {
    const theme = getTheme('default', 'light');
    expect(theme.palette.primary.main).toBe('#1976d2');
  });

  it('should return the dark theme when "dark" is provided', () => {
    const theme = getTheme('default', 'dark');
    expect(theme.palette.primary.main).toBe('#90caf9');
  });

  it('should return the default theme if an unknown theme name is provided', () => {
    const theme = getTheme('unknown', 'light');
    expect(theme.palette.primary.main).toBe('#1976d2');
  });
});