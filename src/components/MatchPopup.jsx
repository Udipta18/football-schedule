import { X, Calendar } from 'lucide-react';
import { formatDate } from '../utils/matchUtils';
import MatchCard from './MatchCard';
import { useTheme } from '../context/ThemeContext';

const MatchPopup = ({
    selectedDate,
    matches,
    onClose
}) => {
    const { isLightTheme } = useTheme();
    if (!selectedDate) return null;

    const day = selectedDate.getDate();
    const dayMatches = matches.filter(match => match.day === day);
    const dateString = formatDate(selectedDate);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4 overflow-y-auto animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div
                className={`glass-dark rounded-2xl shadow-2xl max-w-3xl w-full my-4 md:my-8 flex flex-col max-h-[calc(100vh-2rem)] border ${isLightTheme ? 'border-slate-200' : 'border-white/10'} animate-slideUp overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 p-4 md:p-6 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">{dateString}</h2>
                        <p className="text-white/80 text-xs md:text-sm mt-1">
                            {dayMatches.length} {dayMatches.length === 1 ? 'match' : 'matches'} scheduled
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
                        aria-label="Close popup"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className={`p-4 md:p-6 overflow-y-auto flex-1 custom-scrollbar ${isLightTheme ? 'bg-white/50' : ''}`}>
                    {dayMatches.length === 0 ? (
                        <div className="text-center py-16">
                            <Calendar size={80} className={`mx-auto mb-6 ${isLightTheme ? 'text-slate-300' : 'text-slate-600'}`} />
                            <p className={`${isLightTheme ? 'text-slate-700' : 'text-slate-400'} text-xl font-medium`}>No matches scheduled</p>
                            <p className="text-slate-500 text-sm mt-2">Check back later for updates</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {dayMatches.map((match, index) => (
                                <MatchCard key={match.id} match={match} index={index} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`p-4 flex justify-center flex-shrink-0 border-t ${isLightTheme ? 'bg-white border-slate-200' : 'glass border-white/10'}`}>
                    <button
                        onClick={onClose}
                        className="btn-primary px-8"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchPopup;
