import { Clock, Trophy, MapPin, Star, Calendar, MessageCircle } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { generateGoogleCalendarUrl, generateWhatsAppUrl, openInNewTab } from '../utils/shareUtils';

/**
 * MatchCard Component
 * Displays full details for a single football match.
 * 
 * Logic Highlights:
 * 1. Action Routing: Checks for 'user' authentication before allowing Favorites/Calendar syncing.
 * 2. Visual Hierarchy: Prioritizes important matches (isMarked) with a gold ribbon.
 * 3. Mobile Adaptation: Stacked layout on mobile for better mobile accessibility, buttons grow to full-width or compact grid.
 */
const MatchCard = ({ match, index }) => {
    // Hooks: Auth, Favorites and Theme
    const { isFavorite, toggleFavorite } = useFavorites();
    const { user, openAuthModal } = useAuth();
    const { isLightTheme } = useTheme();
    const isMarked = isFavorite(match.id);

    /**
     * handleAction
     * Helper to gate privileged actions behind an Authentication Modal.
     */
    const handleAction = (action) => {
        if (!user) {
            openAuthModal();
            return;
        }
        action();
    };

    // Click Handlers (Share & Sync)
    const handleCalendarClick = (e) => {
        e.stopPropagation();
        handleAction(() => openInNewTab(generateGoogleCalendarUrl(match)));
    };

    const handleWhatsAppClick = (e) => {
        e.stopPropagation();
        handleAction(() => openInNewTab(generateWhatsAppUrl(match)));
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        handleAction(() => toggleFavorite(match.id));
    };

    return (
        <div
            className={`
                relative overflow-hidden rounded-xl p-5
                glass border transition-all duration-300
                ${isMarked
                    ? 'border-amber-500/50 bg-amber-500/10 ring-1 ring-amber-500/30'
                    : isLightTheme ? 'border-slate-200 shadow-sm' : 'border-white/10'
                }
                card-hover animate-fadeIn
            `}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* 1. Favorite Ribbon: Added to the top-left if match is marked as favorite */}
            {isMarked && (
                <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                    <div className="absolute -left-6 top-3 w-24 text-center text-[10px] font-bold bg-amber-500 text-black py-1 rotate-[-45deg] shadow-lg">
                        ⭐ MARKED
                    </div>
                </div>
            )}

            {/* 2. Competition Badge: Top-right indicator with League Logo */}
            <div
                className="absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl text-[10px] font-bold text-white flex items-center gap-1.5"
                style={{ backgroundColor: match.competitionColor || '#3b82f6' }}
            >
                {match.competitionIcon && (match.competitionIcon.startsWith('http') || match.competitionIcon.startsWith('/') || match.competitionIcon.startsWith('data:')) ? (
                    <img
                        src={match.competitionIcon}
                        alt=""
                        className={`w-3.5 h-3.5 object-contain ${!isLightTheme ? 'invert mix-blend-screen' : ''}`}
                    />
                ) : (
                    <span>{match.competitionIcon}</span>
                )}
                <span>{match.competition}</span>
            </div>

            {/* 3. Match Info Area (Teams & Time) */}
            <div className="mt-6 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className={`text-xl md:text-2xl font-bold mb-1 ${isLightTheme ? 'text-slate-800' : 'text-white'}`}>
                            {match.homeTeam}
                        </div>
                        <div className="text-blue-500 text-lg font-semibold my-2">VS</div>
                        <div className={`text-xl md:text-2xl font-bold ${isLightTheme ? 'text-slate-800' : 'text-white'}`}>
                            {match.awayTeam}
                        </div>
                    </div>

                    {/* Match Time: Highlighted with a gradient font */}
                    <div className="text-right ml-4">
                        <div className="text-3xl md:text-4xl font-extrabold gradient-text flex items-center justify-end gap-2">
                            {match.time}
                        </div>
                        <div className="text-slate-400 text-xs mt-1">IST</div>
                    </div>
                </div>
            </div>

            {/* 4. Match Details (Venue & Competition name) */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t ${isLightTheme ? 'border-slate-200' : 'border-white/10'}`}>
                <div className={`flex items-center text-sm ${isLightTheme ? 'text-slate-600' : 'text-slate-300'}`}>
                    <Trophy size={16} className="mr-2 text-amber-500" />
                    <span>{match.competition}</span>
                </div>
                <div className={`flex items-center text-sm ${isLightTheme ? 'text-slate-600' : 'text-slate-300'}`}>
                    <MapPin size={16} className="mr-2 text-red-500" />
                    <span className="truncate">{match.venue}{match.venueCity ? `, ${match.venueCity}` : ''}</span>
                </div>
            </div>

            {/* 5. Utility Actions: Responsive button grid */}
            {match.status !== 'Completed' && (
                <div className={`flex flex-wrap gap-2 mt-4 pt-4 border-t ${isLightTheme ? 'border-slate-200' : 'border-white/10'}`}>
                    {/* Favorite Button: Visual state switches between gold and gray */}
                    <button
                        onClick={handleFavoriteClick}
                        className={`
                            flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all
                            ${isMarked
                                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                                : isLightTheme
                                    ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                            }
                        `}
                    >
                        <Star size={14} fill={isMarked ? 'currentColor' : 'none'} />
                        {isMarked ? 'Marked' : 'Mark Important'}
                    </button>

                    {/* Sync actions: Redirect to external calendar or whatsapp */}
                    <button
                        onClick={handleCalendarClick}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                    >
                        <Calendar size={14} />
                        Add to Calendar
                    </button>

                    <button
                        onClick={handleWhatsAppClick}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-green-600 text-white hover:bg-green-500 transition-all shadow-lg shadow-green-600/20"
                    >
                        <MessageCircle size={14} />
                        WhatsApp
                    </button>
                </div>
            )}

            {/* 6. Status Footer: ID and Status badge */}
            <div className={`flex justify-between items-center mt-4 pt-3 border-t ${isLightTheme ? 'border-slate-200' : 'border-white/5'} text-[10px] text-slate-500 font-medium`}>
                <span>IDENTIFIER: {match.id.split('-').pop()}</span>
                <span
                    className={`
                        px-2 py-0.5 rounded-full font-bold uppercase tracking-wider
                        ${match.status === 'Live'
                            ? 'bg-red-500/20 text-red-500 border border-red-500/30 animate-pulse'
                            : match.status === 'Completed'
                                ? 'bg-slate-500/20 text-slate-500 border border-slate-500/30'
                                : 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                        }
                    `}
                >
                    {match.status}
                </span>
            </div>
        </div>
    );
};

export default MatchCard;
