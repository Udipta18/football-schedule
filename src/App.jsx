import FootballCalendar from './components/FootballCalendar'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <FavoritesProvider>
                    <div className="min-h-screen">
                        <FootballCalendar />
                    </div>
                </FavoritesProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
