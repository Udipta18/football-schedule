import { useState, useEffect, useCallback } from 'react';
import { loadMatchesForMonth } from '../utils/matchUtils';
import { hasMatchData } from '../data/matches';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { filterMatchesByTeam } from '../utils/teamAbbreviations';
import Header from './Header';
import MonthSelector from './MonthSelector';
import TeamSearch from './TeamSearch';
import CalendarGrid from './CalendarGrid';
import MatchPopup from './MatchPopup';
import Footer from './Footer';
import AuthModal from './AuthModal';

/**
 * FootballCalendar Component
 * The main application container that holds all components together.
 * 
 * Logic Highlights:
 * 1. Data Loading: Automatically fetches matches when Month or Year changes.
 * 2. Interaction: Manages the Modal/Popup states (selected date, auth visibility).
 * 3. Mobile Optimization: Disables page scrolling (body: overflow-hidden) when a popup is open.
 */
const FootballCalendar = () => {
    // Hooks: Provide global state and theme
    const { showAuthModal, closeAuthModal } = useAuth();
    const { isLightTheme } = useTheme();

    // State: Calendar navigation and view control
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [teamSearchQuery, setTeamSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [hasData, setHasData] = useState(true);

    // Effect: Reload match data whenever the user navigates to a new month/year
    useEffect(() => {
        const loadedMatches = loadMatchesForMonth(selectedYear, selectedMonth);
        setMatches(loadedMatches);
        setHasData(hasMatchData(selectedYear, selectedMonth));
    }, [selectedYear, selectedMonth]);

    // Effect: Filter matches when search query or matches change
    useEffect(() => {
        const filtered = filterMatchesByTeam(matches, teamSearchQuery);
        setFilteredMatches(filtered);
    }, [matches, teamSearchQuery]);

    // Handle team search
    const handleTeamSearch = useCallback((query) => {
        setTeamSearchQuery(query);
    }, []);

    /**
     * handleDateClick
     * Triggered when a day cell in the grid is clicked.
     * Triggers the MatchPopup to show details for that specific day.
     */
    const handleDateClick = useCallback((day) => {
        const clickedDate = new Date(selectedYear, selectedMonth, day);
        setSelectedDate(clickedDate);
        setShowPopup(true);
    }, [selectedYear, selectedMonth]);

    const closePopup = useCallback(() => {
        setShowPopup(false);
        setSelectedDate(null);
    }, []);

    /**
     * handleGoToToday
     * Navigates to current month/year and opens popup for today's matches
     */
    const handleGoToToday = useCallback(() => {
        const today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDate(today);
        setShowPopup(true);
    }, []);

    // Accessibility Flush: Handle Escape key to close popups
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape' && showPopup) {
                closePopup();
            }
        };
        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [showPopup, closePopup]);

    // UI Polish: Disable background scrolling when a modal/popup is open
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showPopup]);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
            {/* Main Content Card: glass effect in dark mode, solid/semi-white on light mode */}
            <div
                className={`glass rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden ${isLightTheme ? 'bg-white/80 border border-slate-200' : ''}`}
                style={
                    selectedMonth === 0 ? {
                        backgroundImage: 'url(/january-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    } : selectedMonth === 1 ? {
                        backgroundImage: 'url(/february-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    } : selectedMonth === 2 ? {
                        backgroundImage: 'url(/march-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        backgroundRepeat: 'no-repeat'
                    } : selectedMonth === 3 ? {
                        backgroundImage: 'url(/april-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    } : {}
                }
            >
                {/* Background overlay for January, February, March, and April to ensure text readability */}
                {(selectedMonth === 0 || selectedMonth === 1 || selectedMonth === 2 || selectedMonth === 3) && (
                    <div className={`absolute inset-0 ${isLightTheme ? 'bg-slate-900/50' : 'bg-slate-900/70'} pointer-events-none`} />
                )}

                {/* All content with relative positioning to appear above overlay */}
                <div className="relative z-10">

                    {/* 1. Header (Logo & Branding) */}
                    <Header hasBackgroundImage={selectedMonth === 0 || selectedMonth === 1 || selectedMonth === 2 || selectedMonth === 3} />

                    {/* 2. Controls Row - Search on left, Month selector on right */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-2 mb-4">
                        {/* Left: Team Search */}
                        <div className="w-full md:w-auto md:flex-shrink-0">
                            <TeamSearch
                                onSearch={handleTeamSearch}
                                currentSearch={teamSearchQuery}
                            />
                        </div>

                        {/* Right: Month Selector */}
                        <div className="flex justify-end md:flex-shrink-0">
                            <MonthSelector
                                selectedYear={selectedYear}
                                setSelectedYear={setSelectedYear}
                                selectedMonth={selectedMonth}
                                setSelectedMonth={setSelectedMonth}
                                onGoToToday={handleGoToToday}
                            />
                        </div>
                    </div>

                    {/* 4. Empty State Warning: Shown when no JSON data exists for the selected month */}
                    {!hasData && (
                        <div className={`text-center py-10 mb-8 rounded-2xl border ${isLightTheme ? 'bg-amber-50 border-amber-200 shadow-sm' : 'glass-dark border-amber-500/30'}`}>
                            <div className="text-amber-500 text-xl font-bold mb-2">
                                📅 No match data available for this month
                            </div>
                            <p className={`${isLightTheme ? 'text-slate-600' : 'text-slate-400'} text-sm font-medium`}>
                                Match data is available for December 2025 - May 2026
                            </p>
                        </div>
                    )}

                    {/* 5. The Main Grid: Renders all the days */}
                    <CalendarGrid
                        year={selectedYear}
                        month={selectedMonth}
                        matches={filteredMatches}
                        onDateClick={handleDateClick}
                        hasBackgroundImage={selectedMonth === 0 || selectedMonth === 1 || selectedMonth === 2 || selectedMonth === 3}
                    />

                    {/* 6. Footer (Legends & Metadata) */}
                    <Footer matchCount={filteredMatches.length} hasBackgroundImage={selectedMonth === 0 || selectedMonth === 1 || selectedMonth === 2 || selectedMonth === 3} />
                </div>
                {/* Close content wrapper */}
            </div>
            {/* Close main card */}

            {/* --- Modals (Global Overlays) --- */}
            {showPopup && (
                <MatchPopup
                    selectedDate={selectedDate}
                    matches={filteredMatches}
                    onClose={closePopup}
                />
            )}

            {showAuthModal && (
                <AuthModal onClose={closeAuthModal} />
            )}
        </div>
    );
};

export default FootballCalendar;
