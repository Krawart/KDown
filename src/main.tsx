import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import theme from './theme'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path='*' element={<App />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  </React.StrictMode>,
)
