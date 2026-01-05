import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { findTeamBySearch } from '../utils/teamAbbreviations';

const TeamSearch = ({ onSearch, currentSearch }) => {
    const { theme } = useTheme();
    const isLightTheme = theme === 'light';
    const [searchValue, setSearchValue] = useState(currentSearch || '');
    const [isExpanded, setIsExpanded] = useState(false);
    const searchRef = useRef(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    const handleClear = () => {
        setSearchValue('');
        onSearch('');
        // Do not collapse on clear if it's a desktop view or if we want to keep it open for mobile after clearing
        // For mobile, if it's expanded and cleared, it should stay expanded until clicked outside
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded && searchValue) {
            // If closing and there's a search, clear it
            handleClear();
        }
    };

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                if (isExpanded) {
                    setIsExpanded(false);
                    // Optionally clear search when closing by clicking outside
                    // if (searchValue) {
                    //     handleClear();
                    // }
                }
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded, searchValue]); // Added searchValue to dependency array for potential clear logic

    const foundTeam = findTeamBySearch(searchValue);

    return (
        <div ref={searchRef}>
            {/* Mobile: Icon button when collapsed, full search when expanded */}
            <div className="md:hidden">
                {!isExpanded ? (
                    // Collapsed: Just the search icon button
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
                        aria-label="Open search"
                    >
                        <Search size={18} className={isLightTheme ? 'text-slate-700' : 'text-slate-300'} />
                    </button>
                ) : (
                    // Expanded: Full search bar
                    <div className={`
                        flex items-center gap-2 px-2.5 py-1.5 rounded-lg
                        backdrop-blur-sm border transition-colors
                        ${isLightTheme
                            ? 'border-slate-300 bg-white/90 shadow-sm'
                            : 'border-white/10 bg-white/5'
                        }
                    `}>
                        <Search size={14} className={`flex-shrink-0 ${isLightTheme ? 'text-slate-500' : 'text-slate-500'}`} />

                        <input
                            type="text"
                            value={searchValue}
                            onChange={handleSearchChange}
                            placeholder="Filter by team..."
                            autoFocus
                            className={`
                                flex-1 bg-transparent text-xs
                                outline-none border-none focus:outline-none focus:ring-0
                                ${isLightTheme ? 'text-slate-900 placeholder:text-slate-400' : 'text-white placeholder:text-slate-500'}
                            `}
                        />

                        {searchValue && (
                            <button
                                onClick={handleClear}
                                className={`
                                p-0.5 rounded hover:bg-white/10 transition-colors flex-shrink-0
                                ${isLightTheme ? 'text-slate-500' : 'text-slate-400'}
                            `}
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                )}

                {/* Found Team Badge */}
                {searchValue && foundTeam && isExpanded && (
                    <div className={`
                        mt-1.5 px-2 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1
                        ${isLightTheme ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/10 text-emerald-400'}
                    `}>
                        <span>✓</span>
                        <span>{foundTeam}</span>
                    </div>
                )}
            </div>

            {/* Desktop: Always show full search bar */}
            <div className="hidden md:block">
                <div className={`
                    flex items-center gap-2 px-2.5 py-1.5 rounded-lg
                    backdrop-blur-sm border transition-colors
                    ${isLightTheme
                        ? 'border-slate-200/30 bg-white/20 md:bg-white/50'
                        : 'border-white/10 bg-white/5 md:bg-white/10'
                    }
                `}>
                    <Search size={14} className={`flex-shrink-0 ${isLightTheme ? 'text-slate-400' : 'text-slate-500'}`} />

                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Filter by team..."
                        className={`
                            flex-1 bg-transparent text-xs
                            outline-none border-none focus:outline-none focus:ring-0
                            ${isLightTheme ? 'text-slate-900 placeholder:text-slate-400' : 'text-white placeholder:text-slate-500'}
                        `}
                    />

                    {searchValue && (
                        <button
                            onClick={handleClear}
                            className={`
                            p-0.5 rounded hover:bg-white/10 transition-colors flex-shrink-0
                            ${isLightTheme ? 'text-slate-500' : 'text-slate-400'}
                        `}
                        >
                            <X size={12} />
                        </button>
                    )}
                </div>

                {/* Found Team Badge */}
                {searchValue && foundTeam && (
                    <div className={`
                    mt-1.5 px-2 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1
                    ${isLightTheme ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/10 text-emerald-400'}
                `}>
                        <span>✓</span>
                        <span>{foundTeam}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamSearch;
