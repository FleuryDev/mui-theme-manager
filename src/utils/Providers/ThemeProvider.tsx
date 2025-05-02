import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import {
  Theme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

import { list } from '../../database';

interface ThemeContextProps {
    themeName: string;
    mode: 'light' | 'dark';
    setTheme: (themeName: string, mode: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * Custom hook to access the ThemeContext.
 *
 * This hook provides access to the current theme context value. It ensures
 * that the hook is used within a `ThemeProvider`. If the hook is used outside
 * of a `ThemeProvider`, an error will be thrown.
 *
 * @throws {Error} If the hook is used outside of a `ThemeProvider`.
 * @returns {ThemeContextType} The current value of the ThemeContext.
 */
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

/**
 * ThemeProvider component that manages the application's theme state and provides it to the rest of the app.
 *
 * @param {Object} props - The props for the ThemeProvider component.
 * @param {React.ReactNode} props.children - The child components that will be wrapped by the ThemeProvider.
 *
 * @description
 * This component uses React Context to provide theme-related state and functionality to its children.
 * It manages the current theme name, mode (light or dark), and the Material-UI theme object.
 * The theme state is persisted in `localStorage` and loaded on initialization.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from './ThemeProvider';
 *
 * const App = () => (
 *   <ThemeProvider>
 *     <YourAppComponents />
 *   </ThemeProvider>
 * );
 * ```
 *
 * @remarks
 * - The `setTheme` function allows updating the theme name and mode dynamically.
 * - The theme configuration is expected to be retrieved from a `list` object, which maps theme names to their configurations.
 * - The Material-UI `CssBaseline` component is used to apply global styles.
 *
 * @context
 * The `ThemeContext` provides the following values:
 * - `themeName` (string): The name of the current theme.
 * - `mode` ('light' | 'dark'): The current theme mode.
 * - `setTheme` (function): A function to update the theme name and mode.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeName, setThemeName] = useState<string>('default');
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [theme, setThemeState] = useState<Theme>(list[themeName]?.data(mode));

    useEffect(() => {
        // Charger le thème depuis le localStorage au démarrage
        const savedTheme = localStorage.getItem('app_theme_user');
        if (savedTheme) {
            const { name, type } = JSON.parse(savedTheme);
            setThemeName(name);
            setMode(type);
            setThemeState(list[name]?.data(type));
        }
    }, []);

    const setTheme = (name: string, type: 'light' | 'dark') => {
        setThemeName(name);
        setMode(type);
        const newTheme = list[name]?.data(type);
        if (newTheme) {
            setThemeState(newTheme);
            localStorage.setItem('app_theme_user', JSON.stringify({ name, type }));
        }
    };

    return (
        <ThemeContext.Provider value={{ themeName, mode, setTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};