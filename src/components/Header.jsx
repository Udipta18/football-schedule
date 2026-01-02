import { Trophy } from 'lucide-react';
import UserMenu from './UserMenu';

const Header = () => {
    return (
        <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex-1"></div>
                <div className="flex items-center justify-center gap-4 flex-1">
                    <div className="relative">
                        <Trophy className="text-amber-400 animate-float" size={48} />
                        <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xl -z-10"></div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-center">
                        <span className="gradient-text">Football</span>
                        <span className="text-white"> Schedule</span>
                    </h1>
                    <div className="relative hidden md:block">
                        <Trophy className="text-amber-400 animate-float" size={48} style={{ animationDelay: '1.5s' }} />
                        <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xl -z-10"></div>
                    </div>
                </div>
                <div className="flex-1 flex justify-end">
                    <UserMenu />
                </div>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto text-center">
                Track live matches and schedules from Premier League, La Liga, Champions League, and more
            </p>
        </header>
    );
};

export default Header;
