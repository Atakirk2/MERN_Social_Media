import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "scenes/homePage"
import ProfilePage from "scenes/profilePage"
import LoginPage from "scenes/loginPage"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/system"
import { themeSettings } from "theme"

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
  return (
    <div className="app">
    <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={<HomePage /> }
          />
          <Route
            path="/profile/:userId"
            element={ <ProfilePage />}
          />
        </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App