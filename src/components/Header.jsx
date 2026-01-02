import { Trophy, Sun, Moon } from 'lucide-react';
import UserMenu from './UserMenu';
import { useTheme } from '../context/ThemeContext';

/**
 * Header Component
 * Handles the top navigation bar, title branding, and theme switching logic.
 * 
 * Responsive Design:
 * - Title: Stacked vertically on mobile, horizontally on desktop.
 * - Trophies: Sized smaller (32px) on mobile and larger (48px) on desktop.
 * - Layout: Flexbox used to center the title on desktop while keeping actions right-aligned.
 */
const Header = () => {
    // Access global theme state and toggle function
    const { isLightTheme, toggleTheme } = useTheme();

    return (
        <header className="mb-8">
            {/* Main Header Row: Flex container to manage alignment */}
            <div className="flex items-center justify-between mb-6 gap-4">

                {/* 1. Desktop Left Placeholder: Forces Title to center by taking 1/3 space */}
                <div className="hidden md:block flex-1"></div>

                {/* 2. Brand Section: Title & Icon. flex-grow used for mobile view. */}
                <div className="flex items-center gap-3 md:gap-4 flex-grow md:flex-none justify-start md:justify-center">
                    {/* Animated Trophy Icon */}
                    <div className="relative">
                        {/* w-8 h-8 (mobile) translates to 32px, md:w-12 md:h-12 (desktop) translates to 48px */}
                        <Trophy className="text-amber-400 animate-float w-8 h-8 md:w-12 md:h-12" />
                        <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xl -z-10"></div>
                    </div>

                    {/* App Title: text-2xl (mobile) vs text-4xl (desktop) */}
                    <h1 className="text-2xl md:text-4xl font-extrabold flex flex-col md:flex-row md:items-center">
                        <span className="gradient-text">Football</span>
                        {/* margin-left added only on desktop (md:ml-2) when displayed horizontally */}
                        <span className={`md:ml-2 ${isLightTheme ? 'text-slate-800' : 'text-white'}`}>Schedule</span>
                    </h1>

                    {/* Secondary Desktop Trophy: Only visible on Large screens (lg:) for extra balance */}
                    <div className="relative hidden lg:block">
                        <Trophy className="text-amber-400 animate-float w-12 h-12" style={{ animationDelay: '1.5s' }} />
                        <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xl -z-10"></div>
                    </div>
                </div>

                {/* 3. Right Actions: Wrapped in flex-1 with justify-end to balance the left side on desktop */}
                <div className="flex-1 flex items-center justify-end gap-2 shrink-0">
                    {/* Theme Toggle Button: Size-matched to UserMenu buttons (w-10 h-10) for mobile consistency */}
                    <button
                        onClick={toggleTheme}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg glass transition-all duration-300 border ${isLightTheme ? 'bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                        title="Toggle Theme"
                        aria-label="Toggle Theme"
                    >
                        {/* Icons switch based on current mode */}
                        {isLightTheme ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    {/* User Profile / Login component */}
                    <UserMenu />
                </div>
            </div>

            {/* Sub-headline: Responsive text size (text-sm to text-lg) */}
            <p className={`${isLightTheme ? 'text-slate-600' : 'text-slate-400'} text-sm md:text-lg max-w-2xl mx-auto text-center font-medium opacity-90`}>
                Track live matches and schedules from Premier League, La Liga, Champions League, and more
            </p>
        </header>
    );
};

export default Header;
