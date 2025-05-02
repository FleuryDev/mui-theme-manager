import React from 'react';

import fs from 'fs';
import path from 'path';

import {
  render,
  screen,
} from '@testing-library/react';

import useTheme from '../src/utils/Hooks/useTheme';
import { ThemeProvider } from '../src/utils/Providers/ThemeProvider';




// Composant de test pour utiliser le hook useTheme
const TestComponent = () => {
  const { theme } = useTheme();
  return <div data-testid="theme">{theme.name}</div>;
};

describe('useTheme', () => {
  it('should return the current theme from the context', () => {
    render( <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toBe('default'); // Vérifie que le nom du thème est "default"
  });
});