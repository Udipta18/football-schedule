import { Clock, Trophy, MapPin, Star, Calendar, MessageCircle } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { generateGoogleCalendarUrl, generateWhatsAppUrl, openInNewTab } from '../utils/shareUtils';

const MatchCard = ({ match, index }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { user, openAuthModal } = useAuth();
    const isMarked = isFavorite(match.id);

    const handleAction = (action) => {
        if (!user) {
            openAuthModal();
            return;
        }
        action();
    };

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
        glass-dark border transition-all duration-300
        ${isMarked
                    ? 'border-amber-500/50 bg-amber-950/20 ring-1 ring-amber-500/30'
                    : 'border-white/10'
                }
        card-hover animate-fadeIn
      `}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Favorite indicator ribbon */}
            {isMarked && (
                <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                    <div className="absolute -left-6 top-3 w-24 text-center text-xs font-bold bg-amber-500 text-black py-1 rotate-[-45deg] shadow-lg">
                        ⭐ MARKED
                    </div>
                </div>
            )}

            {/* Competition badge */}
            <div
                className="absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl text-xs font-bold text-white"
                style={{ backgroundColor: match.competitionColor || '#3b82f6' }}
            >
                {match.competitionIcon} {match.competition}
            </div>

            {/* Live badge */}
            {match.status === 'Live' && (
                <div className="absolute top-12 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-l-lg animate-pulse-glow">
                    🔴 LIVE NOW
                </div>
            )}

            {/* Match info */}
            <div className="mt-6 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="text-xl md:text-2xl font-bold text-white mb-1">
                            {match.homeTeam}
                        </div>
                        <div className="text-blue-400 text-lg font-semibold my-2">VS</div>
                        <div className="text-xl md:text-2xl font-bold text-white">
                            {match.awayTeam}
                        </div>
                    </div>

                    <div className="text-right ml-4">
                        <div className="text-3xl md:text-4xl font-extrabold gradient-text flex items-center justify-end gap-2">
                            <Clock size={24} className="text-blue-400" />
                            {match.time}
                        </div>
                        <div className="text-slate-400 text-sm mt-1">IST</div>
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="flex items-center text-sm text-slate-300">
                    <Trophy size={16} className="mr-2 text-amber-400" />
                    <span>{match.competition}</span>
                </div>
                <div className="flex items-center text-sm text-slate-300">
                    <MapPin size={16} className="mr-2 text-red-400" />
                    <span>{match.venue}{match.venueCity ? `, ${match.venueCity}` : ''}</span>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                <button
                    onClick={handleFavoriteClick}
                    className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
            ${isMarked
                            ? 'bg-amber-500 text-black hover:bg-amber-400'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                        }
          `}
                >
                    <Star size={16} fill={isMarked ? 'currentColor' : 'none'} />
                    {isMarked ? 'Marked' : 'Mark Important'}
                </button>

                <button
                    onClick={handleCalendarClick}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-all"
                >
                    <Calendar size={16} />
                    Add to Calendar
                </button>

                <button
                    onClick={handleWhatsAppClick}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-500 transition-all"
                >
                    <MessageCircle size={16} />
                    Share WhatsApp
                </button>
            </div>

            {/* Status badge */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5 text-xs text-slate-500">
                <span>Match #{index + 1}</span>
                <span
                    className={`
            px-3 py-1 rounded-full font-semibold
            ${match.status === 'Live'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
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
