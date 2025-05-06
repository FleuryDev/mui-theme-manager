# **MUI Theme Manager**

The `mui-theme-manager` package is a utility designed to manage Material-UI themes dynamically in React applications. It allows developers to easily switch between themes, manage light and dark modes, and persist theme preferences across sessions.

---

## **Description**

MUI Theme Manager simplifies theme management in Material-UI-based React applications. It provides a centralized way to handle multiple themes, toggle between light and dark modes, and persist user preferences.

---

## **Version**
🔥 Stable Version: **2.0.8**

⚠️ Previous versions are deprecated and no longer maintained.

*Starting from version 2.0.4, MUI Theme Manager officially supports environments:*

- ✅ Node.js

- ✅ Vite

- ✅ Webpack

---

## **Author**

**FleuryDev**

- **GitHub**: [FleuryDev](https://github.com/FleuryDev)
- **Contact**: groupInnov.dev@gmail.com

---
## **Newest**
- ✅ Supports TypeScript and JavaScript files in the src/themes/ folder.

- ✅ New Components:

  -  `<SwitchThemeMode/>` : A switch button component provided by MUI, allowing seamless switching between `light` and `dark` mode.

  - `<ThemeList/>` : Displays available themes in the `src/themes/` folder, showing `name`, `colors`, and `fontFamily`. No configuration required.

## **Features**
- 🔄 Dynamically load and switch between multiple `Material-UI` themes.

- 🌗 Full support for `light` and `dark` modes.

- 💾 Theme persistence using **localStorage**.

- 📦 Centralized theme management via React Context.

- ⚡ Easy integration with **Material-UI's** `ThemeProvider`.

---

## **Installation**

To install the package, use the following command:

```bash
npm install mui-theme-manager
```

or

```bash
yarn add mui-theme-manager
```

---

## **Post-Installation Script**

After installation, run the following command to generate the `themes` folder in your `src` directory:

```bash
npx mui-theme-manager
```


This command will: 

1️⃣ Create a src/themes directory if it doesn't already exist. 

2️⃣ Log a message indicating whether the directory was created or already existed.

---

## **Usage Guide**

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

Each theme file should be stored in the `src/themes` folder as `.ts` or `.js` files, with:
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

### **4. Changing Theme via `getTheme`**

To change the theme dynamically using the `getTheme` function provided by the package, follow this example:

```tsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useThemeManager, getTheme } from 'mui-theme-manager';

const App = () => {
  const { setTheme } = useThemeManager();

  const handleThemeChange = (themeName, themeType) => {
    const newTheme = getTheme(themeName); // Fetch the theme object by name
    setTheme({ name: themeName, type: themeType }); // Set theme with name and type
  };

  return (
    <ThemeProvider>
      <button onClick={() => handleThemeChange('mytheme', 'dark')}>Switch to Dark Theme</button>
      <button onClick={() => handleThemeChange('mytheme', 'light')}>Switch to Light Theme</button>
      <div>Your application content here</div>
    </ThemeProvider>
  );
};

export default App;
```

---
### **5. Changing ThemeMode via `<SwitchThemeMode/>` component**
In the new version, you can use `<SwitchThemeMode/>` component. It's a Switcher button component used to switch the theme mode : `Light` or `Dark`. 
Example : 

```tsx
  <div>
    <SwitchThemeMode/>
  </div>
```
---
### **6. Accessing available themes list**
You can use the `<ThemeList/>` component to display all available theme and select a new theme for your application.
```tsx
 const Dashboard = ()=>{
    return <>
      <h1>Dashboard</h1>
      <div>
        <h2>Themes</h2>
          <ThemeList cardHeight={200} style={{ marginTop: '20px' }} />
      </div>
    </>
 }
```
@param {Object} props - The props object for the component.
 @param {number} [props.cardHeight] - Optional height for the theme cards.
 @param {object} [props.props] - Additional props to be passed to the Grid container.
 
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
- `mode`: The current mode (`light` | `dark`).
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
npm test mui-theme-manager
```

### **Test Setup**

The `beforeAll` and `afterAll` hooks are used to create and clean up test files in the `src/themes` directory.

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