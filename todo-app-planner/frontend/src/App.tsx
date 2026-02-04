import Dashboard from "./pages/Dashboard"
import { ThemeProvider } from "./contexts/ThemeContext"
import './styles/main.scss'

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}

export default App