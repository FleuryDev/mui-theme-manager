import React from 'react';

import fs from 'fs';
import path from 'path';

import {
  render,
  screen,
} from '@testing-library/react';

import {
  ThemeProvider,
  useThemeContext,
} from '../src/utils/Providers/ThemeProvider';



const TestComponent = () => {
    const { themeName } = useThemeContext();
    return <div data-testid="theme">{themeName}</div>;
};

describe('ThemeProvider', () => {
    it('should provide the default theme to its children', () => {
        render( <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const themeElement = screen.getByTestId('theme');
        expect(themeElement.textContent).toBe('default');
    });
});