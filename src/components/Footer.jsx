import { Clock, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Footer Component
 * Displays the color legend, time zone information, and match count metadata.
 * 
 * Design Philosophy:
 * - Consistency: Uses the same 'glass' theme as the main content card.
 * - Clarity: Provides a visual guide (Legend) to help users understand the calendar's colors.
 */
const Footer = ({ matchCount = 0, hasBackgroundImage = false }) => {
    // Hooks: Theme context for reactive styling
    const { isLightTheme } = useTheme();

    // Determine text colors based on background image presence
    const textColor = (hasBackgroundImage && isLightTheme) ? 'text-slate-200' : (isLightTheme ? 'text-slate-600' : 'text-slate-400');
    const strongTextColor = (hasBackgroundImage && isLightTheme) ? 'text-white' : (isLightTheme ? 'text-slate-900' : 'text-white');
    const legendTextColor = (hasBackgroundImage && isLightTheme) ? 'text-slate-300' : (isLightTheme ? 'text-slate-500' : 'text-slate-400');
    const borderColor = (hasBackgroundImage && isLightTheme) ? 'border-white/20' : (isLightTheme ? 'border-slate-200' : 'border-white/10');
    const bgClass = (hasBackgroundImage && isLightTheme) ? 'bg-white/10' : 'glass';

    return (
        <footer className={`mt-8 ${bgClass} rounded-xl p-6 text-center ${isLightTheme && !hasBackgroundImage ? 'border border-slate-200' : ''}`}>
            {/* 1. Global Info Section */}
            <div className={`flex flex-wrap justify-center gap-6 text-sm ${textColor}`}>
                {/* Timezone Note */}
                <div className="flex items-center gap-2">
                    <Clock size={18} className="text-blue-500" />
                    <span>All times shown in <strong className={strongTextColor}>IST</strong> (Indian Standard Time)</span>
                </div>
                {/* Interaction Guide */}
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-emerald-500" />
                    <span>Click on any date to view all matches</span>
                </div>
            </div>

            {/* 2. Color Legend: Explains the status indicators found in the calendar cells */}
            <div className={`flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t ${borderColor} text-[11px] font-medium`}>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-slate-400 rounded-full"></span>
                    <span className={legendTextColor}>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                    <span className={legendTextColor}>Scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                    <span className={legendTextColor}>Live</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-blue-500/30"></span>
                    <span className={legendTextColor}>Today</span>
                </div>
            </div>

            {/* 3. Month Metadata: Static counter of available matches */}
            {matchCount > 0 && (
                <div className={`mt-4 pt-4 border-t ${borderColor}`}>
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                        Data Status: <span className="text-emerald-500">{matchCount} Matches Found</span>
                    </span>
                </div>
            )}
        </footer>
    );
};

export default Footer;
