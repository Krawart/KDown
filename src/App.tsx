import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootPage from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<RootPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
