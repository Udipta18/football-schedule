import { weekDays } from '../data/constants';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/matchUtils';
import CalendarDay from './CalendarDay';
import { useTheme } from '../context/ThemeContext';

/**
 * CalendarGrid Component
 * Renders the 7-column grid layout for the selected month.
 * 
 * Logic Highlights:
 * 1. Padding Blanks: Calculates the empty cells (blanks) needed at the start of the month based on the weekday.
 * 2. Header Abbreviations: Uses responsive logic to show only the first letter (S, M, T) on mobile but Sun, Mon on desktop.
 * 3. Theme Awareness: Dynamically switches background/text colors for the headers.
 */
const CalendarGrid = ({
    year,
    month,
    matches,
    onDateClick,
    hasBackgroundImage = false
}) => {
    const { isLightTheme } = useTheme();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const getMatchesForDate = (day) => {
        return matches.filter(match => match.day === day);
    };

    /**
     * renderBlankDays
     * Safely renders empty div cells to align the 1st of the month with the correct weekday.
     */
    const renderBlankDays = () => {
        const blanks = [];
        for (let i = 0; i < firstDay; i++) {
            blanks.push(
                <div
                    key={`blank-${i}`}
                    className={`min-h-[60px] md:min-h-[120px] rounded-lg transition-colors ${hasBackgroundImage && isLightTheme
                        ? 'bg-white/10'
                        : isLightTheme
                            ? 'bg-slate-100'
                            : 'bg-slate-900/30'
                        }`}
                />
            );
        }
        return blanks;
    };

    /**
     * renderDays
     * Maps through days [1-31] and creates CalendarDay components.
     */
    const renderDays = () => {
        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const dayMatches = getMatchesForDate(day);
            days.push(
                <CalendarDay
                    key={day}
                    day={day}
                    month={month}
                    year={year}
                    matches={dayMatches}
                    onClick={onDateClick}
                    hasBackgroundImage={hasBackgroundImage}
                />
            );
        }
        return days;
    };

    return (
        <div className="mb-6">
            {/* 1. Header Row (Day Labels) */}
            <div className="grid grid-cols-7 gap-1.5 md:gap-2 mb-3">
                {weekDays.map((day, index) => (
                    <div
                        key={day}
                        className={`
                            py-2 md:py-3 text-center font-bold text-[10px] md:text-sm rounded-lg transition-all
                            ${index === 0 || index === 6
                                ? (hasBackgroundImage && isLightTheme)
                                    ? 'text-amber-300 bg-amber-500/20'
                                    : 'text-amber-500 bg-amber-500/10'
                                : (hasBackgroundImage && isLightTheme)
                                    ? 'text-white bg-white/10'
                                    : isLightTheme
                                        ? 'text-slate-600 bg-slate-100'
                                        : 'text-slate-300 bg-slate-800/50'
                            }
                        `}
                    >
                        {/* 
                            Mobile optimization: 
                            - On small screens, we only show the first character (Sun -> S) 
                            - On medium screens (md:), we show the full 'Sun', 'Mon' etc.
                        */}
                        <span className="md:hidden">{day.charAt(0)}</span>
                        <span className="hidden md:inline">{day}</span>
                    </div>
                ))}
            </div>

            {/* 2. Main Calendar Body (Grid) */}
            <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                {renderBlankDays()}
                {renderDays()}
            </div>
        </div>
    );
};

export default CalendarGrid;
