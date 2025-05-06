import React from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  ListItemIcon,
  ListItemText,
  Switch,
} from '@mui/material';

import { useThemeContext } from '../../utils/Providers/ThemeProvider';

const SwitchThemeMode = () => {
      const { themeName, mode, setTheme } = useThemeContext();
    
     const handleThemeChange = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setTheme(themeName, newMode);
  };
  return (
    <>
      <ListItemIcon>{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}</ListItemIcon>
      <ListItemText primary="Mode sombre" />
      <Switch checked={mode === 'dark'} onChange={handleThemeChange} />
    </>
  )
}

export default SwitchThemeMode
