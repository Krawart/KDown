import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootPage from './pages'

// @ts-ignore
import ReactGA from 'react-ga'

const TRACKING_ID = 'G-NLXM8P0231'
ReactGA.initialize(TRACKING_ID)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<RootPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
