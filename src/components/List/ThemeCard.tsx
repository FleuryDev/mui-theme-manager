import React, { useState } from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

import { list } from '../../database/index';
import { useThemeContext } from '../../utils/Providers/ThemeProvider';

interface ThemeCardProps {
    /**
     * Name of the target theme.
     */
    themeName: string;
    height?:number ;
}

/**
 * A React functional component that represents a card for a theme.
 * It allows users to preview a theme in light or dark mode and activate it.
 *
 * @component
 * @param {ThemeCardProps} props - The props for the ThemeCard component.
 * @param {string} props.themeName - The name of the theme to display.
 * @param {number} [props.height] - The height of the card. Defaults to 175 if not provided.
 *
 * @returns {JSX.Element | null} The rendered ThemeCard component or null if the theme data is not available.
 *
 * @remarks
 * - The card displays a gradient background based on the theme's primary, secondary, and background colors.
 * - A checkmark icon is displayed in the center of the card if the theme is currently active.
 * - An icon button in the top-right corner allows toggling between light and dark preview modes.
 * - Clicking the card activates the theme with the selected preview mode.
 *
 * @example
 * ```tsx
 * <ThemeCard themeName="DarkTheme" height={200} />
 * ```
 */
const ThemeCard: React.FC<ThemeCardProps> = ({ themeName , height}) => {
    const { themeName: activeTheme, mode, setTheme } = useThemeContext();
    const [previewMode, setPreviewMode] = useState<'light' | 'dark'>(mode);
    const themeData = list[themeName]?.data(previewMode);

    if (!themeData) {
        return null; // Si le thème n'existe pas, ne rien afficher
    }

    const handleToggleMode = () => {
        setPreviewMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const handleActivateTheme = () => {
        setTheme(themeName, previewMode);
    };
    
    return (
        <Grid container>
            <Card
                onClick={handleActivateTheme}
                sx={{
                    position: 'relative',
                    height: height? height: 175,
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    cursor: 'pointer',
                    background: ` linear-gradient(90deg,${themeData.palette.primary.main} 31%, 34%, ${themeData.palette.background.default} 65%, 67%,${themeData.palette.secondary.main} 99%)`,
                    color: themeData.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Icône de validation si le thème est actif */}
                {activeTheme === themeName && (
                    <CheckCircleIcon
                        sx={{
                            position: 'absolute',
                            fontSize: 40,
                            color: themeData.palette.primary.main,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 2,
                        }}
                    />
                )}

                {/* Contenu de la carte */}
                <CardContent
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {themeName}
                    </Typography>
                </CardContent>

                {/* Bouton pour basculer entre clair et sombre */}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche l'activation du thème lors du clic sur le bouton
                        handleToggleMode();
                    }}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 3,
                        backgroundColor: themeData.palette.background.paper,
                        color: themeData.palette.text.primary,
                        '&:hover': {
                            backgroundColor: themeData.palette.background.default,
                        },
                    }}
                >
                    {previewMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Card>
        </Grid>
    );
};

export default ThemeCard;