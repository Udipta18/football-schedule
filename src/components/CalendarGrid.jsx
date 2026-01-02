import { weekDays } from '../data/constants';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/matchUtils';
import CalendarDay from './CalendarDay';

const CalendarGrid = ({
    year,
    month,
    matches,
    onDateClick
}) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const getMatchesForDate = (day) => {
        return matches.filter(match => match.day === day);
    };

    const renderBlankDays = () => {
        const blanks = [];
        for (let i = 0; i < firstDay; i++) {
            blanks.push(
                <div
                    key={`blank-${i}`}
                    className="min-h-[100px] md:min-h-[120px] rounded-lg bg-slate-900/30"
                />
            );
        }
        return blanks;
    };

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
                />
            );
        }
        return days;
    };

    return (
        <div className="mb-6">
            {/* Week day headers */}
            <div className="grid grid-cols-7 gap-2 mb-3">
                {weekDays.map((day, index) => (
                    <div
                        key={day}
                        className={`
              p-3 text-center font-bold text-sm rounded-lg
              ${index === 0 || index === 6
                                ? 'text-amber-400 bg-amber-400/10'
                                : 'text-slate-300 bg-slate-800/50'
                            }
            `}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
                {renderBlankDays()}
                {renderDays()}
            </div>
        </div>
    );
};

export default CalendarGrid;
