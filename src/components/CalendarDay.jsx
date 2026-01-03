import { isToday } from '../utils/matchUtils';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { formatMatchDisplay } from '../utils/teamAbbreviations';

/**
 * CalendarDay Component
 * Represents a single day cell in the calendar grid.
 * 
 * Major Mobile vs Desktop Differences:
 * 1. Cell Height: 60px on mobile (min-h-[60px]) vs 120px on desktop (md:min-h-[120px]).
 * 2. Match Display: 
 *    - Desktop (md:block): Shows a detailed list of up to 2 matches with teams and times.
 *    - Mobile (md:hidden): Replaces text with a single league icon/logo to save space.
 * 3. Spacing: Uses 'p-1' on mobile and 'p-3' on desktop for padding.
 */
const CalendarDay = ({
    day,
    month,
    year,
    matches,
    onClick
}) => {
    const { isFavorite } = useFavorites();
    const { isLightTheme } = useTheme();

    // Core Logic: Determine status based on match list
    const today = isToday(day, month, year);
    const hasLiveMatch = matches.some(m => m.status === 'Live');
    const hasFavoriteMatch = matches.some(m => isFavorite(m.id));
    const favoriteCount = matches.filter(m => isFavorite(m.id)).length;

    return (
        <div
            onClick={() => onClick(day)}
            className={`
        relative p-1 md:p-3 min-h-[60px] md:min-h-[120px] cursor-pointer transition-all duration-300
        glass rounded-lg border
        ${today
                    ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-500/10'
                    : hasFavoriteMatch
                        ? 'border-amber-500/50 ring-1 ring-amber-500/20 bg-amber-500/10'
                        : 'border-white/5 hover:border-white/20'
                }
        hover:bg-white/5 hover:transform hover:scale-[1.02]
        group
      `}
        >
            {/* Header: Day number and status badges */}
            <div className={`
        font-bold text-sm md:text-lg mb-1 md:mb-2 flex items-center justify-between
        ${today ? 'text-blue-500' : hasFavoriteMatch ? 'text-amber-500' : 'text-slate-200'}
      `}>
                <span className={isLightTheme ? 'text-slate-700' : 'text-white'}>{day}</span>

                <div className="flex items-center gap-1">
                    {/* Status Badges: Hidden on mobile to keep the number clear */}
                    {today && (
                        <span className="hidden md:inline-block text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
                            TODAY
                        </span>
                    )}
                    {hasFavoriteMatch && (
                        <span className="hidden md:inline-block text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded-full font-medium">
                            ⭐ {favoriteCount}
                        </span>
                    )}
                    {/* Red dot for Live matches on Desktop without other badges */}
                    {hasLiveMatch && !today && !hasFavoriteMatch && (
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse-glow"></span>
                    )}
                </div>
            </div>

            {/* View 1: Match previews (DESKTOP ONLY) */}
            <div className="hidden md:block space-y-1.5">
                {matches.slice(0, 2).map(match => {
                    const isMatchFavorite = isFavorite(match.id);
                    const isUCL = match.competition === 'UEFA Champions League';
                    const icon = match.competitionIcon;
                    const isImgIcon = icon && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:'));

                    return (
                        <div
                            key={match.id}
                            className={`
                text-xs p-1.5 rounded-md transition-all
                ${match.status === 'Live'
                                    ? 'bg-red-500/10 border border-red-500/30'
                                    : isMatchFavorite
                                        ? 'bg-amber-500/10 border border-amber-500/30'
                                        : isUCL
                                            ? 'bg-blue-600/10 border border-blue-500/20'
                                            : 'bg-emerald-500/10 border border-emerald-500/20'
                                }
              `}
                        >
                            {/* Logo and Time info */}
                            <div className="flex items-center gap-1.5">
                                {isImgIcon ? (
                                    <img
                                        src={icon}
                                        className={`w-5 h-5 object-contain opacity-90 ${!isLightTheme ? 'invert mix-blend-screen' : ''}`}
                                        alt=""
                                    />
                                ) : (
                                    <span className="text-sm w-5 text-center">{icon}</span>
                                )}
                                <div className="flex items-center gap-1">
                                    {match.status === 'Live' && (
                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                    )}
                                    <span className={`font-semibold ${isMatchFavorite ? 'text-amber-500' : 'text-emerald-500'}`}>
                                        {match.time}
                                    </span>
                                </div>
                            </div>
                            {/* Match Teams: Using meaningful abbreviations */}
                            <div className={`truncate mt-0.5 ml-4 ${isLightTheme ? 'text-slate-600' : 'text-slate-300'}`}>
                                {formatMatchDisplay(match.homeTeam, match.awayTeam)}
                            </div>
                        </div>
                    );
                })}

                {/* More matches indicator (Desktop toggle) */}
                {matches.length > 2 && (
                    <div className="text-xs text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        +{matches.length - 2} more
                    </div>
                )}
            </div>

            {/* View 2: Mobile Indicators (MOBILE ONLY) */}
            <div className="md:hidden flex justify-center mt-1">
                {matches.length > 0 && (() => {
                    // Logic: Prioritize UCL logo if present, otherwise show first match logo
                    const uclMatch = matches.find(m => m.competition === 'UEFA Champions League');
                    const displayMatch = uclMatch || matches[0];
                    const icon = displayMatch.competitionIcon;
                    const isImg = icon && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:'));

                    return (
                        <div
                            className={`
                                flex items-center justify-center
                                ${hasLiveMatch ? 'animate-pulse scale-110' : ''}
                                ${hasFavoriteMatch ? 'drop-shadow-glow-gold' : ''}
                            `}
                        >
                            {isImg ? (
                                <img
                                    src={icon}
                                    alt="Logo"
                                    className={`w-6 h-6 object-contain drop-shadow-md ${!isLightTheme ? 'invert mix-blend-screen' : ''}`}
                                />
                            ) : (
                                <span className="text-base leading-none select-none">{icon || '⚽'}</span>
                            )}
                        </div>
                    );
                })()}
            </div>

            {/* Fixed Match count badge (Visible on both) */}
            {matches.length > 0 && (
                <div className={`
          absolute top-1 right-1 md:top-2 md:right-2 text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg
          ${hasFavoriteMatch
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                        : 'bg-gradient-to-r from-blue-600 to-blue-400'
                    }
        `}>
                    {matches.length}
                </div>
            )}
        </div>
    );
};

export default CalendarDay;
