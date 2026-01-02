import { useState } from 'react';
import { User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const UserMenu = () => {
    const { user, signOut, openAuthModal } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        setShowDropdown(false);
    };

    if (!user) {
        return (
            <button
                onClick={openAuthModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
            >
                <LogIn size={18} />
                Sign In
            </button>
        );
    }

    return (
        <div className="relative">
            {/* Desktop: Dropdown Trigger */}
            <div className="hidden md:block">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/10 hover:border-white/20 transition-colors"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <User size={16} className="text-white" />
                    </div>
                    <span className="text-white text-sm max-w-[150px] truncate">
                        {user.email}
                    </span>
                </button>
            </div>

            {/* Mobile: Direct Logout Icon */}
            <div className="md:hidden">
                <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center w-10 h-10 rounded-lg glass border border-white/10 hover:bg-white/10 text-red-400 transition-colors"
                    aria-label="Sign out"
                >
                    <LogOut size={20} />
                </button>
            </div>

            {/* Desktop Dropdown Content */}
            {showDropdown && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowDropdown(false)}
                    />
                    <div className="hidden md:block absolute right-0 mt-2 w-48 glass-dark rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/10">
                            <p className="text-xs text-slate-400">Signed in as</p>
                            <p className="text-sm text-white truncate">{user.email}</p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="w-full px-4 py-3 text-left text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
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
