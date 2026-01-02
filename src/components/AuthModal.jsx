import { useState } from 'react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ onClose }) => {
    const { signIn, signUp } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            if (isLogin) {
                const { data, error } = await signIn(email, password);
                if (error) {
                    console.error('Sign in error:', error);
                    throw error;
                }
                console.log('Sign in successful:', data);
                onClose();
            } else {
                const { data, error } = await signUp(email, password);
                if (error) {
                    console.error('Sign up error:', error);
                    throw error;
                }
                console.log('Sign up successful:', data);
                setMessage('Check your email for the confirmation link!');
            }
        } catch (err) {
            console.error('Authentication error:', err);
            setError(err.message || 'An error occurred during authentication');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            const { data, error } = await signInWithGoogle();
            if (error) {
                console.error('Google sign in error:', error);
                setError(error.message);
            } else {
                console.log('Google sign in initiated:', data);
            }
        } catch (err) {
            console.error('Google sign in error:', err);
            setError(err.message || 'An error occurred during Google sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="glass-dark rounded-2xl shadow-2xl max-w-md w-full border border-white/10 animate-slideUp overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                    <h2 className="text-2xl font-bold text-white">
                        {isLogin ? 'Welcome Back!' : 'Create Account'}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                        {isLogin ? 'Sign in to sync your favorites' : 'Sign up to save your favorites'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                            {message}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <>
                                <User size={20} />
                                {isLogin ? 'Sign In' : 'Sign Up'}
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="px-6 pb-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setMessage('');
                        }}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
