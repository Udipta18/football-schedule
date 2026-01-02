import FootballCalendar from './components/FootballCalendar'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
    return (
        <AuthProvider>
            <FavoritesProvider>
                <div className="min-h-screen">
                    <FootballCalendar />
                </div>
            </FavoritesProvider>
        </AuthProvider>
    )
}

export default App
