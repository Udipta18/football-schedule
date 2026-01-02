import { Clock, Calendar } from 'lucide-react';

const Footer = ({ matchCount = 0 }) => {
    return (
        <footer className="mt-8 glass rounded-xl p-6 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                    <Clock size={18} className="text-blue-400" />
                    <span>All times shown in <strong className="text-white">IST</strong> (Indian Standard Time)</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-emerald-400" />
                    <span>Click on any date to view all matches</span>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-800 rounded-full"></span>
                    <span className="text-slate-400">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                    <span className="text-slate-400">Scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-slate-400">Live</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full ring-2 ring-blue-500/30"></span>
                    <span className="text-slate-400">Today</span>
                </div>
            </div>
            {matchCount > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-slate-500 text-xs">
                        Showing <span className="text-emerald-400 font-semibold">{matchCount}</span> matches this month
                    </span>
                </div>
            )}
        </footer>
    );
};

export default Footer;
