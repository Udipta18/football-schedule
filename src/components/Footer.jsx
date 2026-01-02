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
const Footer = ({ matchCount = 0 }) => {
    // Hooks: Theme context for reactive styling
    const { isLightTheme } = useTheme();

    return (
        <footer className={`mt-8 glass rounded-xl p-6 text-center ${isLightTheme ? 'border border-slate-200' : ''}`}>
            {/* 1. Global Info Section */}
            <div className={`flex flex-wrap justify-center gap-6 text-sm ${isLightTheme ? 'text-slate-600' : 'text-slate-400'}`}>
                {/* Timezone Note */}
                <div className="flex items-center gap-2">
                    <Clock size={18} className="text-blue-500" />
                    <span>All times shown in <strong className={isLightTheme ? 'text-slate-900' : 'text-white'}>IST</strong> (Indian Standard Time)</span>
                </div>
                {/* Interaction Guide */}
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-emerald-500" />
                    <span>Click on any date to view all matches</span>
                </div>
            </div>

            {/* 2. Color Legend: Explains the status indicators found in the calendar cells */}
            <div className={`flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t ${isLightTheme ? 'border-slate-200 shadow-sm' : 'border-white/10'} text-[11px] font-medium`}>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-slate-400 rounded-full"></span>
                    <span className={isLightTheme ? 'text-slate-500' : 'text-slate-400'}>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                    <span className={isLightTheme ? 'text-slate-500' : 'text-slate-400'}>Scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                    <span className={isLightTheme ? 'text-slate-500' : 'text-slate-400'}>Live</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-blue-500/30"></span>
                    <span className={isLightTheme ? 'text-slate-500' : 'text-slate-400'}>Today</span>
                </div>
            </div>

            {/* 3. Month Metadata: Static counter of available matches */}
            {matchCount > 0 && (
                <div className={`mt-4 pt-4 border-t ${isLightTheme ? 'border-slate-200' : 'border-white/10'}`}>
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                        Data Status: <span className="text-emerald-500">{matchCount} Matches Found</span>
                    </span>
                </div>
            )}
        </footer>
    );
};

export default Footer;
