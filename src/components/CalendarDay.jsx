import { isToday } from '../utils/matchUtils';
import { useFavorites } from '../context/FavoritesContext';

const CalendarDay = ({
    day,
    month,
    year,
    matches,
    onClick
}) => {
    const { isFavorite } = useFavorites();
    const today = isToday(day, month, year);
    const hasLiveMatch = matches.some(m => m.status === 'Live');
    const hasFavoriteMatch = matches.some(m => isFavorite(m.id));
    const favoriteCount = matches.filter(m => isFavorite(m.id)).length;

    return (
        <div
            onClick={() => onClick(day)}
            className={`
        relative p-3 min-h-[100px] md:min-h-[120px] cursor-pointer transition-all duration-300
        glass-dark rounded-lg border
        ${today
                    ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-950/50'
                    : hasFavoriteMatch
                        ? 'border-amber-500/50 ring-1 ring-amber-500/20 bg-amber-950/20'
                        : 'border-white/5 hover:border-white/20'
                }
        hover:bg-white/5 hover:transform hover:scale-[1.02]
        group
      `}
        >
            {/* Day number */}
            <div className={`
        font-bold text-lg mb-2 flex items-center justify-between
        ${today ? 'text-blue-400' : hasFavoriteMatch ? 'text-amber-400' : 'text-white'}
      `}>
                <span>{day}</span>
                <div className="flex items-center gap-1">
                    {today && (
                        <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">
                            TODAY
                        </span>
                    )}
                    {hasFavoriteMatch && (
                        <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded-full font-medium">
                            ⭐ {favoriteCount}
                        </span>
                    )}
                    {hasLiveMatch && !today && !hasFavoriteMatch && (
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-glow"></span>
                    )}
                </div>
            </div>

            {/* Match previews */}
            <div className="space-y-1.5">
                {matches.slice(0, 2).map(match => {
                    const isMatchFavorite = isFavorite(match.id);
                    return (
                        <div
                            key={match.id}
                            className={`
                text-xs p-1.5 rounded-md transition-all
                ${match.status === 'Live'
                                    ? 'bg-red-500/20 border border-red-500/40'
                                    : isMatchFavorite
                                        ? 'bg-amber-500/20 border border-amber-500/40'
                                        : 'bg-emerald-500/15 border border-emerald-500/30'
                                }
              `}
                        >
                            <div className="flex items-center gap-1">
                                {match.status === 'Live' && (
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                )}
                                {isMatchFavorite && match.status !== 'Live' && (
                                    <span className="text-amber-400">⭐</span>
                                )}
                                <span className={`font-semibold ${isMatchFavorite ? 'text-amber-400' : 'text-emerald-400'}`}>
                                    {match.time}
                                </span>
                            </div>
                            <div className="text-slate-300 truncate mt-0.5">
                                {match.homeTeam.split(' ')[0]} vs {match.awayTeam.split(' ')[0]}
                            </div>
                        </div>
                    );
                })}

                {matches.length > 2 && (
                    <div className="text-xs text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        +{matches.length - 2} more matches
                    </div>
                )}
            </div>

            {/* Match count badge */}
            {matches.length > 0 && (
                <div className={`
          absolute top-2 right-2 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full
          ${hasFavoriteMatch
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                        : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                    }
        `}>
                    {matches.length}
                </div>
            )}
        </div>
    );
};

export default CalendarDay;
