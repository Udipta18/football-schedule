import { ChevronLeft, ChevronRight, Calendar, CalendarCheck } from 'lucide-react';
import { months, availableYears } from '../data/constants';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect, useRef } from 'react';

/**
 * MonthSelector Component
 * Provides navigation controls to switch between different months and years.
 * 
 * Logic Highlights:
 * 1. Boundary Handling: Prevents navigating beyond the years defined in constants.js.
 * 2. Responsive Layout: Uses flex-wrap to stack the 'Today' button on very small screens.
 * 3. Accessibility: Custom select elements are used for Month/Year for easy touch/click interactions.
 */
const MonthSelector = ({
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    onGoToToday
}) => {
    const { theme } = useTheme();
    const isLightTheme = theme === 'light';
    const [isExpanded, setIsExpanded] = useState(false);
    const calendarRef = useRef(null);

    /**
     * goToPreviousMonth
     * Handles decrementing the month. If currently January (0), it switches to December (11) 
     * and decrements the year.
     */
    const goToPreviousMonth = () => {
        if (selectedMonth === 0) {
            if (selectedYear > availableYears[0]) {
                setSelectedMonth(11);
                setSelectedYear(selectedYear - 1);
            }
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    /**
     * goToNextMonth
     * Handles incrementing the month. If currently December (11), it switches to January (0) 
     * and increments the year.
     */
    const goToNextMonth = () => {
        if (selectedMonth === 11) {
            if (selectedYear < availableYears[availableYears.length - 1]) {
                setSelectedMonth(0);
                setSelectedYear(selectedYear + 1);
            }
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const handleJumpToToday = () => {
        if (onGoToToday) {
            onGoToToday();
        } else {
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();

            if (availableYears.includes(currentYear)) {
                setSelectedMonth(currentMonth);
                setSelectedYear(currentYear);
            }
        }
        setIsExpanded(false); // Close on mobile after jumping to today
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                if (isExpanded) {
                    setIsExpanded(false);
                }
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded]);

    return (
        <div className="flex flex-wrap gap-2 items-center justify-between w-full">
            {/* Mobile: Collapsible calendar icon */}
            <div className="md:hidden" ref={calendarRef}>
                {!isExpanded ? (
                    // Collapsed: Just calendar icon
                    <button
                        onClick={handleToggle}
                        className={`
                            flex items-center justify-center p-2 rounded-lg
                            backdrop-blur-sm border transition-colors
                            ${isLightTheme
                                ? 'border-slate-300 bg-white/90 hover:bg-white shadow-sm'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }
                        `}
                        aria-label="Open calendar navigation"
                    >
                        <Calendar size={18} className={isLightTheme ? 'text-slate-700' : 'text-slate-300'} />
                    </button>
                ) : (
                    // Expanded: Full month selector (no close button)
                    <div className={`flex items-center gap-1 backdrop-blur-sm rounded-lg px-2 py-1.5 border ${isLightTheme ? 'border-slate-300 bg-white/90 shadow-sm' : 'border-white/10 bg-white/5'}`}>
                        <button
                            onClick={goToPreviousMonth}
                            className={`p-1 rounded hover:bg-white/10 transition-colors ${isLightTheme ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
                            aria-label="Previous month"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <div className="flex items-center px-2">
                            <span className={`text-sm font-semibold whitespace-nowrap ${isLightTheme ? 'text-slate-800' : 'text-white'}`}>
                                {months[selectedMonth].substring(0, 3)} {selectedYear}
                            </span>
                        </div>

                        <button
                            onClick={goToNextMonth}
                            className={`p-1 rounded hover:bg-white/10 transition-colors ${isLightTheme ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
                            aria-label="Next month"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop: Always show full controls */}
            <div className="hidden md:flex items-center gap-2">
                <div className={`flex items-center gap-1 backdrop-blur-sm rounded-lg px-2 py-1.5 border ${isLightTheme ? 'border-slate-300 bg-white/90 shadow-sm' : 'border-white/10 bg-white/5'}`}>
                    <button
                        onClick={goToPreviousMonth}
                        className={`p-1 rounded hover:bg-white/10 transition-colors ${isLightTheme ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
                        aria-label="Previous month"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-1 px-1">
                        <select
                            id="month-select"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            className={`bg-transparent font-bold text-sm border-none focus:ring-0 cursor-pointer appearance-none pr-1 transition-colors ${isLightTheme ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}
                            style={{ backgroundImage: 'none' }}
                        >
                            {months.map((month, index) => (
                                <option key={index} value={index} className={isLightTheme ? "bg-white text-slate-900" : "bg-slate-800 text-white"}>
                                    {month}
                                </option>
                            ))}
                        </select>

                        <select
                            id="year-select"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className={`bg-transparent font-bold text-sm border-none focus:ring-0 cursor-pointer appearance-none transition-colors ${isLightTheme ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}
                            style={{ backgroundImage: 'none' }}
                        >
                            {availableYears.map(year => (
                                <option key={year} value={year} className={isLightTheme ? "bg-white text-slate-900" : "bg-slate-800 text-white"}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={goToNextMonth}
                        className={`p-1 rounded hover:bg-white/10 transition-colors ${isLightTheme ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
                        aria-label="Next month"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Today Button - Always visible */}
            <button
                onClick={handleJumpToToday}
                className={`
                    rounded-lg px-2.5 py-2 md:px-5 md:py-1.5 border transition-all
                    ${isLightTheme
                        ? 'border-blue-400/50 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                        : 'border-blue-400/30 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                    }
                `}
                title="Jump to Today"
                aria-label="Jump to Today"
            >
                {/* Mobile: Icon only */}
                <CalendarCheck size={18} className="md:hidden" />

                {/* Desktop: Full text */}
                <span className="hidden md:inline text-sm font-medium whitespace-nowrap">
                    Jump to Today
                </span>
            </button>
        </div>
    );
};

export default MonthSelector;
