import React from 'react';

import { Grid } from '@mui/material';

import { list } from '../../database/index';
import ThemeCard from './ThemeCard';

/**
 * A React functional component that renders a list of theme cards inside a Grid container.
 *
 * @param {Object} props - The props object for the component.
 * @param {number} [props.cardHeight] - Optional height for the theme cards.
 * @param {object} [props.props] - Additional props to be passed to the Grid container.
 * 
 * @returns {JSX.Element} A Grid container with a list of ThemeCard components.
 *
 * @example
 * // Usage example:
 * import ThemeList from './ThemeList';
 * 
 * const App = () => (
 *   <ThemeList cardHeight={200} style={{ marginTop: '20px' }} />
 * );
 */
const ThemeList = ({cardHeight, ...props}:{cardHeight?:number}) => {
  return (
     <Grid {...props} container spacing={3}>
        {Object.keys(list).map((themeName) => (
            <ThemeCard height={cardHeight} key={themeName} themeName={themeName} />
        ))}
    </Grid>
  )
}

export default ThemeList
