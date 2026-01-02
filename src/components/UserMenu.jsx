import { useState } from 'react';
import { User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/**
 * UserMenu Component
 * Handles user authentication state, sign-in buttons, and user profile dropdown.
 * 
 * Mobile vs Desktop Differences:
 * 1. Logged Out State:
 *    - Desktop: Shows "Sign In" text with icon.
 *    - Mobile: Shows ONLY the icon as a compact square button.
 * 2. Logged In State:
 *    - Desktop: Shows a dropdown trigger with email and profile icon.
 *    - Mobile: Shows ONLY a red logout icon for quick action.
 */
const UserMenu = () => {
    const { user, signOut, openAuthModal } = useAuth();
    const { isLightTheme } = useTheme();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        setShowDropdown(false);
    };

    // --- State A: User is NOT Logged In ---
    if (!user) {
        return (
            <>
                {/* 1. Desktop Sign In: Visible only on md screens (768px+) */}
                <button
                    onClick={openAuthModal}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20"
                >
                    <LogIn size={18} />
                    Sign In
                </button>

                {/* 2. Mobile Sign In Icon: Visible only on screens < 768px (md:hidden) */}
                <button
                    onClick={openAuthModal}
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/20"
                    aria-label="Sign In"
                >
                    <LogIn size={20} />
                </button>
            </>
        );
    }

    // --- State B: User IS Logged In ---
    return (
        <div className="relative">
            {/* 1. Desktop Trigger: Shows email and profile picture */}
            <div className="hidden md:block">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg glass border transition-all ${isLightTheme ? 'border-slate-200 hover:bg-slate-100 shadow-sm' : 'border-white/10 hover:border-white/20'}`}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <User size={16} className="text-white" />
                    </div>
                    {/* truncate used to prevent long emails from breaking the bar */}
                    <span className={`text-sm max-w-[150px] truncate font-medium ${isLightTheme ? 'text-slate-800' : 'text-white'}`}>
                        {user.email}
                    </span>
                </button>
            </div>

            {/* 2. Mobile Logout Icon: Simple red button for phones */}
            <div className="md:hidden">
                <button
                    onClick={handleSignOut}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg glass border transition-colors ${isLightTheme ? 'border-slate-200 text-red-500 bg-white/50' : 'border-white/10 text-red-400'}`}
                    aria-label="Sign out"
                >
                    <LogOut size={20} />
                </button>
            </div>

            {/* Desktop-Only Dropdown Menu */}
            {showDropdown && (
                <>
                    {/* Backdrop to close when clicking outside */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowDropdown(false)}
                    />
                    {/* Animated menu box */}
                    <div className={`hidden md:block absolute right-0 mt-2 w-56 rounded-xl border shadow-2xl z-50 overflow-hidden animate-slideUp ${isLightTheme ? 'bg-white border-slate-200' : 'glass-dark border-white/10'}`}>
                        <div className={`px-4 py-4 border-b ${isLightTheme ? 'border-slate-100 bg-slate-50' : 'border-white/10 bg-white/5'}`}>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Account Info</p>
                            <p className={`text-sm font-semibold truncate ${isLightTheme ? 'text-slate-900' : 'text-white'}`}>{user.email}</p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className={`w-full px-4 py-3 text-left text-sm font-semibold flex items-center gap-3 transition-colors ${isLightTheme ? 'text-red-600 hover:bg-red-50' : 'text-red-400 hover:bg-white/5'}`}
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserMenu;
