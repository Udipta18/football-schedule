import { ChevronLeft, ChevronRight } from 'lucide-react';
import { months, availableYears } from '../data/constants';
import { useTheme } from '../context/ThemeContext';

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
    setSelectedMonth
}) => {
    // Hooks: Theme context
    const { isLightTheme } = useTheme();

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

    /**
     * goToToday
     * Convenience function to reset the view to the current real-world date.
     */
    const goToToday = () => {
        const today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
    };

    return (
        <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
            {/* 1. Month/Year Navigation Group */}
            <div className={`flex items-center gap-2 md:gap-4 glass rounded-xl p-2 ${isLightTheme ? 'border border-slate-300 shadow-sm' : ''}`}>
                {/* Previous Button */}
                <button
                    onClick={goToPreviousMonth}
                    className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${isLightTheme ? 'text-slate-600 hover:text-slate-900 border-slate-200' : 'text-slate-300 hover:text-white'}`}
                    aria-label="Previous month"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Date Dropdowns */}
                <div className="flex items-center gap-1 md:gap-3 px-2 md:px-4">
                    <select
                        id="month-select"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className={`bg-transparent font-bold text-base md:text-lg border-none focus:ring-0 cursor-pointer appearance-none pr-4 transition-colors ${isLightTheme ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}
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
                        className={`bg-transparent font-bold text-base md:text-lg border-none focus:ring-0 cursor-pointer appearance-none transition-colors ${isLightTheme ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}
                        style={{ backgroundImage: 'none' }}
                    >
                        {availableYears.map(year => (
                            <option key={year} value={year} className={isLightTheme ? "bg-white text-slate-900" : "bg-slate-800 text-white"}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Next Button */}
                <button
                    onClick={goToNextMonth}
                    className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${isLightTheme ? 'text-slate-600 hover:text-slate-900 border-slate-200 font-semibold' : 'text-slate-300 hover:text-white'}`}
                    aria-label="Next month"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* 2. Today Shortcut Button */}
            <button
                onClick={goToToday}
                className="btn-primary text-sm px-6 py-2.5"
            >
                Jump to Today
            </button>
        </div>
    );
};

export default MonthSelector;
