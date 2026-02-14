import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import "./styles/main.scss";

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}

export default App;