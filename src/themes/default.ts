import { createTheme } from '@mui/material/styles';

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
      