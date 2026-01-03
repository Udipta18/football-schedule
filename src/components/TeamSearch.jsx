import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { findTeamBySearch } from '../utils/teamAbbreviations';

const TeamSearch = ({ onSearch, currentSearch }) => {
    const { isLightTheme } = useTheme();
    const [searchValue, setSearchValue] = useState(currentSearch || '');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    const handleClear = () => {
        setSearchValue('');
        onSearch('');
    };

    const foundTeam = findTeamBySearch(searchValue);

    return (
        <div className="mb-4">
            {/* Search Input */}
            <div className={`
                flex items-center gap-2 px-3 py-2.5 md:py-2 rounded-lg
                glass border transition-colors
                ${isLightTheme
                    ? 'border-slate-200 bg-white/50'
                    : 'border-white/10'
                }
            `}>
                <Search size={16} className={`flex-shrink-0 ${isLightTheme ? 'text-slate-400' : 'text-slate-500'}`} />

                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Filter by team..."
                    className={`
                        flex-1 bg-transparent text-sm
                        outline-none border-none focus:outline-none focus:ring-0
                        ${isLightTheme ? 'text-slate-900 placeholder:text-slate-400' : 'text-white placeholder:text-slate-500'}
                    `}
                />

                {searchValue && (
                    <button
                        onClick={handleClear}
                        className={`
                            p-1 rounded hover:bg-white/10 transition-colors flex-shrink-0
                            ${isLightTheme ? 'text-slate-500' : 'text-slate-400'}
                        `}
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Found Team Badge - Below on Mobile */}
            {searchValue && foundTeam && (
                <div className={`
                    mt-2 px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1
                    ${isLightTheme ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/10 text-emerald-400'}
                `}>
                    <span>✓</span>
                    <span>{foundTeam}</span>
                </div>
            )}
        </div>
    );
};

export default TeamSearch;
