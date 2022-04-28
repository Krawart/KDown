import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import theme from './theme'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  </React.StrictMode>,
)
