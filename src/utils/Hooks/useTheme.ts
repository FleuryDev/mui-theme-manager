import { useState } from 'react';

type themeStateType = {name:string, type: 'light'|'dark'}

type ThemeType = {
  theme: themeStateType;
  setTheme: React.Dispatch<React.SetStateAction<themeStateType>>;
  update: (newTheme: themeStateType) => void;
};

/**
 * Custom hook to manage the application's theme state.
 *
 * This hook provides the current theme, a setter function to update the theme,
 * and an `update` function that persists the theme changes to localStorage
 * and avoids unnecessary updates if the theme hasn't changed.
 *
 * @returns {Object} An object containing:
 * - `theme`: The current theme state, including `name` and `type`.
 * - `setTheme`: A function to directly set the theme state.
 * - `update`: A function to update the theme state and persist it to localStorage.
 *
 * @example
 * const { theme, setTheme, update } = useTheme();
 * console.log(theme.name); // 'default'
 * update({ name: 'default', type: 'dark' });
 */
export default function useTheme(){
  const [theme, setTheme] = useState({
    name: 'default',
    type: 'light', // Par défaut, mode clair
  });

  const update = (newTheme: themeStateType) => {
    setTheme((prevTheme) => {
      if (prevTheme.type !== newTheme.type || prevTheme.name !== newTheme.name) {
        localStorage.setItem('app_theme_user', JSON.stringify(newTheme));
        return newTheme;
      }
      return prevTheme; // Évite les mises à jour inutiles
    });
  };

  return { theme, setTheme, update };
}