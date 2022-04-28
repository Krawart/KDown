import { createTheme } from '@mui/material'
import createPalette from '@mui/material/styles/createPalette'
import createTypography from '@mui/material/styles/createTypography'

const palette = createPalette({
  mode: 'dark',
  primary: {
    main: '#e03aa5',
    light: '#ef4bb5',
    dark: '#c4258b',
    contrastText: '#fff',
  },
})

const typography = createTypography(palette, {
  fontFamily: 'Roboto',
  fontSize: 12,
})

export default createTheme({
  palette,
  typography,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderRadius: '28px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '2rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '1rem 3rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4rem',
          fontWeight: 700,
          fontSize: '1.2rem',
        },
      },
    },
  },
})
