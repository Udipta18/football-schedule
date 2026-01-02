import { useState, useEffect, useCallback } from 'react';
import { loadMatchesForMonth } from '../utils/matchUtils';
import { hasMatchData } from '../data/matches';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import MonthSelector from './MonthSelector';
import CalendarGrid from './CalendarGrid';
import MatchPopup from './MatchPopup';
import Footer from './Footer';
import AuthModal from './AuthModal';

const FootballCalendar = () => {
    const { showAuthModal, closeAuthModal } = useAuth();
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [matches, setMatches] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [hasData, setHasData] = useState(true);

    useEffect(() => {
        const loadedMatches = loadMatchesForMonth(selectedYear, selectedMonth);
        setMatches(loadedMatches);
        setHasData(hasMatchData(selectedYear, selectedMonth));
    }, [selectedYear, selectedMonth]);

    const handleDateClick = useCallback((day) => {
        const clickedDate = new Date(selectedYear, selectedMonth, day);
        setSelectedDate(clickedDate);
        setShowPopup(true);
    }, [selectedYear, selectedMonth]);

    const closePopup = useCallback(() => {
        setShowPopup(false);
        setSelectedDate(null);
    }, []);

    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape' && showPopup) {
                closePopup();
            }
        };
        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [showPopup, closePopup]);

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
            <div className="glass rounded-2xl p-6 md:p-8 shadow-2xl">
                <Header />
                <MonthSelector
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
                {!hasData && (
                    <div className="text-center py-8 mb-6 glass-dark rounded-xl border border-amber-500/30">
                        <div className="text-amber-400 text-lg font-semibold mb-2">
                            📅 No match data available for this month
                        </div>
                        <p className="text-slate-400 text-sm">
                            Match data is available for December 2025 - May 2026
                        </p>
                    </div>
                )}
                <CalendarGrid
                    year={selectedYear}
                    month={selectedMonth}
                    matches={matches}
                    onDateClick={handleDateClick}
                />
                <Footer matchCount={matches.length} />
            </div>
            {showPopup && (
                <MatchPopup
                    selectedDate={selectedDate}
                    matches={matches}
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
