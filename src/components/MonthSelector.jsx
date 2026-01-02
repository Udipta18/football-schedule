import { ChevronLeft, ChevronRight } from 'lucide-react';
import { months, availableYears } from '../data/constants';
import { useTheme } from '../context/ThemeContext';

const MonthSelector = ({
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth
}) => {
    const { isLightTheme } = useTheme();

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

    const goToToday = () => {
        const today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
    };

    return (
        <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
            <div className={`flex items-center gap-4 glass rounded-xl p-2 ${isLightTheme ? 'border border-slate-300 shadow-sm' : ''}`}>
                <button
                    onClick={goToPreviousMonth}
                    className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${isLightTheme ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
                    aria-label="Previous month"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-3 px-4">
                    <select
                        id="month-select"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className={`bg-transparent font-semibold text-lg border-none focus:ring-0 cursor-pointer appearance-none pr-6 transition-colors ${isLightTheme ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}
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
                        className={`bg-transparent font-semibold text-lg border-none focus:ring-0 cursor-pointer appearance-none transition-colors ${isLightTheme ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}
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
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                    aria-label="Next month"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            <button
                onClick={goToToday}
                className="btn-primary text-sm"
            >
                Today
            </button>
        </div>
    );
};

export default MonthSelector;
