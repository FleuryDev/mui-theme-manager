# **MUI Theme Manager**

The `mui-theme-manager` package is a utility designed to manage Material-UI themes dynamically in React applications. It allows developers to easily switch between themes, manage light and dark modes, and persist theme preferences across sessions.

---

## **Features**
- Dynamically load and switch between multiple Material-UI themes.
- Support for light and dark modes.
- Theme persistence using `localStorage`.
- Centralized theme management using React Context.
- Easy integration with Material-UI's `ThemeProvider`.

---

## **Installation**

To install the package, use the following command:

```bash
npm install mui-theme-manager
```

Ensure you have the required dependencies for Material-UI:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

---

## **Usage**

### **1. Setting Up the ThemeProvider**

Wrap your application with the `ThemeProvider` provided by the package. This will manage the theme state and provide it to the rest of your app.

```tsx
import React from 'react';
import { ThemeProvider } from 'mui-theme-manager';

const App = () => (
  <ThemeProvider>
    <YourAppComponents />
  </ThemeProvider>
);

export default App;
```

---

### **2. Creating Themes**

Themes are defined as individual files in the `src/themes` directory. Each theme file must export:
- `name`: The name of the theme.
- `data`: A function that returns a Material-UI theme object based on the mode (`light` or `dark`).

#### Example: `src/themes/default.ts`

```typescript
import { createTheme } from '@mui/material/styles';

export const name = 'default';
export const data = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: '#ff4081',
      },
      background: {
        default: mode === 'dark' ? '#0d1b2a' : '#f4f4f4',
        paper: mode === 'dark' ? '#1b263b' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#1c1c1c',
        secondary: mode === 'dark' ? '#a9bcd0' : '#666666',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });
```

---

### **3. Accessing Theme Context**

The `ThemeProvider` exposes a `ThemeContext` that provides the following values:
- `themeName`: The name of the current theme.
- `mode`: The current mode (`light` or `dark`).
- `setTheme`: A function to update the theme name and mode.

#### Example: Using `useTheme` Hook

```tsx
import React from 'react';
import { useTheme } from 'mui-theme-manager';

const ThemeSwitcher = () => {
  const { themeName, mode, setTheme } = useTheme();

  const toggleMode = () => {
    setTheme(themeName, mode === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleMode}>
      Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeSwitcher;
```

---

### **4. Adding New Themes**

To add a new theme:
1. Create a new file in the `src/themes` directory (e.g., `src/themes/custom.ts`).
2. Export `name` and `data` as described above.
3. The new theme will automatically be available in the `list` object.

---

## **API Reference**

### **ThemeProvider**
The `ThemeProvider` component wraps your application and provides theme-related state and functionality.

#### Props:
- `children`: The child components to be wrapped by the provider.

---

### **useTheme**
A custom hook to access the theme context.

#### Returns:
- `themeName`: The name of the current theme.
- `mode`: The current mode (`light` or `dark`).
- `setTheme`: A function to update the theme name and mode.

---

### **getTheme**
A utility function to retrieve a theme configuration based on the theme name and mode.

#### Parameters:
- `themeName` (string): The name of the theme to retrieve.
- `mode` (`light` | `dark`): The mode of the theme.

#### Returns:
- A Material-UI theme object.

#### Example:

```typescript
import { getTheme } from 'mui-theme-manager';

const theme = getTheme('default', 'light');
console.log(theme.palette.primary.main); // Output: '#1976d2'
```

---

## **Testing**

The package includes tests to ensure functionality. To run the tests:

```bash
npm test
```

### **Test Setup**

The `beforeAll` and `afterAll` hooks are used to create and clean up test files in the `src/themes` directory.

#### Example: `tests/setupTests.ts`

```typescript
import fs from 'fs';
import path from 'path';

beforeAll(() => {
  const themesDir = path.resolve(__dirname, '../src/themes');
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  const defaultThemePath = path.join(themesDir, 'default.ts');
  if (!fs.existsSync(defaultThemePath)) {
    fs.writeFileSync(
      defaultThemePath,
      `
      import { createTheme } from '@mui/material/styles';

      export const name = 'default';
      export const data = (mode) => createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
        },
      });
      `
    );
  }
});

afterAll(() => {
  const themesDir = path.resolve(__dirname, '../src/themes');
  if (fs.existsSync(themesDir)) {
    fs.readdirSync(themesDir).forEach((file) => {
      fs.unlinkSync(path.join(themesDir, file));
    });
    fs.rmdirSync(themesDir);
  }
});
```

---

## **Best Practices**

- Always define a `default` theme to ensure a fallback is available.
- Use `localStorage` to persist user preferences for theme and mode.
- Test new themes thoroughly to ensure compatibility with Material-UI.

---

## **Contributing**

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## **License**

This package is licensed under the MIT License. See the `LICENSE` file for more details.

---

## **Acknowledgments**

Special thanks to the Material-UI team for their excellent library and documentation.